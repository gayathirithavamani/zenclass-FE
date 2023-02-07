import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Capstone() {
  const param = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    loadData();
  }, []);
  let loadData = async () => {
    try {
      let studentData = await axios.get(
        `https://zenclass-be-xi.vercel.app/studentdet/${param.userId}`,
        {
          headers: {
            auth: window.localStorage.getItem("app-token"),
          },
        }
      );

      setUser(studentData.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let formik = useFormik({
    initialValues: {
      title: "",
      specific: "",
    },
    validate: () => {},
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        let data = await axios.post(
          `https://zenclass-be-xi.vercel.app/assign-capstone/${param.userId}`,
          values,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
        console.log(data);
        resetForm({ values: "" });
      } catch (error) {
        console.log(error);
      }
      console.log(values);
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Capstone</h3>
          <h6>Gayathiri T</h6>
        </div>
      </div>

      <h5 className="mt-3">
        {user.name ? user.name : user.name === null ? "" : null}
      </h5>
      <div className="row mx-3 mt-4">
        <div className="col-md-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                value={formik.values.title}
                name="title"
                onChange={formik.handleChange}
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Capestone title"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Any specification on design
              </label>
              <textarea
                value={formik.values.specific}
                name="specific"
                onChange={formik.handleChange}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Assign
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Capstone;
