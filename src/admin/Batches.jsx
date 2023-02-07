import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";

function Batches() {
  const [batch, setBatch] = useState([""]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    selectBatches();
  }, [refresh]);

  let selectBatches = async () => {
    try {
      let data = await axios.get(
        "https://zenclass-be-xi.vercel.app/give-batches",
        {
          headers: {
            auth: window.localStorage.getItem("app-token"),
          },
        }
      );
      setBatch(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let formik = useFormik({
    initialValues: {
      batchName: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let disMsg = await axios.post(
          "https://zenclass-be-xi.vercel.app/create-collection",
          values,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
        setRefresh(refresh + 1);
        resetForm({ values: "" });
        alert(disMsg.data.messege);
      } catch (error) {
        console.log(error);
      }
    },
  });

  let formikStu = useFormik({
    initialValues: {
      batchName: "",
      email: "",
      name: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let studentEntry = await axios.post(
          "https://zenclass-be-xi.vercel.app/adding-students",
          values,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
        console.log(values);
        alert(studentEntry.data.messege);
        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Batches</h3>
          <h6>Gayathiri T</h6>
        </div>
      </div>

      <div className="row mt-3 ">
        <div className="col-md-4 ms-5 ">
          <h5>Add students to the batch</h5>
          <form onSubmit={formikStu.handleSubmit}>
            <select
              className="form-select mb-3"
              value={formikStu.values.batchName}
              onChange={formikStu.handleChange}
              name="batchName"
              aria-label="Default select example"
            >
              <option value>Select Batch</option>
              {batch.map((val, idx) => {
                return (
                  <option key={idx} value={val.batchName}>
                    {val.batchName}
                  </option>
                );
              })}
            </select>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Enter name
              </label>
              <input
                type="text"
                name="name"
                value={formikStu.values.name}
                onChange={formikStu.handleChange}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter your fullname "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formikStu.values.email}
                onChange={formikStu.handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                name="password"
                value={formikStu.values.password}
                onChange={formikStu.handleChange}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3 mt-4">
              Add
            </button>
          </form>
        </div>

        <div className="col-md-6 mx-5">
          <div className="row mt-5 ">
            <div className="col-md-12 card text-bg-dark">
              <div className="card-body">
                <h5 className="mb-4">Create a new batch</h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Enter batch name
                    </label>
                    <input
                      type="text"
                      name="batchName"
                      value={formik.values.batchName}
                      onChange={formik.handleChange}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="create a batch"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mb-3 mt-4">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Batches;
