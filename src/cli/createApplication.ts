import consola from "consola";
import prismaClient from "@/config/database";

const defaultApplication = {
  name: "Default App",
};

export default async function createApplication() {
  consola.start("Creating default application...");

  let defaultApp = await prismaClient.application.findFirst({
    where: {
      name: defaultApplication.name,
    },
  });

  if (!defaultApp) {
    defaultApp = await prismaClient.application.create({
      data: {
        name: defaultApplication.name,
      },
    });
  }
  consola.success(`${defaultApp.name} created!`);

  return defaultApp;
}
