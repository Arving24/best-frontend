// import { useContext, useEffect } from "react";
import ViewAllAccount from "./ViewAllAccounts";
import { useLoaderData, json } from "react-router-dom";

import { FINANCE_LINK, FINANCE_API_KEY } from "../../../utils/env_config";
// import LoadingContext from "../../../context/LoadingContext";



const ViewAllAccountsContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllAccount data={data} />;
};

export default ViewAllAccountsContainer;

async function loadAccounts() {

  const response = await fetch(
    `${FINANCE_LINK}/api/accounts_center/get_all_accounts`,
    {
      method: "GET",
      headers: {
        "x-api-key": FINANCE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    return json(
      { message: "Could not fetch accounts data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("accounts: ", resData.all_accounts_data);
    return resData.all_accounts_data;
  }
}

export async function loader() {
  return {
    data: await loadAccounts(),
  };
}
