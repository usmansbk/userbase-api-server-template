import consola from "consola";

export default async function createOwner() {
  try {
    consola.start("Creating project owner...");
    consola.success("Project owner created!");
  } catch (error) {
    consola.error(error);
  }
}
