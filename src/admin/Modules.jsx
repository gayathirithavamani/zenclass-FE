import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

function Modules() {
  const [batch, setBatch] = useState([""]);
  useEffect(() => {
    selectBatches();
  }, []);
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
      topic: "",
      roadMapNumber: "",
      content: "",
      preRead: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.batchName === "") {
        errors.batchName = "Please select a batch";
      }
      if (values.roadMapNumber > 43) {
        errors.roadMapNumber = "Enter a day less than 43";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let update = await axios.post(
          "https://zenclass-be-xi.vercel.app/session-update",
          values,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
        console.log(update.data.messege);
        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
    },
  });
  let addSession = useFormik({
    initialValues: {
      batchName: "",
      topic: "",
      content: "",
      preRead: "",
    },
    validate: () => {},
    onSubmit: async (values, { resetForm }) => {
      try {
        let addUpdate = await axios.post(
          "https://zenclass-be-xi.vercel.app/add-session",
          values,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
        resetForm({ values: "" });
        alert(addUpdate.data.messege);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Modules</h3>
          <h6>{window.localStorage.getItem("admin-name")}</h6>
        </div>
      </div>

      <div className="row mt-2 ">
        <div className="col-md-5 ms-5 mb-3 roadmap-update">
          <form className="row mb-4 g-3" onSubmit={formik.handleSubmit}>
            <h6 className="mb-2 pt-3">Update daily session roadmap</h6>
            <div className="col-md-12">
              <div className="form-floating mt-3">
                <select
                  name="batchName"
                  value={formik.values.batchName}
                  onChange={formik.handleChange}
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  required
                >
                  <option defaultValue>Open this select menu</option>
                  {batch.map((val, idx) => {
                    return (
                      <option key={idx} value={val.batchName}>
                        {val.batchName}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect">Select the batch</label>
                {formik.errors.batchName ? (
                  <div className="mb-1 feedback">{formik.errors.batchName}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputName4" className="form-label">
                Topic
              </label>
              <input
                name="topic"
                value={formik.values.topic}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="inputName4"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDay4" className="form-label">
                For day
              </label>
              <input
                name="roadMapNumber"
                value={formik.values.roadMapNumber}
                onChange={formik.handleChange}
                type="number"
                className="form-control"
                id="inputDay4"
              />
              {formik.errors.roadMapNumber ? (
                <div className="mb-1 feedback">
                  {formik.errors.roadMapNumber}
                </div>
              ) : null}
            </div>
            <div className="col-12 mt-4">
              <div className="form-floating">
                <textarea
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  className="form-control"
                  placeholder="Contents"
                  id="contents"
                  required
                ></textarea>
                <label htmlFor="contents">Content</label>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="inputPreread2" className="form-label">
                Pre-read
              </label>
              <input
                name="preRead"
                value={formik.values.preRead}
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="inputPreread2"
                required
              />
            </div>

            <div className="col-12 mb-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Additional session */}
        <div className="col-md-5 map2 roadmap-update">
          <form className="row mb-2 g-3" onSubmit={addSession.handleSubmit}>
            <h6 className="mb-2 pt-3">Additional session update</h6>
            <div className="col-md-12">
              <div className="form-floating mt-3">
                <select
                  name="batchName"
                  value={addSession.values.batchName}
                  onChange={addSession.handleChange}
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  required
                >
                  <option defaultValue>Open this select menu</option>
                  {batch.map((val, idx) => {
                    return (
                      <option key={idx} value={val.batchName}>
                        {val.batchName}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect">Select the batch</label>
                {formik.errors.batchName ? (
                  <div className="mb-1 feedback">{formik.errors.batchName}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputName4" className="form-label">
                Topic
              </label>
              <input
                name="topic"
                value={addSession.values.topic}
                onChange={addSession.handleChange}
                type="text"
                className="form-control"
                id="inputName4"
                required
              />
            </div>

            <div className="col-12 mt-4">
              <div className="form-floating">
                <textarea
                  name="content"
                  value={addSession.values.content}
                  onChange={addSession.handleChange}
                  className="form-control"
                  placeholder="Contents"
                  id="contents"
                  required
                ></textarea>
                <label htmlFor="contents">Content</label>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="inputPreread2" className="form-label">
                Pre-read
              </label>
              <input
                name="preRead"
                value={addSession.values.preRead}
                onChange={addSession.handleChange}
                type="text"
                className="form-control"
                id="inputPreread2"
                required
              />
            </div>

            <div className="col-12 mb-3">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modules;
