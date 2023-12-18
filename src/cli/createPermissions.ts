import consola from "consola";
import prismaClient from "@/config/database";

const permissions: Array<{ name: string; description: string }> = [
  {
    name: "CreateApplication",
    description: "",
  },
  {
    name: "ReadApplication",
    description: "",
  },
  {
    name: "UpdateApplication",
    description: "",
  },
  {
    name: "DeleteApplication",
    description: "",
  },
  {
    name: "CreateUser",
    description: "",
  },
  {
    name: "ReadUser",
    description: "",
  },
  {
    name: "UpdateUser",
    description: "",
  },
  {
    name: "DeleteUser",
    description: "",
  },
  {
    name: "SendVerificationEmail",
    description: "",
  },
  {
    name: "SendPhoneNumberVerificationSMS",
    description: "",
  },
  {
    name: "SendPasswordResetEmail",
    description: "",
  },
  {
    name: "SendEmailLoginOTP",
    description: "",
  },
  {
    name: "SendSMSLoginOTP",
    description: "",
  },
  {
    name: "UnblockUserLoginIP",
    description: "",
  },
  {
    name: "CreateRole",
    description: "",
  },
  {
    name: "ReadRole",
    description: "",
  },
  {
    name: "UpdateRole",
    description: "",
  },
  {
    name: "DeleteRole",
    description: "",
  },
  {
    name: "CreatePermission",
    description: "",
  },
  {
    name: "ReadPermission",
    description: "",
  },
  {
    name: "UpdatePermission",
    description: "",
  },
  {
    name: "DeletePermission",
    description: "",
  },
  {
    name: "CreateUserAvatar",
    description: "",
  },
  {
    name: "ReadUserAvatar",
    description: "",
  },
  {
    name: "UpdateUserAvatar",
    description: "",
  },
  {
    name: "DeleteUserAvatar",
    description: "",
  },
  {
    name: "ReadUserSession",
    description: "",
  },
  {
    name: "DeleteUserSession",
    description: "",
  },
  {
    name: "CreateFile",
    description: "",
  },
  {
    name: "ReadFile",
    description: "",
  },
  {
    name: "UpdateFile",
    description: "",
  },
  {
    name: "DeleteFile",
    description: "",
  },
  {
    name: "ReadRolePermission",
    description: "",
  },
  {
    name: "GrantRolePermission",
    description: "",
  },
  {
    name: "ReadUserPermission",
    description: "",
  },
  {
    name: "GrantUserPermission",
    description: "",
  },
  {
    name: "ReadUserRole",
    description: "",
  },
  {
    name: "AssignUserRole",
    description: "",
  },
];

export default async function createPermissions() {
  try {
    consola.start(`Creating ${permissions.length} permissions...`);

    await Promise.all(
      permissions.map(async ({ name, description }) => {
        let permission = await prismaClient.permission.findFirst({
          where: {
            name,
          },
        });

        if (!permission) {
          permission = await prismaClient.permission.create({
            data: {
              name,
              description,
            },
          });
        }

        consola.info(name);
      }),
    );

    consola.success("Permissions created!");
  } catch (error) {
    consola.error(error);
  }
}
