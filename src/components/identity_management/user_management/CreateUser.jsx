import UserForm from "./UserForm";
// import { redirect } from "react-router-dom";
import {
  AUTH_LINK,
  AUTH_API_KEY,
  ENCRYPTION_KEY,
} from "../../../utils/env_config";
import axios from "axios";
import { decryptData } from "../../../utils/encryption";
import { notification } from "antd";

const CreateUser = () => {
  return <UserForm method="post" />;
};

export default CreateUser;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    firstname: data.get("firstname"),
    middlename: data.get("middlename"),
    lastname: data.get("lastname"),
    username: data.get("email"),
    email: data.get("email"),
    jobTitle: data.get("jobTitle"),
    mobileNumber: data.get("mobileNumber"),
    secondaryEmail: data.get("secondaryEmail"),
    department: data.get("department"),
    roleId: data.get("roleId"),
    isEnabled: true,
  };
  console.log(userData);

  const saved = localStorage.getItem("t");
  const initialValue = await JSON.parse(saved);
  const DataToken = decryptData(initialValue, ENCRYPTION_KEY);

  if (DataToken) {
    try {
      const response = await axios({
        url: `${AUTH_LINK}/api/users/add_user`,
        data: JSON.stringify(userData),
        method: request.method,
        headers: {
          "x-api-key": AUTH_API_KEY,
          "Content-Type": "text/plain",
          'Authorization': `Bearer ${DataToken}`,
        },
      });

      console.log(response);

      notification.open({
        message: "Success",
        description: response.data.message,
        duration: 3,
        type: "success",
        style: {
          backgroundColor: "#e6ffe6",
        },
      });
      return response.data.status;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("error", error);
      notification.open({
        message: "Error",
        description: error.response.data.message,
        duration: 1.5,
        type: "error",
        style: {
          backgroundColor: "#ffcccc",
        },
      });
      return error.response.data.status;
    }
  }
}
