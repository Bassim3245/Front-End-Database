import React from "react";
import DepartmentsList from "./DepartmentsList";

function GetAllDataProjectNotDelay() {
  return (
    <div>
      <DepartmentsList
        Path={"/Home/ProjectsListAssistance"}
      />
    </div>
  );
}
export default GetAllDataProjectNotDelay;
