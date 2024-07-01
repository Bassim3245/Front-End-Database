import React, { useEffect } from "react";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, useTheme } from "@mui/material";
import Header from "../../Layout/Header";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../redux/LanguageState";
const Dashboard = () => {
  const { rtl } = useSelector((state) => {
    // @ts-ignore
    return state?.language;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLanguage());
  }, [dispatch]);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <div
      style={{ width: "100%", maxWidth: "100%" }}
      className="container"
      dir={`${rtl?.dir}`}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        dir={`${rtl?.dir}`}
      >
        <Header
          isDashboard={true}
          title={t("dashboard.title")}
          subTitle={t("dashboard.subTitle")}
        />

        <Box sx={{ textAlign: "right", mb: 1.3 }}>
          <Button
            sx={{ padding: "6px 8px", textTransform: "capitalize" }}
            variant="contained"
            color="primary"
          >
            <DownloadOutlined />
            {t("dashboard.report")}
          </Button>
        </Box>
      </Stack>
      <Box>
        {" "}
        <Row1 />
      </Box>
      <Box sx={{ mt: "10px" }}>
        <Row2 />
      </Box>

      {/* <Row3  /> */}
    </div>
  );
};

export default Dashboard;
