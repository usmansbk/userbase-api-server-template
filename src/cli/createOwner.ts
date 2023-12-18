import consola from "consola";
import prismaClient from "@/config/database";
import { input, password, confirm } from "@inquirer/prompts";
import { z } from "zod";
import {
  USER_NAME_MAX_LENGTH,
  USER_NAME_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "@/constants/limits";
import { UserStatus } from "@prisma/client";

const rootRole = {
  name: "Root",
  description:
    "This role has unrestricted access to the server's resources, allowing them to configure and manage the API server and perform critical administrative tasks. It's essential to exercise caution when using the root user account to prevent unintended consequences and potential security risks.",
};

const nameSchema = z
  .string()
  .min(
    USER_NAME_MIN_LENGTH,
    `Name should be at least ${USER_NAME_MIN_LENGTH} characters long.`,
  )
  .max(
    USER_NAME_MAX_LENGTH,
    `Name should be at least ${USER_NAME_MAX_LENGTH} characters long.`,
  );

const passwordSchema = z
  .string()
  .min(
    USER_PASSWORD_MIN_LENGTH,
    `Password should be at least ${USER_PASSWORD_MIN_LENGTH} characters long.`,
  )
  .max(
    USER_PASSWORD_MAX_LENGTH,
    `Password should be at most ${USER_PASSWORD_MAX_LENGTH} characters long.`,
  );

export default async function createOwner() {
  consola.start("Creating project owner...");

  let owner = await prismaClient.user.findFirst({
    where: {
      rolesAssignedToUser: {
        some: {
          role: {
            name: rootRole.name,
          },
        },
      },
    },
  });

  if (!owner) {
    const user = {
      firstName: await input({
        message: `What's your first name?`,
        transformer(value) {
          return value.trim();
        },
        validate(value: string) {
          const result = nameSchema.safeParse(value);
          if (!result.success) {
            return result.error.formErrors.formErrors.join(",");
          }

          return result.success;
        },
      }),
      lastName: await input({
        message: "What's your last name (optional)?",
        transformer(value) {
          return value.trim();
        },
        validate(value: string) {
          if (!value.length) {
            return true;
          }

          const result = nameSchema.nullable().safeParse(value);
          if (!result.success) {
            return result.error.formErrors.formErrors.join(",");
          }

          return result.success;
        },
      }),
      surname: await input({
        message: "What's your surname (optional)?",
        transformer(value) {
          return value.trim();
        },
        validate(value: string) {
          if (!value.length) {
            return true;
          }

          const result = nameSchema.nullable().safeParse(value);
          if (!result.success) {
            return result.error.formErrors.formErrors.join(",");
          }

          return result.success;
        },
      }),
      email: await input({
        message: "What's your email address?",
        transformer(value) {
          return value.trim();
        },
        validate(value) {
          const result = z.string().email().safeParse(value);
          if (!result.success) {
            return result.error.formErrors.formErrors.join(",");
          }

          return result.success;
        },
      }),
      password: await password({
        message: "Enter your password:",
        validate(value) {
          const result = passwordSchema.safeParse(value);

          if (!result.success) {
            return result.error.formErrors.formErrors.join(",");
          }

          return result.success;
        },
      }),
    };

    await password({
      message: "Retype password:",
      validate(value) {
        if (value !== user.password) {
          return "Password does not match!";
        }
        return true;
      },
    });

    const confirmed = await confirm({
      message: "Is user info correct?",
    });

    if (confirmed) {
      owner = await prismaClient.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          surname: user.surname,
          email: user.email,
          password: user.password,
          status: UserStatus.Active,
          rolesAssignedToUser: {
            create: {
              role: {
                create: rootRole,
              },
            },
          },
        },
      });
    } else {
      throw new Error("Cancelled");
    }
  }

  consola.success(`Project owner is ${owner.firstName} (${owner.email})`);

  return owner;
}
