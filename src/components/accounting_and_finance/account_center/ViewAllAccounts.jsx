import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormAction,
  FormContent,
  FormTitle,
  FormInfoFull,
} from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from "antd";
import {
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { NumberToPhp } from "../../../utils/functions";
import useAccTable from "./useAccTable";
import style from "../../layout/container/ReusableCSS.module.css";
import ListLayout from "../../layout/container/ListLayout";
import LoadingContext from "../../../context/LoadingContext";
import TableListView from "../../table/Table";

const ViewAllAccount = ({ data }) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useAccTable();
  const { setIsLoading } = useContext(LoadingContext);

  const addHandler = () => {
    navigate("add_account");
  };

  useEffect(() => {
      if (data.length > 0) {
        setIsLoading(false)
        const newData = data.map((e) => {
          return {
            account_code: e.account_code,
            sub_account_of: e.sub_account_of,
            account_name: e.account_name,
            account_type: e.account_type,
            currency: e.currency,
            current_balance: NumberToPhp(e.current_balance),
            is_active: e.is_active ? "Active" : "Inactive",
          };
        });
        setAllData(newData);
      }
  }, [data, setIsLoading]);

  return (
    <FormContainer rel="noopener noreferrer">
      <FormAction>
        <div>
          <Breadcrumb
            separator=""
            items={[
              {
                title: "Location:",
              },
              {
                type: "separator",
              },
              {
                title: "Account List",
              },
            ]}
          />
        </div>
      </FormAction>
      <FormContent>
        <FormTitle>
          <p className="text-uppercase">Account Center View List</p>
        </FormTitle>
        <FormInfoFull>
          <div className={style.container}>
            <div className={style.container_button}>
              <div className={style.container_button_div}>
                <Button onClick={addHandler}>
                  <PlusCircleOutlined />
                  ADD NEW
                </Button>
              </div>
              <div className={style.container_button_div}>
                <Button>
                  <VerticalAlignBottomOutlined />
                  EXPORT
                </Button>
              </div>
            </div>
            <div>
              <Input.Search
                placeholder="Input search text"
                className={style.search}
                allowClear
                onSearch={(value) => {
                  setSearchText(value);
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>
          </div>
          <ListLayout>
          <TableListView columns={columns} allData={allData}/>
          </ListLayout>
        </FormInfoFull>
      </FormContent>
    </FormContainer>
  );
};

export default ViewAllAccount;
