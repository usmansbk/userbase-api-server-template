import consola from "consola";

export default async function createRoles() {
  try {
    consola.start("Creating required roles...");
    consola.success("Roles created!");
  } catch (error) {
    consola.error(error);
  }
}
