import { json, useLoaderData } from "react-router-dom";
import ViewAllAPV from "./ViewAllAPV";

import { FINANCE_LINK, FINANCE_API_KEY } from "../../../utils/env_config";

const ViewAllAPVContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllAPV data={data} />;
};

export default ViewAllAPVContainer;

async function loadAPV() {
  const response = await fetch(`${FINANCE_LINK}/api/apv/get_all_apv`, {
    method: "GET",
    headers: {
      "x-api-key": FINANCE_API_KEY,
    },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch bank center data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("APV: ", resData);
    return resData;
  }
}

export async function loader() {
  return {
    data: await loadAPV(),
  };
}
