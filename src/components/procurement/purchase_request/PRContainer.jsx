import ViewAllPR from "./ViewAllPR";
import { useLoaderData, json } from "react-router-dom";

import { PROCUREMENT_API_KEY, PROCUREMENT_LINK } from "../../../utils/env_config";


const PRContainer = () => {
    const { data } = useLoaderData();
  return <ViewAllPR data={data} />
}

export default PRContainer

async function loadPR() {
    const response = await fetch(`${PROCUREMENT_LINK}/api/purchase_request/get_all_pr`, {
      method: "GET",
      headers: {
        "x-api-key": PROCUREMENT_API_KEY,
      },
    });
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch purchase request data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("PR: ", resData.pr_data);
      return resData.pr_data;
    }
  }
  
  export async function loader() {
    return {
      data: await loadPR(),
    };
  }
