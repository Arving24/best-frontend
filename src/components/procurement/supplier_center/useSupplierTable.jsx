import { useState } from "react";
import { Link } from "react-router-dom";

const useSupplierTable = () => {
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
        title: "Supplier ID",
        dataIndex: "supplier_id",
        key: "supplier_id",
        width: "20%",
        ellipsis: true,
        render: (dataIndex) => (
          <Link to={`${dataIndex}`}>
            {dataIndex}
          </Link>
        ),
        filteredValue: [searchText],
        onFilter: (value, record) => {
          return String(record.supplier_id).toLowerCase().includes(value.toLowerCase()) ||
                 String(record.supplier_name).toLowerCase().includes(value.toLowerCase()) ||
                 String(record.contact_person).toLowerCase().includes(value.toLowerCase()) 
        },
      },
      {
        title: "Supplier Name",
        dataIndex: "supplier_name",
        key: "supplier_name",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Contact Person",
        dataIndex: "contact_person",
        key: "contact_person",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Mobile Number",
        dataIndex: "mobile_number",
        key: "mobile_number",
        width: "20%",
        ellipsis: true,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: "40%",
        ellipsis: true,
      },
      {
        title: "TIN",
        dataIndex: "tin",
        key: "tin",
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
};

export default useSupplierTable;