import consola from "consola";
import createPermissions from "./createPermissions";
import createRoles from "./createRoles";
import createOwner from "./createOwner";

async function init() {
  consola.info("Userbase v1.0");
  consola.start("Initializing project...");

  await createRoles();

  await createPermissions();

  await createOwner();

  consola.box("Your app is ready!");
  consola.success("Done!");
}

init();
