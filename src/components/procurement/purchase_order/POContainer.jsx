import ViewAllPO from './ViewAllPO';
import { useLoaderData, json } from "react-router-dom";

import { PROCUREMENT_API_KEY, PROCUREMENT_LINK } from "../../../utils/env_config";

const POContainer = () => {
  const { data } = useLoaderData();
  return <ViewAllPO data={data} />
}

export default POContainer

async function loadPO() {
    const response = await fetch(`${PROCUREMENT_LINK}/api/purchase_order/get_all_po`, {
      method: "GET",
      headers: {
        "x-api-key": PROCUREMENT_API_KEY,
      },
    });
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch purchase orders data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("Supplier: ", resData.po_data);
      return resData.po_data;
    }
  }
  
  export async function loader() {
    return {
      data: await loadPO(),
    };
  }
