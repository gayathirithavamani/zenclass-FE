import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Eventedit() {
  const [batch, setBatch] = useState([""]);
  const [stuTable, setTable] = useState(null);
  const [spin, setSpin] = useState(false);
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
  let selectValue = async (e) => {
    try {
      setSpin(true);
      let eventManipu = await axios.get(
        "https://zenclass-be-xi.vercel.app/spec-student",
        {
          headers: {
            auth: window.localStorage.getItem("app-token"),
            batch_id: e.target.value,
          },
        }
      );
      setTable(eventManipu.data.details);
      console.log(eventManipu);
      setSpin(false);
    } catch (error) {}
  };
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Event-manage</h3>
          <h6>Gayathiri T</h6>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-4">
          <form>
            <select
              onChange={selectValue}
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue>Select batch</option>
              {batch.map((val, idx) => {
                return (
                  <option key={idx} value={val._id}>
                    {val.batchName}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-8 ">
          {spin ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary " role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : stuTable ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Batch Name</th>
                  <th scope="col">Events</th>
                </tr>
              </thead>
              <tbody>
                {stuTable.map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope="row">{idx + 1}</th>
                      <td>{val.name}</td>
                      <td>{val.email}</td>
                      <td>{val.batchName}</td>
                      <td>
                        <Link
                          to={`/home/edit-cap/${val._id}`}
                          type="button"
                          className="btn btn-success mx-2 btn-sm"
                        >
                          Capstone
                        </Link>
                        <Link
                          to={`/home/edit-web/${val._id}`}
                          type="button"
                          className="btn btn-success btn-sm"
                        >
                          Webcode
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Eventedit;
