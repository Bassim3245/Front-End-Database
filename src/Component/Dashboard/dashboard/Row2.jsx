// import {
//   Box,
//   IconButton,
//   Paper,
//   Stack,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import Line from "./lineChart/Line";
// import { DownloadOutlined } from "@mui/icons-material";
// import { Transactions } from "./data";
// import { t } from "i18next";

// const Row2 = () => {
//   const theme = useTheme();
//   return (
//     <Stack direction={"row"} flexWrap={"wrap"} gap={1.2} mt={1.3} >
//       <Paper sx={{ maxWidth: 900, flexGrow: 1, minWidth: "400px" }}>
//         <Stack
//           alignItems={"center"}
//           direction={"row"}
//           flexWrap={"wrap"}
//           justifyContent={"space-between"}
//         >
//           <Box>
//             <Typography
//               color={theme.palette.secondary.main}
//               mb={1}
//               mt={2}
//               ml={4}
//               variant="h6"
//               fontWeight={"bold"}
//             >
//             {t('dashboard.revenueGenerated')}
//             </Typography>
//             <Typography variant="body2" ml={4}>
//               $59,342.32
//             </Typography>
//           </Box>

//           <Box>
//             <IconButton sx={{ mr: 3 }}>
//               <DownloadOutlined />
//             </IconButton>
//           </Box>
//         </Stack>

//         <Line isDahboard={true} />
//       </Paper>

//       <Box
//         sx={{
//           overflow: "auto",
//           borderRadius: "4px",
//           minWidth: "280px",
//           maxHeight: 355,
//           flexGrow: 1,
//         }}
//       >
//         <Paper>
//           <Typography
//             color={theme.palette.secondary.main}
//             fontWeight={"bold"}
//             p={1.2}
//             variant="h6"
//           >
//           {t('dashboard.recentTransactions')}
//           </Typography>
//         </Paper>

//         {Transactions.map((item) => {
//           return (
//             <Paper
//               sx={{
//                 mt: 0.4,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Box p={1.2}>
//                 <Typography variant="body1">{item.txId}</Typography>
//                 <Typography variant="body2">{item.user} </Typography>
//               </Box>
//               <Typography variant="body1">{item.date} </Typography>

//               <Typography
//                 borderRadius={1.4}
//                 p={1}
//                 bgcolor={theme.palette.error.main}
//                 color={theme.palette.getContrastText(theme.palette.error.main)}
//                 variant="body2"
//               >
//                 ${item.cost}
//               </Typography>
//             </Paper>
//           );
//         })}
//       </Box>
//     </Stack>
//   );
// };

// export default Row2;

import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Card from "./card";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { data1, data2, data3, data4 } from "./data";
import { t } from "i18next";
import { getAllProJECTaNDcOUNT5 } from "../../Config/fetchData";
import { useQuery } from "react-query";

const Row2 = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "dataAllProject",
    () => getAllProJECTaNDcOUNT5(),
    {
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    }
  );
  useEffect(() => {
    console.log("DSCSD", data);
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
        icon={
          <EmailIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
        }
        title={data?.count2}
        subTitle={"طلبيات"}
        increase={"+14%"}
        data={data1}
        scheme={"nivo"}
      />
      <Card
        icon={
          <PointOfSaleIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
        }
        title={data?.count}
        subTitle={"مناقصات"}
        increase={"+21%"}
        data={data2}
        scheme={"category10"}
      />
      <Card
        icon={
          <PersonAddIcon
            sx={{ fontSize: "23px", color: theme.palette.secondary.main }}
          />
        }
        title={data?.count3}
        subTitle={"مشاريع  "}
        increase={"+5%"}
        data={data3}
        scheme={"accent"}
      />
    </Stack>
  );
};

export default Row2;
