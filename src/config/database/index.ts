import storage from "@/utils/storage";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { CurrentUser } from "types";
import type { AccountStatus } from "types/graphql";

const prismaClient = new PrismaClient();

const salt = bcrypt.genSaltSync(10);

const deleteS3ObjectExtension = Prisma.defineExtension({
  name: "delete-s3-object-extention",
  query: {
    file: {
      async delete({ args, query }) {
        const { where } = args;
        if (typeof where.key === "string" && typeof where.bucket === "string") {
          storage.deleteObject(where.key, where.bucket);
        }

        return await query(args);
      },
    },
  },
});

const hashPasswordExtension = Prisma.defineExtension({
  name: "hash-password-extension",
  query: {
    user: {
      async create({ args, query }) {
        if (args.data.password) {
          args.data.password = await bcrypt.hash(args.data.password, salt);
        }
        return await query(args);
      },
      async createMany({ args, query }) {
        if (Array.isArray(args.data)) {
          await Promise.all(
            args.data.map(async (data) => {
              data.password = await bcrypt.hash(data.password, salt);
            }),
          );
        } else {
          args.data.password = await bcrypt.hash(args.data.password, salt);
        }
        return await query(args);
      },
      async update({ args, query }) {
        if (typeof args.data.password === "string") {
          args.data.password = await bcrypt.hash(args.data.password, salt);
        }

        return await query(args);
      },
      async updateMany({ args, query }) {
        if (Array.isArray(args.data)) {
          await Promise.all(
            args.data.map(async (data) => {
              data.password = await bcrypt.hash(data.password as string, salt);
            }),
          );
        } else if (typeof args.data.password === "string") {
          args.data.password = await bcrypt.hash(args.data.password, salt);
        }
        return await query(args);
      },
    },
  },
});

const comparePasswordExtension = Prisma.defineExtension({
  name: "compare-password-extension",
  result: {
    user: {
      comparePassword: {
        needs: { password: true },
        compute(user) {
          return async (password: string) =>
            await bcrypt.compare(password, user.password);
        },
      },
    },
  },
});

const currentUserExtension = Prisma.defineExtension({
  name: "current-user-extension",
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
            sessions: true,
          },
        });

        if (!user) {
          return null;
        }

        return {
          id,
          status: user.status as AccountStatus,
          sessions: user.sessions,
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
  .$extends(comparePasswordExtension)
  .$extends(hashPasswordExtension)
  .$extends(deleteS3ObjectExtension);

export type ExtendedPrismaClient = typeof client;

export default client;
