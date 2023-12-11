import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingContext from "../../../context/LoadingContext";

const usePermissionTable = () => {
    const [searchText, setSearchText] = useState("");
    const { setIsLoading } = useContext(LoadingContext)

   const onClickHandler = () => {
    setIsLoading(true)
   }

    const columns = [
      {
          title: "Permission ID",
          dataIndex: "permission_id",
          key: "permission_id",
          width: "20%",
          ellipsis: true,
          render: (dataIndex) => (
            <Link to={`${dataIndex}`} onClick={onClickHandler}>
              {dataIndex}
            </Link>
          ),
          filteredValue: [searchText],
          onFilter: (value, record) => {
            return String(record.module_id).toLowerCase().includes(value.toLowerCase()) 
          },
        },
        {
          title: "Permission Name",
          dataIndex: "permission_name",
          key: "permission_name",
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
}

export default usePermissionTable
