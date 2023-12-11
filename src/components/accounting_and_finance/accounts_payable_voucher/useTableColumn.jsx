import { useState } from "react";
import { Link } from "react-router-dom";

const useTableColumn = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      title: "APV ID",
      dataIndex: "apv_id",
      key: "apv_id",
      width: "20%",
      ellipsis: true,
      sorter: (a, b) => a.apv_id - b.apv_id,
      render: (dataIndex) => (
        <Link to={`${dataIndex}`}>
          {dataIndex}
        </Link>
      ),
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.apv_id).toLowerCase().includes(value.toLowerCase()) ||
               String(record.supplier_id).toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
      width: "30%",
      ellipsis: true,
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Supplier",
      dataIndex: "supplier_id",
      key: "supplier_id",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "created_date",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Payment Status",
      dataIndex: "is_fully_paid",
      key: "is_fully_paid",
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

export default useTableColumn;
