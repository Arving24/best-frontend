import ViewAllRole from "./ViewAllRoles";
import { useLoaderData, json } from "react-router-dom";

import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";

const RolesContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllRole data={data}/>
}

export default RolesContainer

async function loadRoles() {
    const response = await fetch(`${AUTH_LINK}/api/roles/get_all_roles`, {
      method: "GET",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    });
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch roles data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("Roles: ", resData.all_roles_data);
      return resData.all_roles_data;
    }
  }
  
  export async function loader() {
    return {
      data: await loadRoles(),
    };
  }
