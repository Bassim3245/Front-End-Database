import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import { ButtonClearState, ButtonSave } from "../../../../Config/Content";
import { useQuery } from "react-query";
import { getDataSystemPrice } from "../../../../Config/fetchData";

export default function PriceSystemShowData() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { isLoading, data, isError, error, refetch } = useQuery(
    "DataSystemPrice",
    getDataSystemPrice,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  // @ts-ignore
  React.useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);
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
          <Table
            striped
            bordered
            hover
            dir="rtl"
            variant={`${theme?.palette?.mode === "dark" ? "dark" : ""}`}
          >
            <thead>
              <tr>
                <>
                  <th>#</th>
                  <th>Price</th>
                  <th>Label Price</th>
                  <th>percent </th>

                  <th>Action</th>
                </>
              </tr>
            </thead>
            <tbody>
              {data?.map((data, index) => (
                <tr key={data?._id}>
                  <td>{index + 1}</td>
                  <td>{data?.Price}</td>
                  <td>{data?.PriceLabel}</td>
                  <td>{data?.percent}</td>

                  <td>
                    <ButtonSave className="ms-3">حذف</ButtonSave>
                    <ButtonClearState>تعديل</ButtonClearState>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>{" "}
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
