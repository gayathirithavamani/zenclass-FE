/* eslint-disable no-restricted-globals */
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Stuweb() {
  const [web, setWeb] = useState(false);

  useEffect(() => {
    loadData();
  }, []);
  let loadData = async () => {
    try {
      let wCode = await axios.get(
        "https://zenclass-be-xi.vercel.app/webcode-get",
        {
          headers: {
            userid: window.localStorage.getItem("userId"),
          },
        }
      );

      setWeb(wCode.data.data);
    } catch (error) {}
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 w-100  secTwo">
          <h3>Webcode</h3>
          <h6>{window.localStorage.getItem("admin-name")}</h6>
        </div>
      </div>
      {web ? (
        <div className="row mt-3 justify-content-center">
          {web.map((val, idx) => {
            return (
              <>
                <div className="col-md-4">
                  <div class="col-sm-6">
                    <div class="card" key={idx}>
                      <div class="card-body">
                        <h5 class="card-title">{val.title}</h5>
                        <h6>Any specific requirements</h6>
                        <p class="card-text">{val.specific}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : !web ? (
        <div>No project assigned yet</div>
      ) : null}
    </>
  );
}

export default Stuweb;
