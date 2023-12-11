import PermissionForm from "./PermissionForm";
import { useRouteLoaderData, redirect } from "react-router-dom";
import { AUTH_API_KEY, AUTH_LINK } from "../../../utils/env_config";
import axios from "axios";
import { notification } from "antd";


const EditPermission = () => {
  const permission_data = useRouteLoaderData("permission-details");

  return <PermissionForm data={permission_data} method="put" />;
};

export default EditPermission;

//Update permission status
export async function action({ request, params }) {
  const data = await request.formData();
  const id = params.permissionId;

  const permissionData = {
    permission_id: id,
    permission_name: data.get("permission_name"),
  };
  console.log("User Status", permissionData);

  try {
    const response = await axios({
      url: `${AUTH_LINK}/api/permissions/update_permission`,
      data: permissionData,
      method: "PUT",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    });

    console.log("Response",response.data.status);

    notification.open({
      message: "Success",
      description: response.data.message,
      duration: 3,
      type: "success",
      style: {
        backgroundColor: "#e6ffe6",
      },
    });
    return redirect('..');

  } catch (error) {
    // Handle errors
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
    // redirect('..')
    return error.response.data.status;
  }
}
