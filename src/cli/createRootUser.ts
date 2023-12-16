import { ZodError, z } from "zod";
import { input } from "@inquirer/prompts";
import password from "@inquirer/password";
import "@/config/env";
import prismaClient from "@/config/database";
import logger from "@/utils/logger";
import { UserStatus } from "@prisma/client";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/constants/limits";

export default async function createRootUser() {
  try {
    let superUserRole = await prismaClient.role.findFirst({
      where: {
        name: "Root",
      },
    });

    if (!superUserRole) {
      console.log("Creating Root role");
      superUserRole = await prismaClient.role.create({
        data: {
          name: "Root",
          description:
            "For administrative purposes, and has the highest access rights in the organisation.",
        },
      });
      console.log("Role created");
    }

    const adminRole = await prismaClient.role.findFirst({
      where: {
        name: "Admin",
      },
    });

    if (!adminRole) {
      console.log("Creating admin role");
      await prismaClient.role.create({
        data: {
          name: "Admin",
          description: "For administrative purposes",
        },
      });
      console.log("Admin Role created");
    }

    const rootUser = await prismaClient.user.findFirst({
      where: {
        rolesAssignedToUser: {
          some: {
            role: {
              name: "Root",
            },
          },
        },
      },
    });

    if (!rootUser) {
      const emailInput = await input({ message: "Email:" });

      const email = z
        .string({
          invalid_type_error: "Invalid email address",
          required_error: "Email is required",
        })
        .trim()
        .email("Invalid email address")
        .parse(emailInput);

      const newPasswordInput = await password({
        message: `Password (${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH} characters long):`,
      });

      const newPassword = z
        .string({
          required_error: "Password is required",
        })
        .trim()
        .min(
          MIN_PASSWORD_LENGTH,
          `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
        )
        .max(
          MAX_PASSWORD_LENGTH,
          `Password must not be longer than ${MAX_PASSWORD_LENGTH} characters`,
        )
        .parse(newPasswordInput);

      const confirmPassword = await password({ message: "Confirm password:" });

      if (newPassword !== confirmPassword) {
        console.log("Password does not match");
        return;
      }
      console.log("Creating user");

      await prismaClient.user.create({
        data: {
          firstName: "Super",
          lastName: "User",
          email,
          password: newPassword,
          status: UserStatus.Active,
          rolesAssignedToUser: {
            create: {
              role: {
                connect: {
                  id: superUserRole.id,
                },
              },
            },
          },
        },
      });
      logger.info("User created and assigned root role");
    } else {
      console.log("User already exist.");
    }
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e.formErrors.formErrors);
    } else {
      logger.error({
        error: e,
      });
    }
  }
}

createRootUser();
