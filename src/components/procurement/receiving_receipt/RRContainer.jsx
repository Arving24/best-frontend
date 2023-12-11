import ViewAllRR from "./ViewAllRR"
import { useLoaderData, json } from "react-router-dom";

import { PROCUREMENT_API_KEY, PROCUREMENT_LINK } from "../../../utils/env_config";

const RRContainer = () => {
  const { data } = useLoaderData();
 
  return <ViewAllRR data={data} />
}

export default RRContainer

async function loadRR() {
    const response = await fetch(`${PROCUREMENT_LINK}/api/receiving_receipt/get_all_rr`, {
      method: "GET",
      headers: {
        "x-api-key": PROCUREMENT_API_KEY,
      },
    });
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch receiving receipt data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("Supplier: ", resData.rr_data);
      return resData.rr_data;
    }
  }
  
  export async function loader() {
    return {
      data: await loadRR(),
    };
  }
