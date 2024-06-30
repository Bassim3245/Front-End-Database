import React from "react";
import DepartmentsList from "./DepartmentsList";

function GetAllDataProjectCurrent() {
  return (
    <div>
      <DepartmentsList
        Path={"/Home/ProjectsListAssistance"}
        title={"المشاريع الحالية"}
        subTitle={"قائمة المشاريع الحالية"}
      />
    </div>
  );
}
export default GetAllDataProjectCurrent;
