import React from "react";
import DepartmentsList from "./DepartmentsList";

function GetAllDataDelaysProject() {
  return (
    <div>
      <DepartmentsList Path={"/Home/ProjectDelayListAssistance"} />
    </div>
  );
}
export default GetAllDataDelaysProject;
