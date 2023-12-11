import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FormContainer, FormAction, FormContent, FormTitle, FormInfoFull } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from 'antd';

import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import useCVTable from './useCVTable';
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { NumberToPhp } from '../../../utils/functions';
import LoadingContext from '../../../context/LoadingContext';
import TableListView from '../../table/Table';


const ViewAllCV = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useCVTable();
  const { setIsLoading } = useContext(LoadingContext)

  const addHandler = () => {
    navigate('add_cv')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          cv_id: e.cv_id,
          cv_date: e.cv_date,
          due_date: e.due_date,
          supplier_id: e.supplier_id ? e.supplier_id : e.cv_type === 'Credit' ? 'Credit (No Supplier)' : 'RFP (No Supplier)',
          particulars: e.particulars,
          total_amount_paid: NumberToPhp(e.total_amount_paid),
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
                type: 'separator',
              },
              {
                title: 'CV List'
              }
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className='text-uppercase'>Cash Voucher (CV)</p></FormTitle>
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

export default ViewAllCV;
