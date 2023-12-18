import consola from "consola";

export default async function createApplication() {
  try {
    consola.start("Creating default application...");
    consola.success("Application created!");
  } catch (error) {
    consola.error(error);
  }
}
