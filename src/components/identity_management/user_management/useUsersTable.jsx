import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingContext from "../../../context/LoadingContext";

const useUsersTable = () => {
    const [searchText, setSearchText] = useState("");
    const { setIsLoading } = useContext(LoadingContext)

    const onClickHandler = () => {
      setIsLoading(true)
     }

    const columns = [
      {
          title: "User ID",
          dataIndex: "id",
          key: "id",
          width: "10%",
          ellipsis: true,
          render: (dataIndex) => (
            <Link to={`${dataIndex}`} onClick={onClickHandler}>
              {dataIndex}
            </Link>
          ),
          filteredValue: [searchText],
          onFilter: (value, record) => {
            return String(record.id).toLowerCase().includes(value.toLowerCase()) ||
                   String(record.firstname).toLowerCase().includes(value.toLowerCase())
          },
        },
        {
          title: "Full Name",
          dataIndex: "firstname",
          key: "firstname",
          width: "30%",
          ellipsis: true,
        },
        {
          title: "Mobile Number",
          dataIndex: "mobileNumber",
          key: "mobileNumber",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          width: "30%",
          ellipsis: true,
        },
        {
          title: "Role Title",
          dataIndex: "roleId",
          key: "roleId",
          width: "20%",
          ellipsis: true,
        },
        {
          title: "Active Status",
          dataIndex: "isEnabled",
          key: "isEnabled",
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

export default useUsersTable