import React from "react";

function InformationUserList({  department,data }) {
  return (
    <div className="col-lg-8">
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Full Name</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{data?.name}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Email</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{data?.username}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Phone</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{data.Phone}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Password</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{data?.password}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Department</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">{department?.departmentName}</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <p className="mb-0">Role</p>
            </div>
            <div className="col-sm-9">
              <p className="text-muted mb-0">
                {data?.user_type !== "H.O.D"
                  ? data?.user_type
                  : "Head of Department"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationUserList;
