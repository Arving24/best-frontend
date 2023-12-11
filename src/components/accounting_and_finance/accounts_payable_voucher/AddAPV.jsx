import React from 'react';
import { Link } from "react-router-dom";
import { FormContainer, FormAction } from "../../layout/container/FormContainer";
import { Breadcrumb } from 'antd';
import APVForm from './APVForm';

const AddAPV = (props) => {

  var editView = false;

  return (
    <FormContainer>
      <FormAction>
          <div>
            <Breadcrumb separator="" items={[
              {
                title: 'Location:',
              },
              {
                title: <Link style={{ color: '#909090' }} to="../apv/home">Home</Link>,
              },
              {
                type: 'separator',
              },
              {
                title: <Link style={{ color: '#909090' }} to="../apv/view_all">APV List</Link>,
              },
              {
                type: 'separator',
              },
              {
                title: 'New APV',
              }
            ]} />
          </div>
      </FormAction>

      {/* APV Form Content */}
      <APVForm editView={editView} />

    </FormContainer>
  );

};


export default AddAPV;