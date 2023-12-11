import ViewAllSuppliers from "./ViewAllSuppliers";
import { useLoaderData, json } from "react-router-dom";

import { PROCUREMENT_API_KEY, PROCUREMENT_LINK } from "../../../utils/env_config";

const SupplierContainer = () => {
  const { data } = useLoaderData();

  return <ViewAllSuppliers data={data}/>;
};

export default SupplierContainer;

async function loadSupplier() {
  const response = await fetch(`${PROCUREMENT_LINK}/api/supplier_center/get_all_suppliers`, {
    method: "GET",
    headers: {
      "x-api-key": PROCUREMENT_API_KEY,
    },
  });

  if (!response.ok) {
    return json(
      { message: "Could not fetch supplier's data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("Supplier: ", resData.suppliers_data);
    return resData.suppliers_data;
  }
}

export async function loader() {
  return {
    data: await loadSupplier(),
  };
}