import React, { useEffect, useState } from "react";
import "../Style/FileStyle.css";
import UploadFile from "./UploadFile";
import FileList from "./FileList";
import { setLanguage } from "../../../redux/LanguageState";
import { useDispatch, useSelector } from "react-redux";
import Header from "Component/Layout/Header";
function Files() {
  const [action, setAction] = useState(false);
  const { rtl } = useSelector((state) => {
    return state?.language;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  return (
    <div>
      <div className="page">
        <div className="content w-full">
          <div dir={rtl.dir}>
            <Header title={"ادارةالملفات"} dir={rtl?.dir} />
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
    </div>
  );
}

export default Files;
