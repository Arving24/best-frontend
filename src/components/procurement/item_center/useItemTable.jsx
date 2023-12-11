import { useState } from "react";
import { Link } from "react-router-dom";

const useItemTable = () => {
    const [searchText, setSearchText] = useState("");

    const columns = [
      {
          title: "Item ID",
          dataIndex: "item_id",
          key: "item_id",
          width: "15%",
          ellipsis: true,
          render: (dataIndex) => (
            <Link to={`${dataIndex}`}>
              {dataIndex}
            </Link>
          ),
          filteredValue: [searchText],
          onFilter: (value, record) => {
            return String(record.item_id).toLowerCase().includes(value.toLowerCase()) ||
                   String(record.item_name).toLowerCase().includes(value.toLowerCase()) ||
                   String(record.supplier_information.supplier_name).toLowerCase().includes(value.toLowerCase()) 
          },
        },
        {
          title: "Item Name",
          dataIndex: "item_name",
          key: "item_name",
          width: "30%",
          ellipsis: true,
        },
        {
          title: "Supplier Name",
          dataIndex: "supplier_name",
          key: "supplier_name",
          width: "30%",
          ellipsis: true,
        },
        {
          title: "Item Price",
          dataIndex: "price_per_piece",
          key: "price_per_piece",
          width: "15%",
          ellipsis: true,
        },
        {
          title: "Active Status",
          dataIndex: "is_active",
          key: "is_active",
          width: "15%",
          ellipsis: true,
        },
    ];
    return {
      columns,
      searchText,
      setSearchText,
    };
}

export default useItemTable
