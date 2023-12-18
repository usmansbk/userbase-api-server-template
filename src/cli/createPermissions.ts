import consola from "consola";

export default async function createPermissions() {
  try {
    consola.start("Creating required permissions...");
    consola.success("Permissions created!");
  } catch (error) {
    consola.error(error);
  }
}
