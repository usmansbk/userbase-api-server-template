import getPrismaClient from "@/config/database";
import Redis from "ioredis-mock";

afterEach(async () => {
  await new Redis().flushall();
});

afterEach(async () => {
  const prisma = getPrismaClient();

  await prisma.userPermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.userAvatar.deleteMany();
  await prisma.user.deleteMany();
});
