import ViewAllModules from "./ViewAllModules";
import { useLoaderData, json } from "react-router-dom";

import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";

const ModuleContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllModules data={data} />;
};

export default ModuleContainer;

async function loadModules() {
  const response = await fetch(`${AUTH_LINK}/api/modules/get_all_modules`, {
    method: "GET",
    headers: {
      "x-api-key": AUTH_API_KEY,
    },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch modules data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("Roles: ", resData.all_modules_data);
    return resData.all_modules_data;
  }
}

export async function loader() {
  return {
    data: await loadModules(),
  };
}
