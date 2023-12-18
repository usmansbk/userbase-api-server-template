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
      consola.warn(`${defaultApplication.name} already exists. Skipping...`);
    } else {
      defaultApp = await prismaClient.application.create({
        data: {
          name: defaultApplication.name,
        },
      });
      consola.info("Application created!");
    }

    consola.success(`Your client ID is ${defaultApp.clientId}`);
  } catch (error) {
    consola.error(error);
  }
}
