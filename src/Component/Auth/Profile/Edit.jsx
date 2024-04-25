import React, { useState } from "react";
function Edit(props) {
  return (
    <div className="col-lg-8">
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Full Name</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={props?.name}
                onChange={(e) => props?.setUname(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Email or username</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={props?.username}
                onChange={(e) => props?.setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3"></div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Mobile</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={props?.Phone}
                onChange={(e) => props?.setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Password</h6>
            </div>
            <div className="col-sm-9 text-secondary">
              <input
                type="text"
                className="form-control"
                value={props?.password}
                onChange={(e) => props?.setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
