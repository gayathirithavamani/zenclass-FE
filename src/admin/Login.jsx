import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navi = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: () => {},
    onSubmit: async (values) => {
      try {
        let loginReq = await axios.post(
          "https://zenclass-be-xi.vercel.app/login-verify",
          values
        );

        window.localStorage.setItem("app-token", loginReq.data.token);
        window.localStorage.setItem("admin-name", loginReq.data.name);
        window.localStorage.setItem("adminValidate", loginReq.data.admin);
        if (loginReq.data.userId) {
          window.localStorage.setItem("userId", loginReq.data.userId);
        }
        if (loginReq.data.batch_id) {
          window.localStorage.setItem("batch_id", loginReq.data.batch_id);
        }
        if (loginReq.data.token) {
          navi("/home");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-between">
        <div className="col-1">
          <div className="icon2">ZEN CLASS</div>
        </div>
        <div className="col-md-4 login-input">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-color">
              Submit
            </button>
            {/* <div className="testing">
              <h6> Test Credentials </h6>
              <span className="test-left">email :demo@gmail.com</span>
              <span className="test-left">password : 123456789</span>
            </div> */}
          </form>
          <div className="testing">
            <h6> Test Credentials </h6>
            <span className="test-left">email : onetwo@gmail.com</span>
            <span className="test-left">password : User@123456</span>
          </div>
        </div>
        <div
          className="col-md-4"
          style={{
            backgroundImage: "url(./img/log2.jpg)",
            height: "100vh",
            width: "75vh",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
