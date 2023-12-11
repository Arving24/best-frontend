import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormContainer,
  FormAction,
  FormContent,
  FormTitle,
  FormInfoFull,
} from "../../layout/container/FormContainer";
import { Breadcrumb, Button, Input } from "antd";
import useTableColumn from "./useTableColumn";
import ListLayout from "../../layout/container/ListLayout";
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import LoadingContext from "../../../context/LoadingContext";
import TableListView from "../../table/Table";

const ViewAllAPV = ({ data }) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useTableColumn();
  const { setIsLoading } = useContext(LoadingContext);

  const addHandler = () => {
    navigate('add_apv')
  }

  useEffect(() => {
    if (data.apv_data.length > 0) {
      setIsLoading(false)
      const newData = data.apv_data.map((e) => {
        // var due_date = new Date(e.apv_data.due_date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" });
        return {
          apv_id: e.apv_id,
          transaction_date: new Date(e.transaction_date).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
          ),
          due_date: new Date(e.due_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          supplier_id: e.supplier_id,
          created_date: new Date(
            new Date(e.created_date).toISOString().split("T")[0]
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          is_fully_paid: e.is_fully_paid
            ? "Fully Paid"
            : e.is_partially_paid
            ? "Partially Paid"
            : "Not Paid",
          is_active: e.is_active ? "Active" : "Inactive",
        };
      });
      setAllData(newData);
    }
  }, [data, setIsLoading]);

  return (
    <FormContainer>
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
                title: "APV List",
              },
            ]}
          />
        </div>
      </FormAction>
      <FormContent>
        <FormTitle>
          <p>Accounts Payable Voucher (APV)</p>
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

export default ViewAllAPV;
