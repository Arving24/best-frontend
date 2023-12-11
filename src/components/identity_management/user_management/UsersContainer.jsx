import ViewAllusers from "./ViewAllUsers";
import { useLoaderData, json } from "react-router-dom";

import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";
import { decryptData } from "../../../utils/encryption";
import { ENCRYPTION_KEY } from "../../../utils/env_config";


const UsersContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllusers data={data}/>;
};

export default UsersContainer;

async function loadUsers() {
  const saved = localStorage.getItem("t");
  const initialValue = await JSON.parse(saved);
  const DataToken = decryptData(initialValue, ENCRYPTION_KEY);

  if (DataToken) {
    const response = await fetch(`${AUTH_LINK}/api/users/get_all_users`, {
      method: "GET",
      headers: {
        "x-api-key": AUTH_API_KEY,
        "Content-Type": "text/plain",
        "Authorization": `Bearer ${DataToken}`,
      },
    });

    if (!response.ok) {
      return json(
        { message: "Could not fetch users data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      return resData.all_users_data.users;
    }
  }
}


export async function loader() {
  return {
    data: await loadUsers(),
  };
}
