import consola from "consola";
import prismaClient from "@/config/database";

const data = {
  name: "Admin",
  description:
    "Admins have access to advanced features, configuration settings, and management capabilities, allowing them to oversee and control various aspects of the API server. This role is crucial for system administration, ensuring the proper functioning, security, and maintenance of the API infrastructure.",
};

export default async function createAdminRole() {
  consola.start(`Creating admin role...`);
  try {
    let role = await prismaClient.role.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!role) {
      role = await prismaClient.role.create({
        data,
      });
    }
    consola.success("Admin role created!");
  } catch (error) {
    consola.error(error);
  }
}
