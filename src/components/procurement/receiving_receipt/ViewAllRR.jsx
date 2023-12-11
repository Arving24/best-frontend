import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FormContainer, FormContent, FormTitle, FormInfoFull, FormAction } from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button } from 'antd';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { NumberToPhp } from "../../../utils/functions";
import useRRTable from './useRRTable';
import LoadingContext from '../../../context/LoadingContext';
import TableListView from '../../table/Table';


const ViewAllRR = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useRRTable();
  const { setIsLoading } = useContext(LoadingContext)

  const addHandler = () => {
    navigate('add_rr')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          rr_id: e.rr_id,
          pr_date: new Date(e.pr_date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" }),
          supplier_name: e.supplier_name,
          notes: e.notes,
          grand_total: e.grand_total === null || isNaN(e.grand_total)  ? "₱ 0.00" : NumberToPhp(parseFloat(e.grand_total)),
          is_approved: e.is_approved ? "Approved" : e.is_approved === null ? "Pending" : "Rejected",
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
                title: 'Receiving Receipt List',
              },
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className="text-uppercase">Receiving Receipt List</p></FormTitle>
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

export default ViewAllRR;