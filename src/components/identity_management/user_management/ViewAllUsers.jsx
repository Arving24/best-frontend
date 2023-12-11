import React, { useState, useEffect, useContext } from "react";
import { FormContainer, FormAction, FormContent, FormTitle, FormInfoFull } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import useUsersTable from "./useUsersTable";
import LoadingContext from "../../../context/LoadingContext";
import TableListView from "../../table/Table";

const ViewAllusers = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useUsersTable();
  const { setIsLoading } = useContext(LoadingContext)

  const addHandler = () => {
    navigate('add_user')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          id: e.id,
          firstname: e.firstname.concat(" " + e.lastname),
          mobileNumber: e.mobileNumber,
          email: e.email,
          roleId: e.roleId,
          isEnabled: e.isEnabled ? 'Active' : 'Inactive',
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
                title: 'User List',
              },
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className='text-uppercase'>Users List</p></FormTitle>
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

export default ViewAllusers;