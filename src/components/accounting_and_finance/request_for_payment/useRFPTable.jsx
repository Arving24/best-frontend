import { useState } from "react";
import { Link } from "react-router-dom";

const useRFPTable = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
        title: "RFP Number",
        dataIndex: "rfp_id",
        key: "rfp_id",
        width: "20%",
        ellipsis: true,
        render: (dataIndex) => (
          <Link to={`${dataIndex}`}>
            {dataIndex}
          </Link>
        ),
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return String(record.rfp_id).toLowerCase().includes(value.toLowerCase()) 
        },
      },
      {
        title: "Payee",
        dataIndex: "payee",
        key: "payee",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Date",
        dataIndex: "date_requested",
        key: "date_requested",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Amount",
        dataIndex: "particulars_total_amount",
        key: "particulars_total_amount",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Active Status",
        dataIndex: "is_active",
        key: "is_active",
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
  ];
  return {
    columns,
    searchText,
    setSearchText,
  };
};

export default useRFPTable;