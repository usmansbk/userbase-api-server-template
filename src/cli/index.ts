import consola from "consola";
import createPermissions from "./createPermissions";
import createRoles from "./createRoles";
import createOwner from "./createOwner";
import createApplication from "./createApplication";
import createSecurityKeys from "./createSecurityKeys";

async function init() {
  consola.info("Initializing API Server");

  createSecurityKeys();

  await createApplication();

  await createRoles();

  await createPermissions();

  await createOwner();

  consola.box("Your project is ready!");
  consola.success("Done!");
}

init();
