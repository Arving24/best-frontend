import ViewAllRFP from "./ViewAllRFP";
import { useLoaderData, json } from "react-router-dom";

import { FINANCE_LINK, FINANCE_API_KEY } from "../../../utils/env_config";

const RFPContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllRFP data={data}/>;
};

export default RFPContainer;

async function loadRFP() {
  const response = await fetch(`${FINANCE_LINK}/api/rfp/get_all`, {
    method: "GET",
    headers: {
      "x-api-key": FINANCE_API_KEY,
    },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch RFP data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("RFP: ", resData.all_rfp_data);
    return resData.all_rfp_data;
  }
}

export async function loader() {
  return {
    data: await loadRFP(),
  };
}
