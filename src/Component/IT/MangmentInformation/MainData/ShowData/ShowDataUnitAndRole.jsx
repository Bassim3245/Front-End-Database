import * as React from "react";
import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import {
  ButtonClearState,
  ButtonSave,
  ColorLink,
} from "../../../../Config/Content";
import { useQuery } from "react-query";
import { getRole } from "../../../../Config/fetchData";
import { useNavigate } from "react-router";
export default function ShowDataUnitAndRole({
  themeMode,
  dataSystemUnit,
  label,
}) {
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { isLoading, data, error, refetch } = useQuery("getRole", getRole, {});
  React.useEffect(() => {
    refetch();
    console.log(data);
  }, [open]);
  const handelSetPermission = (id) => {
    Navigate(`/Home/SetPermissionToGroup/${id}`);
  };
  return (
    <Fragment>
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
          <Table
            striped
            bordered
            hover
            dir="rtl"
            variant={`${themeMode?.palette?.mode === "dark" ? "dark" : ""}`}
          >
            <thead>
              <tr>
                <th>#</th>
                {label === "UnitSystem" ? (
                  <>
                    <th>Units</th>
                    <th>Action</th>
                  </>
                ) : label === "Role" ? (
                  <>
                    <th>Role</th>
                    <th>action</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {label === "UnitSystem" &&
                dataSystemUnit?.map((data, index) => (
                  <tr key={data?._id}>
                    <td>{index + 1}</td>
                    <td>{data?.Unit}</td>
                    <td>
                      <ButtonSave className="ms-3">حذف</ButtonSave>
                      <ButtonClearState>تعديل</ButtonClearState>
                    </td>
                  </tr>
                ))}
              {label === "Role" &&
                data?.map((Item, index) => (
                  <tr key={Item?._id}>
                    <td>{index + 1}</td>
                    <td>{Item?.RoleName}</td>
                    <td>
                      <ButtonSave className="ms-3">حذف</ButtonSave>
                      <ButtonClearState className="ms-3">
                        تعديل
                      </ButtonClearState>
                      <ColorLink onClick={() => handelSetPermission(Item?._id)}>
                        اضافة صلاحيات{" "}
                      </ColorLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            غلق
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
