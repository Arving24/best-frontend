import { useState } from "react";
import { Link } from "react-router-dom";

const useRoleTable = () => {
    const [searchText, setSearchText] = useState("");

    const columns = [
      {
          title: "Role ID",
          dataIndex: "role_id",
          key: "role_id",
          width: "20%",
          ellipsis: true,
          render: (dataIndex) => (
            <Link to={`${dataIndex}`}>
              {dataIndex}
            </Link>
          ),
          filteredValue: [searchText],
          onFilter: (value, record) => {
            return String(record.role_id).toLowerCase().includes(value.toLowerCase()) 
          },
        },
        {
          title: "Role Name",
          dataIndex: "role_name",
          key: "role_name",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Created By",
          dataIndex: "created_by",
          key: "created_by",
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
          title: "Last Updated By",
          dataIndex: "last_updated_by",
          key: "last_updated_by",
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

export default useRoleTable
