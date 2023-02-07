import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function Class() {
  const [addSess, setAddSess] = useState([]);
  const [roadMap, setMap] = useState([]);
  const [fill, setFill] = useState({});
  let addLen = addSess.length;
  let sessionRoadMap = [
    "1 R",
    "2 R",
    "3 R",
    "4 R",
    "5 B",
    "10 B",
    "9 L",
    "8 L",
    "7 L",
    "6 L",
    "11 R",
    "12 R",
    "13 R",
    "14 R",
    "15 B",
    "20 B",
    "19 L",
    "18 L",
    "17 L",
    "16 L",
    "21 R",
    "22 R",
    "23 R",
    "24 R",
    "25 B",
    "30 B",
    "29 L",
    "28 L",
    "27 L",
    "26 L",
    "31 R",
    "32 R",
    "33 R",
    "34 R",
    "35 B",
    "40 B",
    "39 L",
    "38 L",
    "37 L",
    "36 L",
    "41 R",
    "42 R",
    "43 O",
  ];
  let seper;
  useEffect(() => {
    loadAdditional();
  }, []);
  let loadAdditional = async () => {
    try {
      let addSession = await axios.get(
        "https://zenclass-be-xi.vercel.app/additional-sessiondata",
        {
          headers: {
            batch_id: window.localStorage.getItem("batch_id"),
          },
        }
      );
      setAddSess(addSession.data.addSess);
      setMap(addSession.data.roadMap);
      console.log(addSession);
    } catch (error) {
      console.log(error);
    }
  };
  let sessionMapValue = (pass) => {
    let num = pass.split(" ");

    let op = roadMap.filter((val) => val.roadMapNumber === parseInt(num[0]));
    setFill(op[0]);
    console.log(num[0]);
  };
  return (
    <>
      <div className="row">
        <div className="w-100  secTwo">
          <h3>Class</h3>
          <h6>{window.localStorage.getItem("admin-name")}</h6>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-9 col-md-9 col-lg-9 col-sm-9 ">
          <div className="banner">Join the class on time!</div>
          {fill ? (
            <div className="session-container contents-update">
              <div className="session-area">
                <span style={{ fontSize: "24px", fontWeight: "500" }}>
                  {fill.topic}
                </span>
                <br />
                9/09/2022-Thursday-10:00am-12:00pm
                <hr />
                <div className="preread-head">contents:</div>
                <div className="ml-3">
                  <span className="preread">{fill.content}</span>
                </div>
                <div className="preread-head">Pre-read:</div>
                <div className="ml-3 mb-3">
                  <span className="preread">No-pre read available</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="session-container contents-update">
              <div className="session-area">
                <span style={{ fontSize: "24px", fontWeight: "500" }}>
                  Java Script Day 1
                </span>
                <br />
                8/02/2022-Thursday-10:00am-01:00pm
                <hr />
                <div className="preread-head">contents:</div>
                <div className="ml-3">
                  <span className="preread">
                    Introduction to Web Browser Wars DOM tree CSSOM tree Browser
                    internals - HTML parser CSS parser JS engine Layout engine
                    or rendering engine JavaScript V8 engine internals IP – MAC
                    address Ports & Evolution of HTTP
                  </span>
                </div>
                <div className="preread-head">Pre-read:</div>
                <div className="ml-3 mb-3">
                  <span className="preread">No-pre read available</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-1 col-lg-1 col-md-1">
          <div className="sideContainer">
            <div className="roadmap-container justify-self-center">
              <div className="roadmap-area">
                <div className="progress-head">
                  <span className="progress-header">Sessions Roadmap</span>
                </div>
                <div className="sessionsContainer">
                  {sessionRoadMap.map((val, idx) => {
                    seper = val.split(" ");
                    return seper[1] === "R" ? (
                      <div
                        key={idx}
                        onClick={() => {
                          sessionMapValue(val);
                        }}
                        className="roadmap_icon_container RICompleted"
                      >
                        <h6>{seper[0]}</h6>
                        <div className="step-path-right"></div>
                      </div>
                    ) : seper[1] === "B" ? (
                      <div
                        key={idx}
                        onClick={() => {
                          sessionMapValue(val);
                        }}
                        className="roadmap_icon_container RICompleted"
                      >
                        <h6>{seper[0]}</h6>
                        <div className="step-path-bottom"></div>
                      </div>
                    ) : seper[1] === "L" ? (
                      <div
                        key={idx}
                        onClick={() => {
                          sessionMapValue(val);
                        }}
                        className="roadmap_icon_container RICompleted"
                      >
                        <h6>{seper[0]}</h6>
                        <div className="step-path-left"></div>
                      </div>
                    ) : seper[1] === "O" ? (
                      <div
                        key={idx}
                        onClick={() => {
                          sessionMapValue(val);
                        }}
                        className="roadmap_icon_container RICompleted"
                      >
                        <h6>{seper[0]}</h6>
                        <div className="step-path-none"></div>
                      </div>
                    ) : null;
                  })}
                </div>
                {/* //upto */}
              </div>
            </div>
            {addSess > 0 ? (
              addSess.map((val, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-12 mt-2">
                      <div className="roadmap-container">
                        <div className="roadmap-area">
                          <div className="progress-head d-flex justify-content-between">
                            <span className="progress-header">
                              Additional Session
                            </span>
                          </div>
                          <div className="addSessionContainer">
                            <div className="addSession">
                              <h5 style={{ fontWeight: "450" }}>{val.topic}</h5>
                              <p style={{ fontWeight: "250", margin: "0px" }}>
                                {val.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : addLen === 0 ? (
              <div className="row">
                <div className="col-12 mt-1">
                  <div className="roadmap-container">
                    <div className="roadmap-area">
                      <div className="progress-head d-flex justify-content-between">
                        <span className="progress-header">
                          Additional Session
                        </span>
                      </div>
                      <div className="addSessionContainer">
                        <div className="addSession">
                          <h5 style={{ fontWeight: "450" }}>AWS day 4</h5>
                          <p style={{ fontWeight: "250", margin: "0px" }}>
                            28/10/2022 - Friday - 2:00pm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Class;
