import ViewAllPermissions from "./ViewAllPermissions";
import { useLoaderData, json } from "react-router-dom";

import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";

const PermissionContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllPermissions data={data}/>;
};

export default PermissionContainer;

async function loadPermissions() {
    const response = await fetch(`${AUTH_LINK}/api/permissions/get_all_permissions`, {
      method: "GET",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    });
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch permissions data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("Roles: ", resData.all_permissions_data);
      return resData.all_permissions_data;
    }
  }
  
  export async function loader() {
    return {
      data: await loadPermissions(),
    };
  }
  
