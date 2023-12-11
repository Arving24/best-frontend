import { Form, useSubmit, useActionData, useNavigate } from "react-router-dom";
import {
  FormAction,
  FormContainer,
  FormContent,
  FormInfo,
  FormTitle,
} from "../../layout/container/FormContainer";
import { useEffect, useState, useContext } from "react";
import { Input, Breadcrumb, Select, Button, Modal, notification } from "antd";
import useInput from "../../../helpers/useInput";
import useEmailValidation from "../../../helpers/useEmailValidate";
import useMobileValidate from "../../../helpers/useMobileValidate";
import useSelectValidation from "../../../helpers/useSelectValidation";
import style from "./UserForm.module.css";
import { AUTH_LINK, AUTH_API_KEY } from "../../../utils/env_config";
import axios from "axios";
import useBarapidoEmail from "../../../helpers/useBarapidoEmail";
import LoadingContext from "../../../context/LoadingContext";

const UserForm = ({ data }) => {
  const [roleData, setRoleData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [middlename, setMiddlename] = useState(data ? data.middlename : "");
  const { setIsLoading } = useContext(LoadingContext);
  const error = useActionData();
  const response = useActionData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const resetMiddlename = () => {
    setMiddlename("");
  };

  const middleNameOnChangeHandler = (e) => {
    const updatedValue = e.target.value
    setMiddlename(updatedValue)

  }

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

  const getAllRole = () => {
    axios({
      url: `${AUTH_LINK}/api/roles/get_all_roles`,
      method: "GET",
      headers: {
        "x-api-key": AUTH_API_KEY,
      },
    })
      .then((response) => {
        setRoleData(response.data["all_roles_data"]);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error in Fetching All Items!");
      });
  };

  useEffect(() => {
    getAllRole();
  }, []);

  const {
    value: firstname,
    hasError: firstnameHasError,
    onChangeHandler: firstnameChangeHandler,
    onBlurHandler: firstnameBlurHandler,
    setIsTouched: setFirstnameIsTouched,
    reset: resetFirstname,
  } = useInput(data ? data.firstname : "");

  const {
    value: lastname,
    hasError: lastnameHasError,
    onChangeHandler: lastnameChangeHandler,
    onBlurHandler: lastnameBlurHandler,
    setIsTouched: setLastnameIsTouched,
    reset: resetLastname,
  } = useInput(data ? data.lastname : "");

  const {
    email,
    handleChange: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    setIsTouched: setEmailIsTouched,
    reset: resetEmail,
  } = useBarapidoEmail(data ? data.email : "");

  const {
    value: jobTitle,
    hasError: jobHasError,
    onChangeHandler: jobChangeHandler,
    onBlurHandler: jobBlurHandler,
    setIsTouched: setJobIsTouched,
    reset: resetJob,
  } = useInput(data ? data.jobTitle : "");

  const {
    mobileNumber,
    handleChange: mobileChangeHandler,
    onBlurHandler: mobileBlurHandler,
    setIsTouched: setMobileIsTouched,
    hasError: mobileHasError,
    reset: resetMobile,
  } = useMobileValidate(data ? data.mobileNumber : "");

  const {
    email: secondaryEmail,
    handleChange: secondaryEmailChangeHandler,
    onBlurHandler: secondaryEmailBlurHandler,
    hasError: secondaryEmailHasError,
    setIsTouched: setSecondaryEmailIsTouched,
    reset: resetSecondaryEmail,
  } = useEmailValidation(data ? data.secondaryEmail : "");

  const {
    value: department,
    hasError: deptHasError,
    onChangeHandler: deptChangeHandler,
    onBlurHandler: deptBlurHandler,
    setIsTouched: setDeptIsTouched,
    reset: resetDept,
  } = useInput(data ? data.department : "");

  const {
    value: roleId,
    hasError: roleHasError,
    handleChange: roleChangeHandler,
    onBlurHandler: roleBlurHandler,
    setIsTouched: setRoleIsTouched,
    reset: resetRole,
  } = useSelectValidation(data ? data.roleId : "", true);

  const onFormSubmit = async (event) => {
    event.preventDefault();

    //set input touch to true
    setFirstnameIsTouched(true);
    setLastnameIsTouched(true);
    setEmailIsTouched(true);
    setJobIsTouched(true);
    setMobileIsTouched(true);
    setSecondaryEmailIsTouched(true);
    setDeptIsTouched(true);
    setRoleIsTouched(true);
    setIsLoading(true);

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      jobTitle === "" ||
      mobileNumber === "" ||
      secondaryEmail === "" ||
      department === "" ||
      roleId === ""
    ) {
      setOpenModal(false);
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
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        email: email,
        jobTitle: jobTitle,
        mobileNumber: mobileNumber,
        secondaryEmail: secondaryEmail,
        department: department,
        roleId: roleId,
      };

      submit(formData, { method: "post" });
      setOpenModal(false);

      // Simulating an asynchronous operation with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  useEffect(() => {
    if (error === undefined) {
      return;
    } else if (error === 450) {
      return;
    }
  }, [error, response]);

  useEffect(() => {
    if (response) {
      resetFirstname();
      resetLastname();
      resetEmail();
      resetJob();
      resetMobile();
      resetSecondaryEmail();
      resetDept();
      resetRole();
      resetMiddlename();
      navigate("../add_user");
      if (data) {
        if (response) {
          navigate("..");
        }
      } else {
        setIsLoading(false);
      }
    } else if (error) {
      setIsLoading(false);
    }
  }, [
    response,
    data,
    error,
    navigate,
    setIsLoading,
    resetFirstname,
    resetLastname,
    resetEmail,
    resetJob,
    resetMobile,
    resetSecondaryEmail,
    resetDept,
    resetRole,
  ]);

  const firstnameInputClasses = firstnameHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  // const middlenameInputClasses = middlenameHasError
  //   ? `${style.inputContainer} ${style.invalid}`
  //   : `${style.inputContainer}`;

  const lastnameInputClasses = lastnameHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const emailInputClasses = emailHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const jobInputClasses = jobHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const mobileInputClasses = mobileHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const secondaryInputClasses = secondaryEmailHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const deptInputClasses = deptHasError
    ? `${style.inputContainer} ${style.invalid}`
    : `${style.inputContainer}`;

  const { Option } = Select;

  const formTitle = data ? "Update User" : "Create New User Account";
  const breadCrumbTitle = data ? "Update" : "Create";

  const content = data
    ? "Are you sure you want to update the data?"
    : "Are you sure you want to create this data?";
  const title = data ? "Update user" : "Create User";

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
                title: "Users",
              },
              {
                title: `${breadCrumbTitle}`,
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
          <FormInfo>
            <div className={firstnameInputClasses}>
              <label htmlFor="firstname">
                First Name<i>*</i>
              </label>
              <Input
                type="text"
                name="firstname"
                value={firstname}
                onChange={firstnameChangeHandler}
                onBlur={firstnameBlurHandler}
                placeholder="Enter your first name"
              />
              {firstnameHasError && <p>Please fill out this field!</p>}
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="middlename">Middle Name</label>
              <Input
                type="text"
                name="middlename"
                value={middlename}
                placeholder="Enter your middle name"
                onChange={middleNameOnChangeHandler}

              />
              {/* {middlenameHasError && <p>Please fill out this field!</p>} */}
            </div>
            <div className={lastnameInputClasses}>
              <label htmlFor="lastname">
                Last Name<i>*</i>
              </label>
              <Input
                type="text"
                name="lastname"
                value={lastname}
                onChange={lastnameChangeHandler}
                onBlur={lastnameBlurHandler}
                placeholder="Enter your last name"
              />
              {lastnameHasError && <p>Please fill out this field!</p>}
            </div>
            <div className={emailInputClasses}>
              <label htmlFor="email">
                Work Email Address (*@barapido.com)<i>*</i>
              </label>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={(e) => emailChangeHandler(e.target.value)}
                onBlur={emailBlurHandler}
                placeholder="Enter your email"
              />
              {emailHasError && (
                <p>Invalid email. Please enter a valid email address.</p>
              )}
            </div>
            <div className={jobInputClasses}>
              <label htmlFor="jobTitle">
                Job Title<i>*</i>
              </label>
              <Input
                type="text"
                name="jobTitle"
                value={jobTitle}
                onChange={jobChangeHandler}
                onBlur={jobBlurHandler}
                placeholder="Enter your job title"
              />
              {jobHasError && <p>Please fill out this field!</p>}
            </div>
          </FormInfo>
          <FormInfo>
            <div className={mobileInputClasses}>
              <label htmlFor="mobileNumber">
                Mobile Number<i>*</i>
              </label>
              <Input
                type="text"
                name="mobileNumber"
                addonBefore="+63"
                value={mobileNumber}
                placeholder="9*********"
                onChange={(e) => {
                  const inputText = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (inputText.length <= 10) {
                    mobileChangeHandler(inputText);
                  }
                }}
                onBlur={mobileBlurHandler}
                maxLength={10}
              />
              {mobileHasError && <p>Invalid mobile number.</p>}
            </div>
            <div className={secondaryInputClasses}>
              <label htmlFor="secondaryEmail">
                Secondary Email<i>*</i>
              </label>
              <Input
                type="text"
                name="secondaryEmail"
                value={secondaryEmail}
                onChange={(e) => secondaryEmailChangeHandler(e.target.value)}
                onBlur={secondaryEmailBlurHandler}
                placeholder="Enter your email"
              />
              {secondaryEmailHasError && (
                <p>Invalid email. Please enter a valid email address.</p>
              )}
            </div>
            <div className={deptInputClasses}>
              <label htmlFor="department">
                Department<i>*</i>
              </label>
              <Input
                type="text"
                name="department"
                value={department}
                onChange={deptChangeHandler}
                onBlur={deptBlurHandler}
                placeholder="Enter your department"
              />
              {deptHasError && <p>Please fill out this field!</p>}
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="role">
                Role<i>*</i>
              </label>
              <Select
                name="roleId"
                className={style.selectWidth}
                // allowClear
                placeholder="Select role"
                value={roleId}
                onChange={roleChangeHandler}
                onBlur={roleBlurHandler}
              >
                {roleData.map((e, i) => (
                  <Option key={i} value={e.role_id}>
                    {e.role_name}
                  </Option>
                ))}
              </Select>
              {roleHasError && <p>Please select a role!</p>}
            </div>
          </FormInfo>
          <div className={style.buttonContainer}>
          <Button type="primary" danger onClick={cancel}>Cancel</Button>
            <Button type="primary" onClick={onConfirm}>
              Save
            </Button>
          </div>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default UserForm;
