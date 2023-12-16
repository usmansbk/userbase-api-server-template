import prismaClient from "@/config/database";
import logger from "@/utils/logger";

const permissions: string[] = [
  "CreateUser",
  "ReadUser",
  "UpdateUser",
  "DeleteUser",
  "ReadUserAvatar",
  "DeleteUserAvatar",
  "SendVerificationEmail",
  "SendPhoneNumberVerificationSMS",
  "SendPasswordResetEmail",
  "SendEmailLoginOTP",
  "SendSMSLoginOTP",
  "CreateRole",
  "ReadRole",
  "UpdateRole",
  "DeleteRole",
  "AssignRole",
  "CreatePermission",
  "ReadPermission",
  "UpdatePermission",
  "DeletePermission",
  "GrantPermission",
  "ReadSession",
  "DeleteSession",
  "ReadFile",
  "DeleteFile",
  "ReadUserEmail",
  "ReadUserPhoneNumber",
];

export default async function createPermissions() {
  try {
    logger.info("Createing permissions...");
    await prismaClient.permission.createMany({
      data: permissions.map((name) => ({
        name,
      })),
    });
    logger.info(`${permissions.length} Permissions created`);
  } catch (error) {
    logger.error({
      error,
    });
  }
}

createPermissions();