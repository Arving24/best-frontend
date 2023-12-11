import ViewAllCV from "./ViewAllCV";
import { useLoaderData, json } from "react-router-dom";

import { FINANCE_LINK, FINANCE_API_KEY } from "../../../utils/env_config";

const CVContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllCV  data={data}/>;
};

export default CVContainer;

async function loadCV() {
    const response = await fetch(
      `${FINANCE_LINK}/api/cash_voucher/get_all_cv`,
      {
        method: "GET",
        headers: {
          "x-api-key": FINANCE_API_KEY,
        },
      }
    );
  
    if (!response.ok) {
      return json(
        { message: "Could not fetch cash voucher data." },
        { status: 500 || 503 }
      );
    } else {
      const resData = await response.json();
      console.log("CV: ", resData.all_cv);
      return resData.all_cv;
    }
  }
  
  export async function loader() {
    return {
      data: await loadCV(),
    };
  }