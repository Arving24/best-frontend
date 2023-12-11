import {
  FormContainer,
  FormAction,
  FormContent,
  FormTitle,
  FormInfoFull,
} from "../../layout/container/FormContainer";
import style from "./PermissionForm.module.css";
import { useState, useContext, useEffect } from "react";
import { Form, useSubmit, useNavigate, useActionData } from "react-router-dom";
import { Input, Breadcrumb, Button, Modal, Switch } from "antd";
import LoadingContext from "../../../context/LoadingContext";

const PermissionDetails = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const { setIsLoading } = useContext(LoadingContext)
  const submit = useSubmit();
  const navigate = useNavigate();
  const response = useActionData();
  const error = useActionData()

  const status = data.is_active;

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

  //navigate to edit view
  const navigateToEdit = () => {
    navigate('edit')
  }

  //Confirm handler
  const onConfirm = () => {
    setOpenModal(true);
  };

  //Close Modal
  const hideModal = () => {
    setOpenModal(false);
  };

  //Form Submission
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    setIsLoading(true)

    const formData = {
      is_active: !status,
    };
    console.log("formData", formData)

    submit(formData, {method: "put"});
  };

  const content = "Are you sure you want to update the status?";
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
          <Button type="primary" onClick={onFormSubmit} key={"submit"}>
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
                title: "Permissions",
              },
              {
                title: "Create Permission",
              },
            ]}
          />
        </div>
      </FormAction>
      <FormContent>
        <FormTitle>
          <p>Permission Details</p>
        </FormTitle>
        <Form>
          <div className={style.switchContainer}>
            <label htmlFor="status">Status</label>
            <Switch
              className={style.switchDiv}
              name="isEnabled"
              checked={status}
              onClick={onConfirm}
            ></Switch>
          </div>
          <FormInfoFull>
            <div className={style.inputContainer}>
              <label htmlFor="permission_name">
                Permission Name<i>*</i>
              </label>
              <Input
                type="text"
                name="permission_name"
                value={data.permission_name}
                readOnly
                placeholder="Enter your first name"
              />
            </div>
          </FormInfoFull>
          <div className={style.buttonContainer}>
            <Button type="primary" onClick={navigateToEdit}>Edit</Button>
          </div>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default PermissionDetails;
