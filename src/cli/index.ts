import consola from "consola";
import createApplication from "./createApplication";
import createAdmin from "./createAdminRole";
import createPermissions from "./createPermissions";
import createOwner from "./createOwner";
import generateSecurityKeys from "./generateSecurityKeys";

async function init() {
  try {
    consola.info("Initializing project");

    await createOwner();

    const app = await createApplication();

    await createAdmin();

    await createPermissions();

    await generateSecurityKeys();

    consola.box(`Client ID: ${app.clientId}`);

    consola.success("Done!");
  } catch (e) {
    consola.error(e);
  }
}

init();
