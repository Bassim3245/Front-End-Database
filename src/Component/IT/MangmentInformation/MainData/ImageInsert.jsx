import{ useEffect, useState } from "react";
import { ButtonSave,VisuallyHiddenInput } from "../../../Config/Content";
import { Button, useTheme } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function ImageInsert() {
  const [ImageInsert, setImageInsert] = useState("");
  const [open, setOpen] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post(`${BackendUrl}/api/setImageInsert`, {
    //     data: ImageInsert,
    //   });
    //   toast(response.data.message);
    //   setImageInsert("");
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };
  const getDataMethodOtion = async () => {
    // try {
    //   const response = await axios.get(`${BackendUrl}/api/getDataImageInsert`);
    //   setDataImageInsert(response.data.response);
    //   console.log(dataImageInsert);
    // } catch (error) {
    //   toast.error(error.response.data.message);
    // }
  };
  // @ts-ignore
  useEffect(() => getDataMethodOtion, [ImageInsert]);
  const handleEdit = () => {
    setOpen(!open);
  };
  const theme=useTheme()
  return (
    <div>
      <h2 className="mt-0 mb-10" style={{ direction: "rtl" }}>
         ادراج الصور
      </h2>
      <p className="mt-0 mb-20 c-grey fs-15" style={{ direction: "rtl" }}>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center align-content-center h-100 w-100">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          sx={{height:"100px"}}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
          
        </Button>
    </div>
        <div className="mt-3">
          <ButtonSave className="me-3" onClick={handleSubmit}>
            ادراج
          </ButtonSave>
          {/* <ShowData dataImageInsert={dataImageInsert} /> */}
        </div>
      </form>
    </div>
  );
}

export default ImageInsert;
