import React from "react";
import DepartmentsList from "./DepartmentsList";

function GetAllDataDelaysProject() {
  return (
    <div>
      <DepartmentsList Path={"/Home/ProjectDelayListAssistance"} title={"المشاريع المتأخرة"} subTitle={"قائمة المشاريع المتأخر"} />
    </div>
  );
}
export default GetAllDataDelaysProject;
