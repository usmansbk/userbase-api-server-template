import { PrismaClient } from "@prisma/client";

export default function getPrismaClient() {
  const prismaClient = new PrismaClient().$extends({
    model: {
      user: {
        async current(id: string) {
          return await prismaClient.user.findUnique({
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
        },
      },
    },
  });

  return prismaClient;
}

export type ExtendedPrismaClient = ReturnType<typeof getPrismaClient>;
