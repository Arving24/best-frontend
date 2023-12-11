import UserForm from "./UserForm";
import { useRouteLoaderData } from "react-router-dom";
import { AUTH_API_KEY, AUTH_LINK, ENCRYPTION_KEY } from "../../../utils/env_config";
import axios from "axios";
import { notification } from "antd";
import { decryptData } from "../../../utils/encryption";

const EditUser = () => {
  const {all_users_data} = useRouteLoaderData("user-details") ;

  return <UserForm data={all_users_data} method='put'/>;
};

export default EditUser;

export async function action({ request, params }) {
  const id = params.userId;
  const data = await request.formData();

  const userData = {
    id: id,
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

  const saved = localStorage.getItem("t");
  const initialValue = await JSON.parse(saved);
  const DataToken = decryptData(initialValue, ENCRYPTION_KEY);

  if (DataToken) {
    try {
      const response = await axios({
        url: `${AUTH_LINK}/api/users/update_user`,
        data: userData,
        method: "PUT",
        headers: {
            'x-api-key': AUTH_API_KEY,
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${DataToken}`,
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
      return response;

    } catch (error) {
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
