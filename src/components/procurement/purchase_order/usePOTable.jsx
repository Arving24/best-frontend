import { useState } from "react";
import { Link } from "react-router-dom";

const usePOTable = () => {
    const [searchText, setSearchText] = useState("");

    const columns = [
      {
          title: "Purchar Order No.",
          dataIndex: "po_id",
          key: "po_id",
          width: "20%",
          ellipsis: true,
          render: (dataIndex) => (
            <Link to={`${dataIndex}`}>
              {dataIndex}
            </Link>
          ),
          filteredValue: [searchText],
          onFilter: (value, record) => {
            return String(record.po_id).toLowerCase().includes(value.toLowerCase()) 
          },
        },
        {
          title: "Purchase Order Date",
          dataIndex: "pr_date",
          key: "pr_date",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Supplier Name",
          dataIndex: "supplier_name",
          key: "supplier_name",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Notes",
          dataIndex: "notes",
          key: "notes",
          width: "15%",
          ellipsis: true,
        },
        {
          title: "Amount",
          dataIndex: "grand_total",
          key: "grand_total",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Approval Status",
          dataIndex: "is_approved",
          key: "is_approved",
          width: "20%",
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

export default usePOTable
