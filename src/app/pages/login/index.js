import React, { useState, useEffect } from "react";
import "./index.scss";
import { regex } from "../../constants/regex";
import { Login as loginDetails } from "../../utils/apicalls";
import { useHistory } from "react-router-dom";
import Confirm from "../../components/confirmModal/confirm";
import Loader from "../../components/loader";
import loginBg from "../../../assets/images/login-bg1.jpg";
import logo from "../../../assets/images/Sahyogi-logo.png";
import TextField from "@mui/material/TextField";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isToggle, setIsToggle] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [password, setPassword] = useState();

  const payload = {
    emailId: email,
    password: password,
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handleLogin = (e) => {
    console.log("test")
    e.preventDefault();
    // event.preventDefault();
    if (validateEmail(email) && password) {
      setIsShowLoader(true);
      loginDetails((response) => {
        const { message, data, statusCode } = response;
        if (statusCode === 200) {
          sessionStorage.setItem("token", data.accessToken);
          // console.log(data.accessToken);
          sessionStorage.setItem("userEmail", data.username);
          sessionStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("userData", JSON.stringify(data));
          setIsBtnDisabled(false);
          setIsShowLoader(false);
          setShowConfirmModal(true);
          setAlertText(message);
          if (data.roles[0] === "Admin") {
            sessionStorage.setItem("role", data.roles[0]);
            history.push("/employee-list");
            window.location.reload();
          } else if (data.roles[0] === "Supervisor") {
            sessionStorage.setItem("role", data.roles[0]);
            history.push("/employee-list");
            window.location.reload();
          } else {
            history.push("/home");
          }
        } else {
          // setAlertText('Credentials are Not Valid');
          setAlertText(message);
          setIsBtnDisabled(false);
          setShowConfirmModal(true);
          setIsShowLoader(false);
        }
      }, payload);
    }
  };

  const validateEmail = (Email) => {
    const emailRegex = regex.emailRegex;
    return emailRegex.test(Email);
  };

  const inputHandler = (event, key) => {
    let val = event?.target.value;
    setIsBtnDisabled(true);
    if (key === 1) {
      setEmail(val);
    } else if (key === 2) {
      setPassword(val);
    }
    if (validateEmail(email) && password) {
      setIsBtnDisabled(false);
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter" && validateEmail(email) && password) {
      handleLogin();
    }
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div>
      <div
        className="container-login"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src={logo} alt="" />
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
            </h4>
            <div className="image"></div>
          </div>
          <form className="body-form">
            <div className="input-group-login mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user login-user"></i>
                </span>
              </div>
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Email"
                type="text"
                // autoComplete='new-password'
                onKeyUp={(event) => {
                  handleKeyEnter(event);
                }}
                onChange={(e) => inputHandler(e, 1)}
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="input-group-login input-password mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <TextField
                // id='outlined-multiline-flexible'
                label="Password"
                className="form-control"
                autoComplete="new-password"
                type={`${isToggle ? "text" : "password"}`}
                onKeyUp={(event) => {
                  handleKeyEnter(event);
                }}
                onChange={(e) => inputHandler(e, 2)}
                placeholder="Enter Password"
              />
              <span
                role="button"
                tabIndex={0}
                className={`${
                  isToggle
                    ? "fa fa-eye-slash login__icon"
                    : "fa fa-eye login__icon"
                }`}
                onClick={() => {
                  handleToggle();
                }}
                onKeyDown={() => {
                  handleToggle();
                }}
              ></span>
            </div>
            <button
              disabled={isBtnDisabled}
              onClick={(e) => {
                handleLogin(e);
              }}
              className={`btn btn-secondary login-btn btn-block ${
                isBtnDisabled && "disabled"
              }`}
            >
              LOGIN
            </button>
            <div className="message">
              <div>
                <h4>Don't Have A Account?</h4>
              </div>
              <div>
                <a className="btn-sign" onClick={handleRegister}>
                  Sign Up
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showConfirmModal && (
        <Confirm
          buttonText={"OK"}
          isCancelRequired={false}
          confirmTitle={alertText}
          onConfirm={() => {
            setShowConfirmModal(false);
          }}
          onCancel={() => {
            setShowConfirmModal(false);
          }}
        />
      )}
      {isShowLoader ? <Loader /> : null}
    </div>
  );
};

export default Login;
