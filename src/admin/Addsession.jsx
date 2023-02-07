/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useEffect, useState } from "react";

function Addsession() {
  const [batch, setBatch] = useState([""]);
  const [stuTable, setTable] = useState(null);
  const [id, setId] = useState(0);
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
      let obj = {
        batch_id: e.target.value,
      };
      let batchStudents = await axios.post(
        "https://zenclass-be-xi.vercel.app/getiing-adddata",
        obj,
        {
          headers: {
            auth: window.localStorage.getItem("app-token"),
          },
        }
      );
      console.log(batchStudents);
      setId(batchStudents.data.id);

      setTable(batchStudents.data.addSess);
      setSpin(false);
    } catch (error) {
      console.log(error);
    }
  };
  let delSession = async (pop) => {
    try {
      if (confirm("Are you sure you want to delete?") === true) {
        let obj = {
          userid: id,
          topic: pop.topic,
        };
        await axios.put(
          "https://zenclass-be-xi.vercel.app/remove-session",
          obj,
          {
            headers: {
              auth: window.localStorage.getItem("app-token"),
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="row ">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Session manage</h3>
          <h6>Gayathiri T</h6>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
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
      <div className="row mt-3">
        {stuTable
          ? stuTable.map((val, idx) => {
              return (
                <div className="col-md-4" key={idx}>
                  <div className="col-sm-6">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{val.topic}</h5>
                        <h6>Content:</h6>
                        <p className="card-text">{val.content}</p>
                        <button
                          onClick={() => {
                            delSession(val);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

export default Addsession;
