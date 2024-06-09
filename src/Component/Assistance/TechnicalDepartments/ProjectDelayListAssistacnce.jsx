import React from 'react';
import { useParams } from 'react-router-dom'; // Correct import path for `useParams`
import AllProjectsEchDepartment from './AllProjectsToechDepartment';
function ProjectDelayListAssistance() {
  const { id } = useParams(); // Get the `id` parameter from the URL
  return (
    <div>
      <AllProjectsEchDepartment id={id} Label="Delay" /> {/* Ensure `label` prop is passed correctly */}
    </div>
  );
}
export default ProjectDelayListAssistance;
