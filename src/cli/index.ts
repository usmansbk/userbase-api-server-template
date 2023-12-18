import consola from "consola";
import createApplication from "./createApplication";
import createAdmin from "./createAdminRole";
import createPermissions from "./createPermissions";
import createOwner from "./createOwner";
import generateSecurityKeys from "./generateSecurityKeys";

async function init() {
  consola.info("Initializing project");

  await createOwner();

  await createApplication();

  await createAdmin();

  await createPermissions();

  await generateSecurityKeys();

  consola.box("Project is ready!");
  consola.success("Done!");
}

init();
