import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { NumberToPhp } from '../../../utils/functions';
import { FormContainer, FormContent, FormTitle, FormInfoFull, FormAction } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from 'antd';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import useRFPTable from './useRFPTable';
import LoadingContext from '../../../context/LoadingContext';
import TableListView from '../../table/Table';

const ViewAllRFP = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useRFPTable();
  const { setIsLoading } = useContext(LoadingContext);

  const addHandler = () => {
    navigate('add_rfp')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          rfp_id: e.rfp_id,
          payee: e.payee,
          date_requested: new Date(e.date_requested).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }),
          particulars_total_amount: NumberToPhp(e.particulars_total_amount),
          is_active: e.is_active ? 'Active' : 'Inactive',
          is_approved: e.is_approved ? 'Approved' : e.is_approved === null || '' ? 'Pending' : 'Rejected',
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
                title: 'RFP List',
              }
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p>REQUEST FOR PAYMENT (RFP)</p></FormTitle>
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

export default ViewAllRFP;
