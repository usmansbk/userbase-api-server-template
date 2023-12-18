import consola from "consola";
import prismaClient from "@/config/database";

const defaultApplication = {
  name: "Default App",
};

export default async function createApplication() {
  try {
    consola.start("Creating default application...");

    let defaultApp = await prismaClient.application.findFirst({
      where: {
        name: defaultApplication.name,
      },
    });

    if (defaultApp) {
      consola.success(`${defaultApplication.name} already exists.`);
    } else {
      defaultApp = await prismaClient.application.create({
        data: {
          name: defaultApplication.name,
        },
      });
      consola.success("Application created!");
    }
  } catch (error) {
    consola.error(error);
  }
}
