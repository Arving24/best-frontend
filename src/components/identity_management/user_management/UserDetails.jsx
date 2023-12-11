import {
  FormContainer,
  FormAction,
  FormContent,
  FormTitle,
  FormInfo,
} from "../../layout/container/FormContainer";
import { Breadcrumb, Input, Button, Switch, Modal } from "antd";
import style from "./UserForm.module.css";
import { useNavigate, useSubmit, Form, useActionData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import LoadingContext from "../../../context/LoadingContext";


const UserDetails = ({data}) => {
  
  const status = data.isEnabled;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const submit = useSubmit();
  const { setIsLoading } = useContext(LoadingContext)
  const response = useActionData();
  const error = useActionData();

  const updateStatusHandler = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setIsLoading(true)

    const formData = {
      isEnabled: !status,
    };
    // console.log("formData", formData)

    submit(formData, {method: "put"});
  };

  useEffect(() => {
    if(data !== '') {
      setIsLoading(false)
    }
  }, [data, setIsLoading])

  useEffect(() => {
    if(response || error){
      setIsLoading(false);
    }
  }, [response, error, setIsLoading])


  const editHandler = () => {
    navigate("edit");
  };

  //Confirm handler
  const onConfirm = () => {
    setOpenModal(true);
  };

  //Close Modal
  const hideModal = () => {
    setOpenModal(false);
  };

  const content = "Are you sure you want to update user status?";
  const title = "Update status";

  return (
    <FormContainer>
      <Modal
        open={openModal}
        title={title}
        onCancel={hideModal}
        footer={[
          <Button onClick={hideModal} key={"cancel"}>
            Cancel
          </Button>,
          <Button type="primary" onClick={updateStatusHandler}  key={"submit"}>
            Confirm
          </Button>,
        ]}
      >
        {content}
      </Modal>
      <FormAction>
        <div>
          <Breadcrumb
            separator=""
            items={[
              {
                title: "Location:",
              },
              {
                title: "Users",
              },
              {
                title: "Details",
              },
            ]}
          />
        </div>
      </FormAction>
      <FormContent>
        <FormTitle>
          <p>User Details</p>
        </FormTitle>
        <Form method="put">
        <div className={style.switchContainer}>
          <label htmlFor="status">Status</label>
          <Switch className={style.switchDiv} name="isEnabled" checked={status} onClick={onConfirm}></Switch>
        </div>
        <FormInfo>
          <div className={style.inputContainer}>
            <label htmlFor="firstname">
              First Name<i>*</i>
            </label>
            <Input
              type="text"
              name="firstname"
              value={data.firstname}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="middlename">
              Middle Name<i>*</i>
            </label>
            <Input
              type="text"
              name="middlename"
              value={data.middlename}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="lastname">
              Last Name<i>*</i>
            </label>
            <Input
              type="text"
              name="lastname"
              value={data.lastname}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="email">
              Work Email Address (*@barapido.com)<i>*</i>
            </label>
            <Input
              type="text"
              name="email"
              value={data.email}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="jobTitle">
              Job Title<i>*</i>
            </label>
            <Input
              type="text"
              name="jobTitle"
              value={data.jobTitle}
              readOnly
            />
          </div>
        </FormInfo>
        <FormInfo>
          <div className={style.inputContainer}>
            <label htmlFor="mobileNumber">
              Mobile Number<i>*</i>
            </label>
            <Input
              type="number"
              name="mobileNumber"
              addonBefore="+63"
              value={data.mobileNumber}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="secondaryEmail">
              Secondary Email<i>*</i>
            </label>
            <Input
              type="text"
              name="secondaryEmail"
              value={data.secondaryEmail}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="department">
              Department<i>*</i>
            </label>
            <Input
              type="text"
              name="department"
              value={data.department}
              readOnly
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="role">
              Role<i>*</i>
            </label>
            <Input
              type="text"
              name="department"
              value={data.role_name}
              readOnly
            />
          </div>
        </FormInfo>
        </Form>
        <div className={style.buttonContainer}>
          <Button type="primary" onClick={editHandler}>
            Edit
          </Button>
        </div>
      </FormContent>
    </FormContainer>
  );
};

export default UserDetails;
