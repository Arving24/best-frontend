import PermissionForm from "./PermissionForm";
// import { redirect } from "react-router-dom";
import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";
import axios from "axios";
import { notification } from "antd";

const CreatePermission = () => {
  return <PermissionForm method="post"  />;
};

export default CreatePermission;

export async function action({ request, params }) {
  const data = await request.formData();

  const permissionData = {
    permission_name: data.get("permission_name"),
  };
  console.log("Action", permissionData);

  try {
    const response = await axios({
      url: `${AUTH_LINK}/api/permissions/add_permission`,
      data: permissionData,
      method: "POST",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    });
    console.log("Response", response.data.status);

    notification.open({
      message: "Success",
      description: response.data.message,
      duration: 3,
      type: "success",
      style: {
        backgroundColor: "#e6ffe6",
      },
    });
    // redirect("../add_permission");
    return response.data.status; 
    
  } catch (error) {
    // Handle any errors that occurred during the request
    // console.error("Error", error);
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
