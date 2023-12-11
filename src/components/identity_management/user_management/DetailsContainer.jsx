import UserDetails from "./UserDetails";
import {
  AUTH_API_KEY,
  AUTH_LINK,
  ENCRYPTION_KEY,
} from "../../../utils/env_config";
import { decryptData } from "../../../utils/encryption";
import { json, useRouteLoaderData } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";

const DetailsContainer = () => {
  const { all_users_data } = useRouteLoaderData("user-details");

  return <UserDetails data={all_users_data} />;
};

export default DetailsContainer;

//fetch user details
export async function loader({ request, params }) {
  const id = params.userId;

  const saved = localStorage.getItem("t");
  const initialValue = await JSON.parse(saved);
  const DataToken = decryptData(initialValue, ENCRYPTION_KEY);

  if (DataToken) {
    const response = await fetch(
      `${AUTH_LINK}/api/users/get_user?user_id=` + id,
      {
        method: "GET",
        headers: {
          "x-api-key": AUTH_API_KEY,
          Authorization: `Bearer ${DataToken}`,
        },
      }
    );

    if (!response.ok) {
      return json(
        { message: "Could not fetch permissions data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      return resData;
    }
  }
}

//Update user status
export async function action({ request, params }) {
  const data = await request.formData();
  const id = params.userId;

  const userStatus = {
    id: id,
    isEnabled: data.get("isEnabled"),
  };

  const saved = localStorage.getItem("t");
  const initialValue = await JSON.parse(saved);
  const DataToken = decryptData(initialValue, ENCRYPTION_KEY);

  if (DataToken) {
    try {
      const response = await axios({
        url: `${AUTH_LINK}/api/users/update_user?user_id=` + id,
        data: JSON.stringify(userStatus),
        method: "PUT",
        headers: {
          "x-api-key": AUTH_API_KEY,
          "Content-Type": "text/plain",
          Authorization: `Bearer ${DataToken}`,
        },
      });

      notification.open({
        message: "Success",
        description: response.data.message,
        duration: 3,
        type: "success",
        style: {
          backgroundColor: "#e6ffe6",
        },
      });

      return response
    } catch (error) {
      // Handle any errors that occurred during the request
      notification.open({
        message: "Error",
        description: error.response.data.message,
        duration: 1.5,
        type: "error",
        style: {
          backgroundColor: "#ffcccc",
        },
      });
      return error;
    }
  }
}
