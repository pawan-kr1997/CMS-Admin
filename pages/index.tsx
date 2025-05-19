import HeightChart from "@/components/HeightChart";
import VaccinationChart from "@/components/VaccinationChart";
import WeightChart from "@/components/WeightChart";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";

import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("vaccination");

  return (
    <Box
      sx={{
        width: "750px",
        margin: "auto",
        paddingTop: "30px",
      }}
    >
      <Typography sx={{ fontSize: "30px", fontWeight: "600" }}>
        Dashboard
      </Typography>
      <Typography
        sx={{ fontSize: "14px", color: "gray", marginBottom: "20px" }}
      >
        Welcome to the admin dashboard
      </Typography>

      <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={(e, newValue) => setTab(newValue)}>
              <Tab
                label="Vaccination"
                value="vaccination"
                sx={{ textTransform: "capitalize", padding: "0px" }}
              />
              <Tab
                label="Height"
                value="height"
                sx={{ textTransform: "capitalize", padding: "0px" }}
              />
              <Tab
                label="Weight"
                value="weight"
                sx={{ textTransform: "capitalize", padding: "0px" }}
              />
            </TabList>
          </Box>
          <TabPanel value="vaccination" sx={{ padding: 0 }}>
            <VaccinationChart />
          </TabPanel>
          <TabPanel value="height" sx={{ padding: 0 }}>
            <HeightChart />
          </TabPanel>
          <TabPanel value="weight" sx={{ padding: 0 }}>
            <WeightChart />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
