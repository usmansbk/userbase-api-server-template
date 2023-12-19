import consola from "consola";
import prismaClient from "@/config/database";

const permissions: Array<{ name: string; description: string }> = [
  {
    name: "CreateApplication",
    description: "Grants permission to create a new application",
  },
  {
    name: "ReadApplication",
    description:
      "Allows access to view details and information about existing applications.",
  },
  {
    name: "UpdateApplication",
    description: "Permits modification of application details and settings.",
  },
  {
    name: "DeleteApplication",
    description: "Enables the deletion of an existing application.",
  },
  {
    name: "CreateUser",
    description: "Authorizes the creation of a new user account.",
  },
  {
    name: "ReadUser",
    description:
      "Provides access to view details and information about existing user accounts.",
  },
  {
    name: "UpdateUser",
    description: "Allows modification of user account details and settings.",
  },
  {
    name: "DeleteUser",
    description: "Grants permission to delete an existing user account.",
  },
  {
    name: "SendVerificationEmail",
    description: "Enables the sending of verification emails to users.",
  },
  {
    name: "SendPhoneNumberVerificationSMS",
    description: "Allows sending SMS messages for phone number verification.",
  },
  {
    name: "SendPasswordResetEmail",
    description: "Permits the sending of emails for password reset requests.",
  },
  {
    name: "SendEmailLoginOTP",
    description:
      "Enables the sending of One-Time Passwords (OTPs) via email for login.",
  },
  {
    name: "SendSMSLoginOTP",
    description: "Allows sending One-Time Passwords (OTPs) via SMS for login.",
  },
  {
    name: "UnblockUserLoginIP",
    description: "Grants permission to unblock or whitelist a user's login IP.",
  },
  {
    name: "CreateRole",
    description: "Authorizes the creation of a new role.",
  },
  {
    name: "ReadRole",
    description:
      "Allows access to view details and information about existing roles.",
  },
  {
    name: "UpdateRole",
    description: "Permits modification of role details and settings.",
  },
  {
    name: "DeleteRole",
    description: "Enables the deletion of an existing role.",
  },
  {
    name: "CreatePermission",
    description: "Authorizes the creation of a new permission.",
  },
  {
    name: "ReadPermission",
    description:
      "Allows access to view details and information about existing permissions.",
  },
  {
    name: "UpdatePermission",
    description: "Permits modification of permission details and settings.",
  },
  {
    name: "DeletePermission",
    description: "Enables the deletion of an existing permission.",
  },
  {
    name: "CreateUserAvatar",
    description: "Authorizes the creation or upload of a new user avatar.",
  },
  {
    name: "ReadUserAvatar",
    description:
      "Allows access to view details and information about user avatars.",
  },
  {
    name: "UpdateUserAvatar",
    description: "Permits modification or replacement of user avatars.",
  },
  {
    name: "DeleteUserAvatar",
    description: "Enables the deletion of an existing user avatar.",
  },
  {
    name: "ReadSession",
    description:
      "Allows access to view details and information about user sessions.",
  },
  {
    name: "DeleteSession",
    description: "Enables the termination or deletion of user sessions.",
  },
  {
    name: "CreateFile",
    description: "Authorizes the creation or upload of new files.",
  },
  {
    name: "ReadFile",
    description:
      "Allows access to view details and information about existing files.",
  },
  {
    name: "UpdateFile",
    description: "Permits modification or update of file details and contents.",
  },
  {
    name: "DeleteFile",
    description: "Enables the deletion of existing files.",
  },
  {
    name: "ReadRolePermission",
    description:
      "Allows access to view details and information about role permissions.",
  },
  {
    name: "GrantRolePermission",
    description: "Permits the assignment or granting of permissions to roles.",
  },
  {
    name: "ReadUserPermission",
    description:
      "Allows access to view details and information about user permissions.",
  },
  {
    name: "GrantUserPermission",
    description: "Permits the assignment or granting of permissions to users.",
  },
  {
    name: "ReadUserRole",
    description:
      "Allows access to view details and information about user roles.",
  },
  {
    name: "AssignUserRole",
    description: "Permits the assignment or modification of roles for users.",
  },
];

export default async function createPermissions() {
  consola.start(`Creating (${permissions.length}) permissions...`);

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
        consola.success(name);
      }
    }),
  );

  consola.success("Permissions created!");
}
