import React from 'react'
import { useParams } from 'react-router';
import AllProjectsEchDepartment from './AllProjectsToechDepartment';
function ProjectsListAssistance() {
    const { id } = useParams();
    
  return (
    <div>
      <AllProjectsEchDepartment id={ id} />
    </div>
  )
}
export default ProjectsListAssistance
