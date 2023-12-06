import { Prisma, PrismaClient } from "@prisma/client";
import type { CurrentUser } from "types";
import type { AccountStatus } from "types/graphql";

export default function getPrismaClient() {
  const prismaClient = new PrismaClient();

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
            language: user.lastName,
            roles: user.rolesAssignedToUser.map(
              (userRole) => userRole.role.name,
            ),
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

  return prismaClient.$extends(currentUserExtension);
}

export type ExtendedPrismaClient = ReturnType<typeof getPrismaClient>;
