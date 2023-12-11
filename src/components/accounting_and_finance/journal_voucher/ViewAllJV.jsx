import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FormContainer, FormAction, FormContent, FormTitle, FormInfoFull } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button  } from 'antd';
import { NumberToPhp } from '../../../utils/functions';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import useJVTable from './useJVTable';
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import LoadingContext from '../../../context/LoadingContext';
import TableListView from '../../table/Table';


const ViewAllJV = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useJVTable();
  const { setIsLoading } = useContext(LoadingContext);

  const addHandler = () => {
    navigate('add_jv')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          jv_id: e.jv_id,
          jv_date: new Date(e.jv_date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }),
          total_amount: NumberToPhp(e.total_amount),
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
                title: 'Journal Voucher List'
              }
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className='text-uppercase'>Journal Voucher (JV) List</p></FormTitle>
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

export default ViewAllJV;
