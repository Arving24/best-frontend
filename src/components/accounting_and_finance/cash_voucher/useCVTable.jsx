import { useState } from "react";
import { Link } from "react-router-dom";

const useCVTable = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
        title: "CV ID",
        dataIndex: "cv_id",
        key: "cv_id",
        width: "20%",
        ellipsis: true,
        // sorter: (a, b) => a.account_code - b.apv_id,
        render: (dataIndex) => (
          <Link to={`${dataIndex}`}>
            {dataIndex}
          </Link>
        ),
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return String(record.cv_id).toLowerCase().includes(value.toLowerCase()) 
        },
      },
      {
        title: "CV Date",
        dataIndex: "cv_date",
        key: "cv_date",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Due Date",
        dataIndex: "due_date",
        key: "due_date",
        width: "30%",
        ellipsis: true,
      },
      {
        title: "Supplier ID",
        dataIndex: "supplier_id",
        key: "supplier_id",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Memo",
        dataIndex: "particulars",
        key: "particulars",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Amount",
        dataIndex: "total_amount_paid",
        key: "total_amount_paid",
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

export default useCVTable;