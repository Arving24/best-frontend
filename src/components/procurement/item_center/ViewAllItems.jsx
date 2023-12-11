import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FormContainer, FormContent, FormTitle, FormInfoFull, FormAction } from "../../layout/container/FormContainer";
import { Breadcrumb,  Input, Button } from 'antd';
import ListLayout from '../../layout/container/ListLayout';
import style from '../../layout/container/ReusableCSS.module.css'
import { PlusCircleOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { NumberToPhp } from '../../../utils/functions';
import useItemTable from './useItemTable';
import LoadingContext from '../../../context/LoadingContext';
import TableListView from '../../table/Table';


const ViewAllItems = ({data}) => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  const { columns, setSearchText } = useItemTable();
  const { setIsLoading } = useContext(LoadingContext)

  const addHandler = () => {
    navigate('add_item')
  }

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
      const newData = data.map((e) => {
        return {
          item_id: e.item_id,
          item_name: e.item_name,
          supplier_name: e.supplier_information?.supplier_name || '',
          price_per_piece: NumberToPhp(e.price_per_piece),
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
                title: <span>Location:</span>,
              },
              {
                type: 'separator',
              },
              {
                title: 'Item List',
              },
            ]} />
          </div>
      </FormAction>
      <FormContent>
        <FormTitle><p className="text-uppercase">Item List</p></FormTitle>
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

export default ViewAllItems;