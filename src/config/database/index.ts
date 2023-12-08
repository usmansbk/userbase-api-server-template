import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { CurrentUser, UserSessions } from "types";
import type { AccountStatus } from "types/graphql";

const prismaClient = new PrismaClient();
const salt = bcrypt.genSaltSync(10);

const checkPasswordExtension = Prisma.defineExtension({
  name: "check password",
  result: {
    user: {
      comparePassword: {
        needs: { password: true },
        compute(user) {
          return (password: string) => bcrypt.compare(user.password, password);
        },
      },
    },
  },
});

const currentUserExtension = Prisma.defineExtension({
  model: {
    user: {
      async currentUser(id: string): Promise<CurrentUser | null> {
        const user = await prismaClient.user.findUnique({
          where: {
            id,
          },
          include: {
            rolesAssignedToUser: {
              include: {
                role: {
                  include: {
                    rolePermissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
            permissionsAssignedToUser: {
              include: {
                permission: true,
              },
            },
          },
        });

        if (!user) {
          return null;
        }

        return {
          id,
          status: user.status as AccountStatus,
          sessions: user.sessions as UserSessions,
          language: user.lastName,
          roles: user.rolesAssignedToUser.map((userRole) => userRole.role.name),
          permissions: user.permissionsAssignedToUser
            .map((userPermission) => userPermission.permission.name)
            .concat(
              user.rolesAssignedToUser.flatMap((userRole) =>
                userRole.role.rolePermissions.map(
                  (rolePermission) => rolePermission.permission.name,
                ),
              ),
            ),
        };
      },
    },
  },
});

const client = prismaClient
  .$extends(currentUserExtension)
  .$extends(checkPasswordExtension);

export type ExtendedPrismaClient = typeof client;

export default client;
