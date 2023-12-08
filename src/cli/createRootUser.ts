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
      superUserRole = await prismaClient.role.create({
        data: {
          name: "Admin",
          description: "For administrative purposes",
        },
      });
      console.log("Role created");
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
      const email = await input({ message: "Email:" });
      const newPassword = await password({
        message: "Password (10 - 32 characters long):",
      });

      if (
        newPassword.length < MIN_PASSWORD_LENGTH &&
        password.length > MAX_PASSWORD_LENGTH
      ) {
        console.log("Password should be 8 - 32 characters long");
        return;
      }

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
    logger.error(e);
  }
}

createRootUser();
