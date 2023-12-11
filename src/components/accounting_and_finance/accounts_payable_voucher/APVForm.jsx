import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Col, Row, InputGroup, Stack, Modal } from 'react-bootstrap';
import { NumberToPhp, swalWithBootstrapButtons, Required, hasItems, TwoDecimalNum, amountToWords } from '../../../utils/functions';
import { FormContent, FormTitle, FormInfoFull } from "../../formLayout/FormContainer";
import { FINANCE_API_KEY, FINANCE_LINK, PROCUREMENT_API_KEY, PROCUREMENT_LINK } from '../../../utils/env_config';

// const MySwal = withReactContent(Swal);

const APVForm = ({ editView, oneAPVData, apvID }) => {

  var someDate = new Date();
  var dateNow = someDate.setDate(someDate.getDate());
  var dateToday = new Date(dateNow).toISOString().split("T")[0];

  const [submitAPV, setSubmitAPV] = useState({
    ap_type: '',
    payment_type: '',
    request_id: '',
    transaction_date: '',
    due_date: '',
    reference_number: '',
    chart_of_accounts_entry: '',
    vat_type: "12%",
    supplier_id: '',
    has_cash_voucher: '',
    amount_due: 0,
    vatable_sales: 0,
    total_sales_amount: 0,
    vat_exempt_sales: 0,
    less_vat: 0,
    vat_amount: 0,
    withholding_tax: 0,
    total_amount_due: 0,
    ewt_rate: 0,
    current_balance: 0,
  });

  const awtData = [
    {
      value: 0.01,
      label: '1% Purchases',
    },
    {
      value: 0.02,
      label: '2% Services',
    },
    {
      value: 0.05,
      label: '5% Rental / Prof. Fee / Comm',
    },
    {
      value: 0.1,
      label: '10% Prof. Fee / Comm',
    },
    {
      value: 0.15,
      label: '15% Prof. Fee',
    },
  ];

  const [editText, setEditText] = useState('Add new Accounts Payable Voucher (APV)');
  const [dropDownValue, setdropDownValue] = useState('Click Here to Select Account');
  const [showAccountList, setShowAccountList] = useState(false);
  const [showParAccountList, setShowParAccountList] = useState(false);
  const [accIndex, setAccIndex] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [allRFP, setAllRFP] = useState({});
  const [allRR, setAllRR] = useState({});
  const [oneRR, setOneRR] = useState({});
  const [oneRFP, setOneRFP] = useState({});
  const [rfpParticulars, setRFPParticulars] = useState([]);
  const [oneRRItems, setOneRRItems] = useState([]);
  const [oneSup, setOneSup] = useState({});
  const [allRRDelivered, setAllRRDelivered] = useState([]);
  const [structuredAccountData, setStructuredAccountData] = useState([]);
  const [dateTerms, setDateTerms] = useState(new Date());
  const [validated, setValidated] = useState(false);

  const [isRR, setisRR] = useState(true)
  const [isRRID, setIsRRID] = useState(true)
  const [contentHide, setContentHide] = useState(true)

  const onChangeDateAdd = (e) => {
    onChangeValue(e);
    try {
      if (submitAPV.payment_type === 'RR') {
        const dateAdd = new Date(e.target.value);
        const termsToInt = parseInt(oneSup.terms);
        dateAdd.setDate(dateAdd.getDate() + termsToInt);
        setDateTerms(new Date(dateAdd).toISOString().split("T")[0]);
      } else {
        setSubmitAPV({ ...submitAPV, due_date: dateTerms, transaction_date: e.target.value });
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeValue = (e) => {
    setSubmitAPV({ ...submitAPV, [e.target.name]: e.target.value });
  }

  async function fetchStructuredAccountData() {
    await fetch(`${FINANCE_LINK}/api/accounts_center/get_all_accounts_structured`, {
      method: 'GET',
      headers: {
        'x-api-key': FINANCE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setStructuredAccountData(data.all_accounts_data)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchRFPData() {
    await fetch(`${FINANCE_LINK}/api/rfp/get_all`, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': FINANCE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setAllRFP(data.all_rfp_data)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchRRData() {
    await fetch(`${PROCUREMENT_LINK}/api/receiving_receipt/get_all_rr`, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': PROCUREMENT_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setAllRR(data.rr_data)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchOneRFPData(rfpID) {
    await fetch(`${FINANCE_LINK}/api/rfp/get_rfp?rfp_id=` + rfpID, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': FINANCE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setOneRFP(data.rfp_data);
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchOneRRData(rrID) {
    await fetch(`${PROCUREMENT_LINK}/api/receiving_receipt/get_one_rr?rr_id=` + rrID, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': PROCUREMENT_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setOneRR(data.rr_data)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchOneAccData(accID) {
    await fetch(`${FINANCE_LINK}/api/accounts_center/get_account?account_id=` + accID, {
      method: 'GET',
      headers: {
        'x-api-key': FINANCE_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        var code = data.account_data.account_code;
        var name = data.account_data.account_name;
        var text = code + ' - ' + name;
        setdropDownValue(text)
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchOneSupData(supID) {
    await fetch(`${PROCUREMENT_LINK}/api/supplier_center/get_supplier?supplier_id=` + supID, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': PROCUREMENT_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        setOneSup(data.supplier_data);
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  async function fetchItemData(ItemID, order_quantity, total_amount, cost_center) {
    await fetch(`${PROCUREMENT_LINK}/api/item_center/get_item?item_id=${ItemID}`, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'x-api-key': PROCUREMENT_API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        const getItems = data.invoice_item_data;
        const dataArray = {
          item_id: getItems.item_id,
          item_name: getItems.item_name,
          sku_code: getItems.sku_code,
          uom: getItems.uom,
          qty_per_uom: getItems.qty_per_uom,
          price_per_uom: getItems.price_per_uom,
          cost_center: cost_center,
          order_quantity: order_quantity,
          total_amount: total_amount,
          accounts_code: '',
        }
        setOneRRItems(oneRRItems => [...oneRRItems, dataArray]);
        // return itemData
      })
      .catch(error => {
        console.log('Error in fetching Data!');
        console.log(error);
      });
  }

  const PaddingIcon = (e) => {
    if (e > 0) {
      return (<i className="bi bi-arrow-return-right">&nbsp;&nbsp;</i>)
    } else {
      return ''
    }
  }

  const AccountList = ({ accounts, level = 0 }) => {
    return (
      <div>
        {accounts.sort((val1, val2) => val1.account_code - val2.account_code).map((account) => (
          <ul key={account.account_id} style={{ cursor: 'pointer' }}>
            <li>
              <Stack direction='horizontal' gap={4} onClick={() => { onAccountsChange(account.account_name, account.account_id, account.account_code) }}>
                <span style={{ width: '55%', paddingLeft: level * 10 }}>{PaddingIcon(level)}<span className='fw-bolder'>{account.account_code}</span> - {account.account_name}</span>
                <span style={{ width: '20%' }}>{account.account_type}</span>
                <span style={{ width: '5%' }}>{account.currency}</span>
                <span style={{ width: '20%', textAlign: 'right' }}>{NumberToPhp(account.current_balance)}</span>
              </Stack>
            </li>
            {account.sub_accounts && (
              <AccountList accounts={account.sub_accounts} level={level + 1} />
            )}
          </ul>
        ))}
      </div>
    );
  };

  const ParAccountList = ({ accounts, level = 0 }) => {
    return (
      <div>
        {accounts.sort((val1, val2) => val1.account_code - val2.account_code).map((account) => (
          <ul key={account.account_id} style={{ cursor: 'pointer' }}>
            <li>
              <Stack direction='horizontal' gap={4} onClick={() => { onParAccountsChange(account.account_name, account.account_id, account.account_code) }}>
                <span style={{ width: '55%', paddingLeft: level * 10 }}>{PaddingIcon(level)}<span className='fw-bolder'>{account.account_code}</span> - {account.account_name}</span>
                <span style={{ width: '20%' }}>{account.account_type}</span>
                <span style={{ width: '5%' }}>{account.currency}</span>
                <span style={{ width: '20%', textAlign: 'right' }}>{NumberToPhp(account.current_balance)}</span>
              </Stack>
            </li>
            {account.sub_accounts && (
              <ParAccountList accounts={account.sub_accounts} level={level + 1} />
            )}
          </ul>
        ))}
      </div>
    );
  };

  const showParModal = (i) => {
    if (hasItems(structuredAccountData)) {
      setAccIndex(i);
      setShowParAccountList(true);
    } else {
      alert('No Data');
    }
  }

  const showModal = () => {
    if (hasItems(structuredAccountData)) {
      setShowAccountList(true);
    } else {
      alert('No Data');
    }
  }

  const onParAccountsChange = (account_name, account_id, account_code) => {
    // setOneRRItems();
    const name = 'accounts_code';
    const value = account_code;
    const list = [...oneRRItems];
    list[accIndex][name] = account_code + ' - ' + account_name;
    setOneRRItems(list);
    // document.getElementById(accIndex).value = account_code + ' - ' + account_name;
    // setSubmitAPV({ ...submitAPV, chart_of_accounts_entry: account_id });
    // setdropDownValue(account_code + ' - ' + account_name);
    // document.getElementById('chart_of_accounts_entry').value = account_code+' - '+account_name;
    setShowParAccountList(false);
  }

  const onAccountsChange = (account_name, account_id, account_code) => {
    setSubmitAPV({ ...submitAPV, chart_of_accounts_entry: account_id });
    setdropDownValue(account_code + ' - ' + account_name);
    // document.getElementById('chart_of_accounts_entry').value = account_code+' - '+account_name;
    setShowAccountList(false);
  }

  const addAPVPost = (e) => {

    const form = e.currentTarget;
    // console.log('submitAPV',submitAPV)
    e.preventDefault();
    if (form.checkValidity() === true) {
      swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to Submit?',
        text: "You won't be able to revert this!",
        footer: "Click anywhere outside the box to cancel",
        confirmButtonText: 'Submit',
        // cancelButtonText: 'Cancel',
        timer: 5000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: true,
        showCloseButton: false
      }).then((res) => {
        console.log(rfp)
        if (res.isConfirmed) {
          MySwal.fire({
            title: <p>Creating APV</p>,
            allowOutsideClick: false,
            didOpen: () => {
              MySwal.showLoading()
            },
          })
          axios({
            url: `${FINANCE_LINK}/api/apv/add_new_apv`,
            data: submitAPV,
            method: 'POST',
            headers: {
              'x-api-key': FINANCE_API_KEY,
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
          }).then((res) => {
            // ReactDOM.findDOMNode(this.addInvoiceForm).reset();
            if (submitAPV.payment_type === 'RR') {
              console.log(res.data)
              axios({
                url: `${PROCUREMENT_LINK}/api/receiving_receipt/set_has_apv`,
                params: { rr_id: submitAPV.request_id },
                method: 'PUT',
                headers: {
                  'x-api-key': FINANCE_API_KEY,
                },
              }).then(async (res) => {
                // ReactDOM.findDOMNode(this.addInvoiceForm).reset();
                console.log(res.data)
                await MySwal.fire({
                  title: <strong>APV successfully created</strong>,
                  icon: 'success'
                });
                window.location.reload();
              })
                .catch(async (err) => {
                  console.log(err)
                  await MySwal.fire({
                    title: <strong>{err.response.data.message}</strong>,
                    // html: <i>You clicked the button!</i>,
                    icon: 'error'
                  });
                  MySwal.close();
                });
            } else {
              MySwal.fire({
                title: <strong>APV successfully created</strong>,
                icon: 'success'
              });
              window.location.reload();
            }
          })
            .catch(async (err) => {
              console.log(err)
              await MySwal.fire({
                title: <strong>{err.response.data.message}</strong>,
                // html: <i>You clicked the button!</i>,
                icon: 'error'
              });
              MySwal.close();
            });
        }
      })
      // this.onCancel() 
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();


    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      MySwal.fire({
        title: 'Please Fill out Required Fields',
        icon: 'warning',
        cancelButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: true,
        showConfirmButton: false,
        showCloseButton: false
      })
    }

    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      addAPVPost(event);
    } else {

      setValidated(true);
      addAPVPost(event);

    }

  };

  const updateAPVPost = (e) => {

    const form = e.currentTarget;
    // console.log('submitAPV',submitAPV)
    e.preventDefault();
    if (form.checkValidity() === true) {
      swalWithBootstrapButtons.fire({
        title: 'Are you sure you want to Update?',
        text: "You won't be able to revert this!",
        footer: "Click anywhere outside the box to cancel",
        confirmButtonText: 'Update',
        // cancelButtonText: 'Cancel',
        timer: 5000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: true,
        showCloseButton: false
      }).then((res) => {
        // console.log(rfp)
        if (res.isConfirmed) {
          MySwal.fire({
            title: <p>Updating APV</p>,
            didOpen: () => {
              MySwal.showLoading()
            },
          })
          axios({
            url: `${FINANCE_LINK}/api/apv/update_apv`,
            data: submitAPV,
            method: 'PUT',
            headers: {
              'x-api-key': FINANCE_API_KEY,
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
          }).then((res) => {
            // ReactDOM.findDOMNode(this.addInvoiceForm).reset();
            console.log(res.data)
            axios({
              url: `${PROCUREMENT_LINK}/api/receiving_receipt/set_has_apv`,
              params: { rr_id: submitAPV.request_id },
              method: 'PUT',
              headers: {
                'x-api-key': FINANCE_API_KEY,
              },
            }).then(async (res) => {
              // ReactDOM.findDOMNode(this.addInvoiceForm).reset();
              console.log(res.data)
              await MySwal.fire({
                title: <strong>APV successfully updated</strong>,
                icon: 'success'
              });
              window.location.reload();
            })
              .catch(async (err) => {
                console.log(err)
                await MySwal.fire({
                  title: <strong>{err.response.data.message}</strong>,
                  // html: <i>You clicked the button!</i>,
                  icon: 'error'
                });
                MySwal.close();
              });
          })
            .catch(async (err) => {
              console.log(err)
              await MySwal.fire({
                title: <strong>{err.response.data.message}</strong>,
                // html: <i>You clicked the button!</i>,
                icon: 'error'
              });
              MySwal.close();
            });
        }
      })
      // this.onCancel() 
    }
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      MySwal.fire({
        title: 'Please Fill out Required Fields',
        icon: 'warning',
        cancelButtonText: 'OK',
        timer: 2000,
        timerProgressBar: true,
        showCancelButton: true,
        showConfirmButton: false,
        showCloseButton: false
      })
    }

    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      updateAPVPost(event);
    } else {

      setValidated(true);
      updateAPVPost(event);

    }

  };

  const onChangePaymentType = (e) => {
    // onChangeValue(e);
    // setSubmitAPV({...submitAPV, payment_type: e.target.value});
    if (e.target.value === 'RFP') {
      setisRR(false);
      setIsRRID(true);
      setContentHide(true);
      handleCalculate();
    } else if (e.target.value === 'RR') {
      setisRR(true);
      setIsRRID(false);
      setContentHide(true);
      handleCalculate();
    } else {
      setisRR(true);
      setIsRRID(true);
      setContentHide(true);
      handleCalculate();
    }
  }

  const onChangeRRSelect = (e) => {
    setSubmitAPV({ ...submitAPV, [e.target.name]: e.target.value })
    handleCalculate();
    // fetchOneSupData(e.target.name);
    if (e.target.value === '') {
      setContentHide(true)
    } else {
      try {
        allRR.forEach((elem) => {
          // console.log('elem.rr_id',elem.rr_id)
          if (elem.rr_id === e.target.value) {
            fetchOneSupData(elem.supplier_id);
          }
        });
      } catch (err) { console.log(err) }
      fetchOneRRData(e.target.value);
      setContentHide(false)
    }
  }

  const onChangeRFPSelect = (e) => {
    // setSubmitAPV({ ...submitAPV, request_id: e.target.value });
    handleCalculate();
    if (e.target.value === '') {
      setContentHide(true)
    } else {
      fetchOneRFPData(e.target.value);
      setContentHide(false)
    }
  }

  const onClickEdit = _ => {
    setEditMode(true);
    setEditText('Edit Accounts Payable Voucher (APV)');
  }

  const handleClickRefresh = () => {
    swalWithBootstrapButtons.fire({
      title: 'All updates will not be saved, continue?',
      text: "You won't be able to revert this!",
      footer: "Click anywhere outside the box to cancel",
      confirmButtonText: 'Continue',
      timer: 5000,
      timerProgressBar: true,
      showCancelButton: false,
      showConfirmButton: true,
      showCloseButton: false
    }).then((res) => {
      if (res.isConfirmed) {
        window.location.reload();
      }
    })
  };

  function handleCalculate() {
    var vatable_sales = 0;
    var vat_exempt_sales = 0;
    var less_vat = 0;
    var vat_amount = 0;
    var withholding_tax = 0;
    var total_amount_due = 0;
    var ewt = 0;

    if (submitAPV.ewt_rate === '') {
      ewt = 0;
    } else {
      ewt = submitAPV.ewt_rate;
    }

    if (submitAPV.vat_type === '12%') {
      vatable_sales = submitAPV.total_sales_amount;
      vat_exempt_sales = 0;
      less_vat = submitAPV.total_sales_amount / 1.12;
      vat_amount = vatable_sales - less_vat;
      withholding_tax = less_vat * ewt;
      total_amount_due = vatable_sales - withholding_tax;
    } else {
      vatable_sales = 0;
      vat_exempt_sales = submitAPV.total_sales_amount;
      vat_amount = 0;
      less_vat = vat_exempt_sales;
      withholding_tax = less_vat * ewt;
      total_amount_due = less_vat - withholding_tax;
    }

    if (editMode) {
      setSubmitAPV({
        ...submitAPV,
        vatable_sales: TwoDecimalNum(vatable_sales),
        vat_exempt_sales: TwoDecimalNum(vat_exempt_sales),
        less_vat: TwoDecimalNum(less_vat),
        vat_amount: TwoDecimalNum(vat_amount),
        withholding_tax: TwoDecimalNum(withholding_tax),
        total_amount_due: TwoDecimalNum(total_amount_due),
      });
    } else {
      setSubmitAPV({
        ...submitAPV,
        vatable_sales: TwoDecimalNum(vatable_sales),
        vat_exempt_sales: TwoDecimalNum(vat_exempt_sales),
        less_vat: TwoDecimalNum(less_vat),
        vat_amount: TwoDecimalNum(vat_amount),
        withholding_tax: TwoDecimalNum(withholding_tax),
        total_amount_due: TwoDecimalNum(total_amount_due),
        current_balance: TwoDecimalNum(total_amount_due),
      });
    }
  }

  useEffect(() => {
    fetchRFPData();
    fetchRRData();
    fetchStructuredAccountData();
  }, []);

  useEffect(() => {
    // console.log('structuredAccountData',structuredAccountData);
  }, [structuredAccountData]);

  useEffect(() => {
    // console.log('allRFP', allRFP)
  }, [allRFP]);

  useEffect(() => {
    if (hasItems(oneAPVData)) {
      // console.log('oneAPVData', oneAPVData)
      fetchOneAccData(oneAPVData.chart_of_accounts_entry);
      setSubmitAPV(oneAPVData);
      setContentHide(false);
      setDateTerms(oneAPVData.due_date);
      if (oneAPVData.payment_type === 'RFP' || oneAPVData.payment_type === 'Payment First') {
        fetchOneRFPData(oneAPVData.request_id);
        setisRR(false)
        setIsRRID(true)
      } else if (oneAPVData.payment_type === 'RR' || oneAPVData.payment_type === 'Not Payment First') {
        fetchOneSupData(oneAPVData.supplier_id);
        fetchOneRRData(oneAPVData.request_id);
        setisRR(true)
        setIsRRID(false)
      }
    }
  }, [oneAPVData]);

  useEffect(() => {
    if (editView) {
      setEditText('View Accounts Payable Voucher (APV)');
    }
  }, [editView]);

  useEffect(() => {
    setSubmitAPV({ ...submitAPV, due_date: dateTerms });
  }, [dateTerms]);

  useEffect(() => {
    // console.log('oneSup', oneSup)
    try {
      if (hasItems(oneSup)) {
        if (oneSup.supplier_id) {
          document.getElementById("supplier_name").value = oneSup.supplier_name;
          // document.getElementById("address").value = oneSup.address;
          document.getElementById("terms").value = oneSup.terms;
          setSubmitAPV({ ...submitAPV, supplier_id: oneSup.supplier_id });
          if (hasItems(oneRFP)) {
            document.getElementById("address").value = oneSup.address;
          }
        }
      }
    } catch (err) { }
  }, [oneSup]);

  useEffect(() => {
    if (hasItems(oneRR)) {
      // console.log('oneRR', oneRR);
      document.getElementById("memo").value = oneRR.rr_info.notes;
      var grand_total = oneRR.rr_info.grand_total;
      setOneRRItems([]);
      oneRR.rr_items_info.forEach(async (e) => {
        await fetchItemData(e.item_id, e.order_quantity, e.total_amount, e.cost_center);
      });

      setSubmitAPV({
        ...submitAPV,
        request_id: oneRR.rr_info.rr_id,
        amount_due: grand_total,
        total_sales_amount: grand_total,
        vatable_sales: grand_total,
      });
      // handleCalculate();
      // console.log('grand_total', grand_total);
    }
  }, [oneRR]);

  useEffect(() => {
    // console.log('oneRFP', oneRFP)
    try {
      if (hasItems(oneRFP)) {
        setRFPParticulars([]);
        var dateNeed = new Date(oneRFP.date_needed).toISOString().split('T')[0];
        var supID = '';
        if (oneRFP.po_id) {
          // document.getElementById("supplier_name").value = oneRFP.payee;
          fetchOneSupData(oneRFP.payee)
          supID = oneRFP.payee;
        } else {
          document.getElementById("supplier_name").value = 'N/A';
          document.getElementById("address").value = 'N/A';
          document.getElementById("terms").value = 'N/A';
        }
        document.getElementById("memo").value = 'N/A';
        setDateTerms(dateNeed);
        var grand_total = oneRFP.particulars_total_amount;
        var parrArray = JSON.parse(oneRFP.particulars);
        // console.log(parrArray);
        parrArray.forEach(element => {
          var arrayList = {
            particulars_date: element.particulars_date,
            particulars_activity: element.particulars_activity,
            particulars_description: element.particulars_description,
            particulars_amount: element.particulars_amount,
            accounts_code: '',
          }
          setRFPParticulars(rfpParticulars => [...rfpParticulars, arrayList]);
        });
        setSubmitAPV({
          ...submitAPV,
          amount_due: grand_total,
          total_sales_amount: grand_total,
          vatable_sales: grand_total,
          supplier_id: supID,
        });
        // handleCalculate();
      }
    } catch (err) { }
  }, [oneRFP]);

  useEffect(() => {
    handleCalculate();
  }, [submitAPV.vat_type, submitAPV.ewt_rate])

  useEffect(() => {
    handleCalculate();
  }, [submitAPV.vatable_sales])

  useEffect(() => {
    // if (hasItems(rfpParticulars)) {
    console.log('rfpParticulars', rfpParticulars);
    // }
  }, [rfpParticulars])

  useEffect(() => {
    //   console.log('dropDownValue',dropDownValue);
  }, [dropDownValue])

  useEffect(() => {
    //   console.log('oneRRItems',oneRRItems);
  }, [oneRRItems])

  useEffect(() => {
    //   console.log('allRRDelivered',allRRDelivered);
  }, [allRRDelivered])

  useEffect(() => {
    if (hasItems(allRR)) {
      // console.log('allRR', allRR)
      allRR.forEach((e) => {
        if (e.delivery_status === true && e.has_apv !== true) {
          setAllRRDelivered(allRRDelivered => [...allRRDelivered, e])
          // allRRDelivered.push(e)
        }
      });
    }

  }, [allRR]);

  useEffect(() => {
    // console.log('dateTerms', dateTerms);
  }, [dateTerms])

  useEffect(() => {
    // console.log('submitAPV', submitAPV);
  }, [submitAPV])

  useEffect(() => {
    // console.log('accIndex', accIndex);
  }, [accIndex])

  return (
    <FormContent>
      <Modal show={showAccountList} scrollable={true} onHide={() => { setShowAccountList(false) }} size="xl" >
        <Modal.Body>
          <Stack>
            <div className="mb-3">
              <AccountList accounts={structuredAccountData} />
            </div>
          </Stack>
        </Modal.Body>
      </Modal>
      <Modal show={showParAccountList} scrollable={true} onHide={() => { setShowParAccountList(false) }} size="xl" >
        <Modal.Body>
          <Stack>
            <div className="mb-3">
              <ParAccountList accounts={structuredAccountData} />
            </div>
          </Stack>
        </Modal.Body>
      </Modal>
      <FormTitle><p className='text-uppercase'>{editText}</p></FormTitle>
      <Form noValidate id="APVFormPOST" validated={validated} onSubmit={editView ? handleUpdate : handleSubmit}>
        <FormInfoFull>
          <Stack>
            {
              editView && (
                <div className='mb-3'>
                  <span style={{ fontWeight: 'bold' }}>APV ID: {apvID}</span>
                </div>
              )
            }
            <div className='mb-3'>
              <InputGroup size='sm'>
                {
                  editView ? (
                    <>
                      <Form.Check inline label="AP trade" value={'AP trade'} name="ap_type" type='radio' id="ap_type" checked={submitAPV.ap_type === 'AP trade'} onChange={onChangeValue} disabled={!editMode} />
                      <Form.Check inline label="AP non-trade" value={'AP non-trade'} name="ap_type" type='radio' id="ap_type" checked={submitAPV.ap_type === 'AP non-trade'} onChange={onChangeValue} disabled={!editMode} />
                    </>
                  ) : (
                    <>
                      <Form.Check inline label="AP trade" value={'AP trade'} name="ap_type" type='radio' id="ap_type" onChange={onChangeValue} required />
                      <Form.Check inline label="AP non-trade" value={'AP non-trade'} name="ap_type" type='radio' id="ap_type" onChange={onChangeValue} required />
                    </>
                  )
                }
                <Form.Control.Feedback tooltip type="invalid">
                  Please choose one
                </Form.Control.Feedback>
              </InputGroup>
            </div>
            {
              editView ? (
                <div className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Label size='sm' className='fw-bolder'>Payment Type</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" defaultValue={submitAPV.payment_type} name="payment_type" id="payment_type" readOnly disabled />
                      </InputGroup>
                    </Col>
                    <Col>
                      {
                        submitAPV.payment_type === 'RFP' ? (
                          <>
                            <Form.Label size='sm' className='fw-bolder'>RFP Number</Form.Label>
                            <InputGroup size='sm'>
                              <a target='_blank' href={'/rfp/view_rfp/' + submitAPV.request_id}>{submitAPV.request_id}</a>
                            </InputGroup>
                          </>
                        ) : (
                          <>
                            <Form.Label size='sm' className='fw-bolder'>RR ID Number</Form.Label>
                            <InputGroup size='sm'>
                              <a target='_blank' href={'/receiving_receipt/view_rr/' + submitAPV.request_id}>{submitAPV.request_id}</a>
                            </InputGroup>
                          </>
                        )
                      }
                    </Col>
                  </Row>
                </div>
              ) : (
                <div className='mb-3'>
                  <Row>
                    <Col className=''>
                      <Form.Label size='sm' className='fw-bolder'>Payment Type<Required /></Form.Label>
                      <InputGroup size='sm' hasValidation>
                        <Form.Select name="payment_type" id="payment_type" aria-label="payment_type" onChange={(e) => { onChangePaymentType(e); onChangeValue(e); }} required>
                          <option value="">Select Payment Type</option>
                          <option name="payment_type" value="RR">RR</option>
                          <option name="payment_type" value="RFP">RFP</option>
                        </Form.Select>
                        <Form.Control.Feedback tooltip type="invalid">
                          Please choose one
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    {
                      !isRR && (
                        <Col>
                          <Form.Label size='sm' className='fw-bolder'>Choose RFP</Form.Label>
                          <InputGroup size='sm' hasValidation>
                            <Form.Select name="request_id" aria-label="request_id" onChange={(e) => { onChangeRFPSelect(e); onChangeValue(e) }} required>
                              <option value="">Choose RFP</option>
                              {
                                allRFP.sort((a, b) => {
                                  const nameA = a.rfp_id;
                                  const nameB = b.rfp_id;
                                  if (nameA < nameB) {
                                    return 1;
                                  }
                                  if (nameA > nameB) {
                                    return -1;
                                  }

                                  // names must be equal
                                  return 0;
                                }).map((e, i) => (
                                  e.is_approved && <option key={i} value={e.rfp_id}>{e.rfp_id} - {e.payee}</option>
                                ))
                              }
                            </Form.Select>
                            <Form.Control.Feedback tooltip type="invalid">
                              Please choose one
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      )
                    }
                    {
                      !isRRID && (
                        <Col>
                          <Form.Label size='sm' className='fw-bolder'>Choose RR ID Number</Form.Label>
                          <InputGroup size='sm' hasValidation>
                            <Form.Select name="request_id" aria-label="request_id" id="request_id" onChange={(e) => { onChangeRRSelect(e); onChangeValue(e) }} required>
                              <option value="">Choose RR ID Number</option>
                              {
                                allRRDelivered.sort((a, b) => {
                                  const nameA = a.rr_id;
                                  const nameB = b.rr_id;
                                  if (nameA < nameB) {
                                    return 1;
                                  }
                                  if (nameA > nameB) {
                                    return -1;
                                  }

                                  // names must be equal
                                  return 0;
                                }).map((e, i) => (
                                  <option key={i} value={e.rr_id}>{e.rr_id} - {e.supplier_name}</option>
                                ))
                              }
                            </Form.Select>
                            <Form.Control.Feedback tooltip type="invalid">
                              Please choose one
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>
                      )
                    }
                  </Row>
                </div>
              )
            }
          </Stack>
          {
            !contentHide ? (
              <Stack gap={7}>
                <div>
                  <Row>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Supplier Name</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" name="supplier_name" id="supplier_name" readOnly disabled />
                      </InputGroup>
                    </Col>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Address</Form.Label>
                      {
                        !isRRID && (
                          <p className='text-break'>{oneSup.address}</p>
                        )
                      }
                      {
                        !isRR && (
                          <InputGroup size='sm'>
                            <Form.Control plaintext type="text" name="address" id="address" readOnly disabled />
                          </InputGroup>
                        )
                      }
                    </Col>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Terms</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" name="terms" id="terms" readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Prepared date</Form.Label>
                      <Form.Control plaintext type="date" value={dateToday} name="prepared_date" readOnly disabled />
                    </Col>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Transaction date<Required /></Form.Label>
                      <InputGroup size='sm' hasValidation>
                        {
                          editView ? (
                            <Form.Control type="date" plaintext={!editMode} defaultValue={submitAPV.transaction_date} name="transaction_date" id="transaction_date" onChange={onChangeDateAdd} required disabled={!editMode} />
                          ) : (
                            <Form.Control type="date" defaultValue={submitAPV.transaction_date} name="transaction_date" id="transaction_date" onChange={onChangeDateAdd} required />
                          )
                        }
                        <Form.Control.Feedback tooltip type="invalid">
                          Please fill up Date.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col className="mb-3">
                      <Form.Label size='sm' className='fw-bolder'>Due date</Form.Label>
                      <InputGroup size='sm' hasValidation>
                        <Form.Control plaintext type="date" value={dateTerms} name="due_date" id="due_date" readOnly disabled />
                        <Form.Control.Feedback tooltip type="invalid">
                          Please fill up Date.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3 col-md-4'>
                      <Form.Label size='sm' className='fw-bolder'>Reference No.<Required /></Form.Label>
                      <InputGroup size='sm'>
                        {
                          editView ? (
                            <Form.Control type="text" plaintext={!editMode} defaultValue={submitAPV.reference_number} name="reference_number" id="reference_number" onChange={onChangeValue} required disabled={!editMode} />
                          ) : (
                            <Form.Control type="text" placeholder="Reference No. here" defaultValue={submitAPV.reference_number} name="reference_number" id="reference_number" onChange={onChangeValue} required />
                          )
                        }
                        <Form.Control.Feedback tooltip type="invalid">
                          Please fill up Reference No.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Memo</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" name="memo" id="memo" readOnly disabled />
                      </InputGroup>
                    </Col>
                    {
                      editView && (
                        <Col className='mb-3 cal-md-4'>
                          <Form.Label size='sm' className='fw-bolder'>Current Balance</Form.Label>
                          <InputGroup size='sm'>
                            <Form.Control plaintext type="text" value={NumberToPhp(oneAPVData.current_balance)} name="current_balance" id="current_balance" readOnly disabled />
                          </InputGroup>
                        </Col>
                      )
                    }
                  </Row>
                </div>
                {
                  !isRRID && (
                    <>
                      <div>
                        <Row>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Particulars</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Particulars Amount</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Cost Center</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Vat</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>EWT</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Accounts</p>
                          </Col>
                        </Row>
                      </div>
                      {
                        oneRRItems.map((e, i) => (
                          <div key={i}>
                            <Row>
                              <Col className='col-md-2'>
                                <p className='text-break'>{e.item_name + ': QTY/UOM - ' + e.qty_per_uom}</p>
                              </Col>
                              <Col className='col-md-2'>
                                <p className='text-break'>{NumberToPhp(e.total_amount)}</p>
                              </Col>
                              <Col className='col-md-2'>
                                <p className='text-break'>{e.cost_center}</p>
                              </Col>
                              <Col className='col-md-2'>
                                <Form.Select name="ewt_rate" id="ewt_rate" required>
                                  <option value=''>Select Vat</option>
                                  <option value=''>12%</option>
                                  <option value=''>Vat Exempt</option>
                                </Form.Select>
                              </Col>
                              <Col className='col-md-2'>
                                <Form.Select name="ewt_rate" id="ewt_rate" required>
                                  <option value=''>Select EWT</option>
                                  {
                                    awtData.map((e, i) => (
                                      <option key={i} value={e.value}>{e.label}</option>
                                    ))
                                  }
                                </Form.Select>
                              </Col>
                              <Col className='col-md-2'>
                                <Form.Control type="text" value={e.accounts_code} name={i + '_accounts'} id={i + '_accounts'} onClick={() => { showParModal(i) }} required readOnly />
                              </Col>
                            </Row>
                          </div>
                        ))
                      }
                    </>
                  )
                }
                {
                  !isRR && (
                    <>
                      <div>
                        <Row>
                          <h6 className="mb-3">Particulars</h6>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Date</p>
                          </Col>
                          <Col className='col-md-4'>
                            <p className='fw-bolder'>Activity</p>
                          </Col>
                          <Col className='mcol-md-4'>
                            <p className='fw-bolder'>Description</p>
                          </Col>
                          <Col className='col-md-2'>
                            <p className='fw-bolder'>Amount</p>
                          </Col>
                        </Row>
                      </div>
                      {
                        hasItems(rfpParticulars) && (
                          rfpParticulars.map((e, i) => (
                            <div key={i}>
                              <Row>
                                <Col className='mb-3 col-md-2'>
                                  <p className='text-break'>{new Date(e.particulars_date).toLocaleDateString('en-US', { year: "numeric", month: "short", day: "numeric" })}</p>
                                </Col>
                                <Col className='mb-3 col-md-4'>
                                  <p className='text-break'>{e.particulars_activity}</p>
                                </Col>
                                <Col className='mb-3 col-md-4'>
                                  <p className='text-break'>{e.particulars_description}</p>
                                </Col>
                                <Col className='mb-3 col-md-2'>
                                  <p className='text-break'>{NumberToPhp(e.particulars_amount)}</p>
                                </Col>
                                <Col className='col-md-2'>
                                  <Form.Select name="ewt_rate" id="ewt_rate" required>
                                    <option value=''>Select Vat</option>
                                    <option value=''>12%</option>
                                    <option value=''>Vat Exempt</option>
                                  </Form.Select>
                                </Col>
                                <Col className='col-md-2'>
                                  <Form.Select name="ewt_rate" id="ewt_rate" required>
                                    <option value=''>Select EWT</option>
                                    {
                                      awtData.map((e, i) => (
                                        <option key={i} value={e.value}>{e.label}</option>
                                      ))
                                    }
                                  </Form.Select>
                                </Col>
                                <Col className='col-md-2'>
                                  <Form.Control type="text" value={e.accounts_code} name={i + '_accounts'} id={i + '_accounts'} onClick={() => { showParModal(i) }} required readOnly />
                                </Col>
                              </Row>
                            </div>
                          ))
                        )
                      }
                    </>
                  )
                }
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Total Sales Amount</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.total_sales_amount)} name="total_sales_amount" id="total_sales_amount" readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>VAT type - VAT inc<Required /></Form.Label>
                      <InputGroup size='sm' hasValidation>
                        {
                          editView ? (
                            <>
                              <Form.Control plaintext type="text" value={submitAPV.vat_type} name="vat_type" id="vat_type" readOnly disabled />
                            </>
                          ) : (
                            <>
                              <Form.Check inline label="12%" value={'12%'} name="vat_type" type='radio' id="vat_type" onChange={onChangeValue} defaultChecked required />
                              <Form.Check inline label="Vat Exempt" value={'Vat Exempt'} name="vat_type" type='radio' id="vat_type" onChange={onChangeValue} required />
                            </>
                          )
                        }
                        <Form.Control.Feedback tooltip type="invalid">
                          Please choose one
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>EWT<Required /></Form.Label>
                      <InputGroup size='sm' hasValidation>
                        {
                          editView ? (

                            <Form.Select name="ewt_rate" value={submitAPV.ewt_rate} aria-label="ewt_rate" id="ewt_rate" onChange={onChangeValue} required disabled={!editMode}>
                              <option value=''>Select EWT</option>
                              {
                                awtData.map((e, i) => (
                                  <option key={i} value={e.value}>{e.label}</option>
                                ))
                              }
                            </Form.Select>

                          ) : (
                            <Form.Select name="ewt_rate" aria-label="ewt_rate" id="ewt_rate" onChange={onChangeValue} required>
                              <option value=''>Select EWT</option>
                              {
                                awtData.map((e, i) => (
                                  <option key={i} value={e.value}>{e.label}</option>
                                ))
                              }
                            </Form.Select>
                          )
                        }
                        <Form.Control.Feedback tooltip type="invalid">
                          Please choose one
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Vatable Sales</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.vatable_sales)} readOnly disabled />
                      </InputGroup>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Vat Exempt Sales</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.vat_exempt_sales)} readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Less Vat</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.less_vat)} readOnly disabled />
                      </InputGroup>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Vat Amount</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.vat_amount)} readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Withholding Tax</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.withholding_tax)} readOnly disabled />
                      </InputGroup>
                    </Col>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Total Amount Due</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control plaintext type="text" value={NumberToPhp(submitAPV.total_amount_due)} readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Total Amount due in words</Form.Label>
                      <InputGroup size='sm'>
                        <Form.Control className='text-capitalize' plaintext type="text" value={amountToWords(TwoDecimalNum(submitAPV.total_amount_due))} name="amount_due_in_words" id="amount_due_in_words" readOnly disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Col className='mb-3'>
                      <Form.Label size='sm' className='fw-bolder'>Chart of Accounts Entry<Required /></Form.Label>
                      <InputGroup size='sm'>
                        {
                          editView ? (
                            // <a className='btn btn-sm btn-outline-secondary' onClick={showModal} disabled={!editMode}>{dropDownValue} </a>
                            <Form.Control type="text" value={dropDownValue} name="chart_of_accounts_entry" id="chart_of_accounts_entry" onClick={showModal} required readOnly disabled={!editMode} />
                          ) : (
                            // <a className='btn btn-sm btn-outline-secondary' onClick={showModal} >{dropDownValue} </a>
                            <Form.Control type="text" value={dropDownValue} name="chart_of_accounts_entry" id="chart_of_accounts_entry" onClick={showModal} required readOnly />
                          )
                        }
                        <Form.Control.Feedback tooltip type="invalid">
                          Please fill up Accounts Entry.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </Stack>
            ) : ""
          }
          {
            !contentHide ? (
              editView ? (
                !editMode ? (
                  !submitAPV.is_partially_paid && (
                    <Stack direction='horizontal'>
                      <div>
                        <a className='btn btn-primary btn-sm' onClick={onClickEdit}>Edit</a>
                      </div>
                    </Stack>
                  )
                ) : (
                  <Stack direction='horizontal' gap={2}>
                    <div>
                      <a className='btn btn-primary btn-sm' onClick={handleClickRefresh}>Cancel</a>
                    </div>
                    <div className='ms-auto'>
                      <button type='submit' className='btn btn-primary btn-sm' form='APVFormPOST'>Submit</button>
                    </div>
                  </Stack>
                )
              ) : (
                <Stack direction='horizontal'>
                  <div className='ms-auto'>
                    <button type='submit' className='btn btn-primary btn-sm' form='APVFormPOST'>Submit</button>
                  </div>
                </Stack>
              )
            ) : ""
          }
        </FormInfoFull>
      </Form>
    </FormContent>
  );

};


export default APVForm;