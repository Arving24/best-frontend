import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Stack } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { FormContainer, FormAction } from "../../formLayout/FormContainer";
import { Breadcrumb } from 'antd';
import { FINANCE_API_KEY, FINANCE_LINK } from '../../../utils/env_config';
import APVForm from './APVForm';

const MySwal = withReactContent(Swal)

const ViewAPV = (props) => {

  const { apvID } = useParams();
  var editView = true;

  const [oneAPVData, setoneAPVData] = useState([]);

  async function fetchOneAPVData() {
    await fetch(`${FINANCE_LINK}/api/apv/get_apv?apv_id=` + apvID, {
      method: 'GET',
      headers: {
        'x-api-key': FINANCE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setoneAPVData(data.apv_data)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  useEffect(() => {
    fetchOneAPVData();
  }, [])

  useEffect(() => {
    // console.log(oneAPVData);
  }, [oneAPVData])


  return (
    <FormContainer>
      <FormAction>
        <Stack direction='horizontal'>
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
                title: 'View APV',
              }
            ]} />
          </div>
        </Stack>
      </FormAction>

      {/* APV Form Content */}
      <APVForm oneAPVData={oneAPVData} editView={editView} apvID={apvID} />

    </FormContainer>
  );

};


export default ViewAPV;