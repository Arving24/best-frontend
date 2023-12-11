import { useState } from "react";
import { Link } from "react-router-dom";

const useAccTable = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
        title: "Account Code",
        dataIndex: "account_code",
        key: "account_code",
        width: "20%",
        ellipsis: true,
        sorter: (a, b) => a.account_code - b.apv_id,
        render: (dataIndex) => (
          <Link to={`${dataIndex}`}>
            {dataIndex}
          </Link>
        ),
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return String(record.account_code).toLowerCase().includes(value.toLowerCase()) 
          // ||
          //        String(record.supplier_id).toLowerCase().includes(value.toLowerCase())
        },
      },
      {
        title: "Subaccount of",
        dataIndex: "sub_account_of",
        key: "tsub_account_of",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Account Name",
        dataIndex: "account_name",
        key: "account_name",
        width: "30%",
        ellipsis: true,
      },
      {
        title: "Account Type",
        dataIndex: "account_type",
        key: "account_type",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Currency",
        dataIndex: "currency",
        key: "currency",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Current Balance",
        dataIndex: "current_balance",
        key: "current_balance",
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
  ];
  return {
    columns,
    searchText,
    setSearchText,
  };
};

export default useAccTable;