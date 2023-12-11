import ViewAllItems from "./ViewAllItems";
import { useLoaderData, json } from "react-router-dom";

import { PROCUREMENT_API_KEY, PROCUREMENT_LINK } from "../../../utils/env_config";

const ItemsContainer = () => {
  const { data } = useLoaderData();
  return <ViewAllItems data={data} />;
};

export default ItemsContainer;

async function loadItems() {
  const response = await fetch( `${PROCUREMENT_LINK}/api/item_center/get_all_items`,
    {
      method: "GET",
      headers: {
        "x-api-key": PROCUREMENT_API_KEY,
      },
    }
  );

  if (!response.ok) {
    return json(
      { message: "Could not fetch items data." },
      { status: 500 || 503 }
    );
  } else {
    const resData = await response.json();
    console.log("Items: ", resData.items_data);
    return resData.items_data;
  }
}

export async function loader() {
  return {
    data: await loadItems(),
  };
}
