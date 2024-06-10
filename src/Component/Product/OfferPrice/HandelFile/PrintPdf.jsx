import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "Component/Config/Content";
import { Box } from "@mui/material";
export default function PrintPdf(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const data = [
    {
      brief: "hekkeke",
      departmentName: "hehhe",
    },
  ];
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        البيانات المدرجة
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="a4-page">
            <div className="contentPage">
              <h1>Title</h1>
              <Table
                striped
                bordered
                hover
                dir="rtl"
                variant={theme?.palette?.mode === "dark" ? "dark" : ""}
              >
                <thead>
                  <tr>
                    <>
                      <th>#</th>
                      <th>اسماء الاقسام</th>
                      <th>رموز الاقسام</th>
                      <th>اجراء</th>
                    </>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <>
                        <td>{data?.departmentName}</td>
                        <td>{data?.brief}</td>
                      </>
                      <td>
                        <ButtonSave className="ms-3">حذف</ButtonSave>
                        <ButtonClearState>تعديل</ButtonClearState>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>{" "}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            غلق
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
