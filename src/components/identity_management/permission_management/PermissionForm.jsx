import {
  FormContainer,
  FormAction,
  FormContent,
  FormTitle,
  FormInfoFull,
} from "../../layout/container/FormContainer";
import useInput from "../../../helpers/useInput";
import style from "./PermissionForm.module.css";
import { useState, useEffect, useContext } from "react";
import { Input, Breadcrumb, Button, Modal, notification, Switch } from "antd";
import { useSubmit, Form, useNavigate, useActionData } from "react-router-dom";
import LoadingContext from "../../../context/LoadingContext";

const PermissionForm = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const submit = useSubmit();
  const status = data ? data.permission_data.is_active : "";
  const formTitle = data ? "Update Permission" : " Create New Permission";
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext);

  const error = useActionData();
  const response = useActionData();

  const [errRes, setErrRes] = useState()

  useEffect(() => {
    console.log("ErrRes: ", errRes)
  }, [errRes])

  useEffect(() => {
      setErrRes(error)
  }, [error])

  useEffect(() => {
    if(errRes) {
      setErrRes()
    }
  }, [errRes, setIsLoading])

  const {
    value: permission_name,
    onBlurHandler,
    onChangeHandler,
    hasError,
    setIsTouched,
    reset,
  } = useInput(data ? data.permission_data.permission_name : "");

  //Confirm handler
  const onConfirm = () => {
    setOpenModal(true);
  };

  //Close Modal
  const hideModal = () => {
    setOpenModal(false);
  };

  //cancel
  const cancel = () => {
    navigate("..");
    setIsLoading(true);
  };

  //Form Submission
  const onFormSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    setIsTouched(true);
    setIsLoading(true);

    if (permission_name.trim() === "") {
      setIsLoading(false);
      notification.open({
        message: "Error",
        description: `Please provide the required details.`,
        duration: 3,
        type: "error",
        style: {
          backgroundColor: "#ffcccc",
        },
      });
      return console.log("Form has error");
    } else {
      const formData = {
        permission_name: permission_name,
      };

      console.log("Form Data:", formData);

        if (data) {
          submit(formData, { method: "put" });
        } else {
          submit(formData, { method: "post" });
        }
      

      // Simulating an asynchronous operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };


  useEffect(() => {
    if (data) {
       if (errRes) {
        setIsLoading(false)
        navigate('../edit')
       }
        // setErrRes()
    } else {
      if (response === 200) {
        reset()
        setIsLoading(false)
        navigate('../add_permission')
      } else if (error) {
        setIsLoading(false)
        navigate('../add_permission')
      }
    }

  }, [response, reset, data, navigate, setIsLoading, error, errRes]);

  const inputClasses = hasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const content = data
    ? "Are you sure you want to update?"
    : "Are you sure you want to create this data?";
  const title = data ? "Update Permission" : "Create Permission";

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
          <p>{formTitle}</p>
        </FormTitle>
        <Form>
          {data && (
            <div className={style.switchContainer}>
              <label htmlFor="is_active">Status</label>
              <Switch
                className={style.switchDiv}
                name="isEnabled"
                checked={status}
              ></Switch>
            </div>
          )}
          <FormInfoFull>
            <div className={inputClasses}>
              <label htmlFor="permission_name">
                Permission Name<i>*</i>
              </label>
              <Input
                type="text"
                name="permission_name"
                value={permission_name}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                placeholder="Enter your first name"
              />
              {hasError && <p>Please fill out this field!</p>}
            </div>
          </FormInfoFull>
          <div className={style.buttonContainer}>
            <Button type="primary" danger onClick={cancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={onConfirm}>
              Save
            </Button>
          </div>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default PermissionForm;
