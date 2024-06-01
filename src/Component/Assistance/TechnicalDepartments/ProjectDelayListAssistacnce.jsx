import React from 'react'
import { useParams } from 'react-router';
import AllProjectsEchDepartment from './AllProjectsToechDepartment';
function ProjectDelayListAssistance() {
    const { id } = useParams();
    
  return (
    <div>
      <AllProjectsEchDepartment id={ id} Label={"Delay"}/>
    </div>
  )
}
export default ProjectDelayListAssistance
