import React from "react";
import PermissionDetails from "./PermissionDetails";
import { useRouteLoaderData, json } from "react-router-dom";
import { AUTH_API_KEY, AUTH_LINK } from "../../../utils/env_config";
import axios from "axios";
import { notification } from "antd";

const PDetailsContainer = () => {
  const { permission_data } = useRouteLoaderData("permission-details");

  return (
    <PermissionDetails
      method="put"
      data={permission_data}
      key={permission_data.permission_id}
    />
  );
};

export default PDetailsContainer;

//fetch user details
export async function loader({ request, params }) {
  const id = params.permissionId;

  const response = await fetch(
    `${AUTH_LINK}/api/permissions/get_permission?permission_id=` + id,
    {
      method: "GET",
      headers: {
        "x-api-key": AUTH_API_KEY,
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
    // console.log("permission: ", resData);
    return resData;
  }
}

//Update permission status
export async function action({ request, params }) {
  const data = await request.formData();
  const id = params.permissionId;

  const permissionStatus = {
    id: id,
    is_active: data.get("is_active"),
  };
  console.log("User Status", permissionStatus);

  try {
    const response = await axios({
      url: `${AUTH_LINK}/api/permissions/change_permission_active_status`,
      params: { permission_id: id },
      method: "PUT",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    });
    // console.log("Response", response.data.status);

    notification.open({
      message: "Success",
      description: response.data.message,
      duration: 1.5,
      type: "success",
      style: {
        backgroundColor: "#e6ffe6",
      },
    }); 
    
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

    return error.response.data.status;
  }

  // await axios({

  // })
  //   .then((response) => {
  //     console.log(response);

  //     notification.open({
  //       message: "Success",
  //       description: response.data.message,
  //       duration: 3,
  //       type: "success",
  //       style: {
  //         backgroundColor: "#e6ffe6",
  //       },
  //     });
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occurred during the request
  //     console.error("error", error);
  //     notification.open({
  //       message: "Error",
  //       description: error.response.data.message,
  //       duration: 1.5,
  //       type: "error",
  //       style: {
  //         backgroundColor: "#ffcccc",
  //       },
  //     });
  //   });

  // return null;
}
