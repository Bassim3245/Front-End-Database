import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { data1, data2, data3, data4 } from "./data";
import { t } from "i18next";
import { getAllProJECTaNDcOUNT5 } from "../../Config/fetchData";
import { useQuery } from "react-query";

const Row1 = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "dataAllProject",
    () => getAllProJECTaNDcOUNT5(),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );
  useEffect(() => {
  }, []);
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
    >
      <Card
        image={"/image/project_5956494.png"}
        title={data?.count2}
        subTitle={t("dashboard.ProjectsDelivered")}
        increase={"+14%"}
        data={data1}
        scheme={"nivo"}
      />

      <Card
       image={"/image/planning_16759804.png"}
        title={data?.count}
        subTitle={t("dashboard.CurrentProjects")}
        increase={"+21%"}
        data={data2}
        scheme={"category10"}
      />

      <Card
      image={"/image/project_5956494.png"}
        title={data?.count1}
        subTitle={t("dashboard.AllProjects")}
        increase={"+5%"}
        data={data3}
        scheme={"accent"}
      />
      <Card
       image={"/image/deadline.png"}
        title={data?.count3}
        subTitle={t("dashboard.DelayedProjects")}
        increase={"+5%"}
        data={data3}
        scheme={"accent"}
      />
    </Stack>
  );
};

export default Row1;
