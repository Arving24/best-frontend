import ViewAllJV from "./ViewAllJV";
import { useLoaderData, json } from "react-router-dom";

import { FINANCE_LINK, FINANCE_API_KEY } from "../../../utils/env_config";

const JVContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllJV data={data}/>;
};

export default JVContainer;

async function loadJV() {
    const response = await fetch(`${FINANCE_LINK}/api/journal_voucher/get_all_jv`, {
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
      console.log("JV: ", resData.all_jv);
      return resData.all_jv;
    }
  }
  
  export async function loader() {
    return {
      data: await loadJV(),
    };
  }
