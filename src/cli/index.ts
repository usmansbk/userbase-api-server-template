import consola from "consola";
import createPermissions from "./createPermissions";
import createRoles from "./createRoles";
import createOwner from "./createOwner";
import createApplication from "./createApplication";
import generateSecurityKeys from "./generateSecurityKeys";

async function init() {
  consola.info("Initializing project");

  await generateSecurityKeys();

  await createApplication();

  await createRoles();

  await createPermissions();

  await createOwner();

  consola.box("Project is ready!");
  consola.success("Done!");
}

init();
