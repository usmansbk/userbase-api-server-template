import consola from "consola";
import prismaClient from "@/config/database";

const roles = [
  {
    name: "Root",
    description:
      "This role has unrestricted access to the server's resources, allowing them to configure and manage the API server and perform critical administrative tasks. It's essential to exercise caution when using the root user account to prevent unintended consequences and potential security risks.",
  },
  {
    name: "Admin",
    description:
      "Admins have access to advanced features, configuration settings, and management capabilities, allowing them to oversee and control various aspects of the API server. This role is crucial for system administration, ensuring the proper functioning, security, and maintenance of the API infrastructure.",
  },
];

export default async function createRoles() {
  consola.start(`Creating ${roles.length} roles...`);
  try {
    await Promise.all(
      roles.map(async ({ name, description }) => {
        let role = await prismaClient.role.findFirst({
          where: {
            name,
          },
        });

        if (!role) {
          role = await prismaClient.role.create({
            data: {
              name,
              description,
            },
          });
        }
        consola.info(name);
      }),
    );
    consola.success("Roles created!");
  } catch (error) {
    consola.error(error);
  }
}
