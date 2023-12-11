import { useState } from "react";
import { Link } from "react-router-dom";

const useJVTable = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
        title: "Journal Vouche ID",
        dataIndex: "jv_id",
        key: "jv_id",
        width: "30%",
        ellipsis: true,
        render: (dataIndex) => (
          <Link to={`${dataIndex}`}>
            {dataIndex}
          </Link>
        ),
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return String(record.jv_id).toLowerCase().includes(value.toLowerCase()) 
        },
      },
      {
        title: "Journal Voucher Date",
        dataIndex: "jv_date",
        key: "jv_date",
        width: "30%",
        ellipsis: true,
      },
      {
        title: "Amount",
        dataIndex: "total_amount",
        key: "total_amount",
        width: "30%",
        ellipsis: true,
      },
  ];
  return {
    columns,
    searchText,
    setSearchText,
  };
};

export default useJVTable;