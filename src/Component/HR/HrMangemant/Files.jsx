import React, { useState } from "react";
import "../Style/FileStyle.css";
import UploadFile from "./UploadFile";
import FileList from "./FileList";
function Files() {
  const [action, setAction] = useState();
  return (
    <div>
      <div className="page">
        <div className="content w-full">
          <h1 className="p-relative">Files</h1>
          <div className="files-page d-flex m-20 gap-20">
            <UploadFile
              // @ts-ignore
              setAction={setAction}
            />
            <FileList
              // @ts-ignore
              action={action}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Files;
