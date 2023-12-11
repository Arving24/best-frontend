import React, { useState, useEffect, useContext } from "react";
import { FormContainer, FormAction, FormContent, FormTitle, FormInfoFull } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import usePermissionTable from "./usePermissionTable";
import LoadingContext from "../../../context/LoadingContext";
import TableListView from "../../table/Table";


const ViewAllPermissions = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = usePermissionTable();
  const { setIsLoading } = useContext(LoadingContext)

  const addHandler = () => {
    navigate('add_permission')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          permission_id: e.permission_id,
          permission_name: e.permission_name,
          created_by: e.created_by,
          created_date: new Date(e.created_date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }),
          last_updated_by: e.last_updated_by,
          is_active: e.is_active ? 'Active' : 'Inactive',
        };
      });
      setAllData(newData);
    }
  }, [data, setIsLoading]);



  return (
    <FormContainer>
      <FormAction>
          <div>
            <Breadcrumb separator="" items={[
              {
                title: 'Location:',
              },
              {
                title: 'Permissions List',
              },
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className="text-uppercase">Permissions List</p></FormTitle>
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

export default ViewAllPermissions;