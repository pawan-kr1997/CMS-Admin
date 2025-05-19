import React, { use, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VaccinationChart: React.FC = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const [gender, setGender] = useState("");
  const [cohort, setCohort] = useState("");
  const [state, setState] = useState("");
  const [dashboardData, setDashboardData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleClearFilter = () => {
    setGender("");
    setCohort("");
    setState("");
  };

  const fetchVaccinationData = () => {
    let query = {
      state: state,
      cohort: cohort,
      gender: gender,
    };

    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/vaccination`, {
        params: query,
      })
      .then((res) => {
        setDashboardData(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVaccinationData();
  }, [gender, cohort, state]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "400",
          marginBottom: "30px",
          color: "gray",
          marginTop: "20px",
        }}
      >
        Vaccination data trends for different age groups
      </Typography>

      <Stack gap={1} mb={7} direction="row" alignItems="center">
        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              top: gender ? "0px" : "-6px", // adjust as needed for vertical centering
            },
          }}
        >
          <InputLabel>Select Gender</InputLabel>
          <Select
            sx={{
              width: "135px",
              height: "38px",
              fontSize: "14px",
            }}
            value={gender}
            label="Select Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "13px" }} value={"male"}>
              Male
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"female"}>
              Female
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"other"}>
              Other
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              top: cohort ? "0px" : "-6px", // adjust as needed for vertical centering
            },
          }}
        >
          <InputLabel>Select Cohort</InputLabel>
          <Select
            sx={{
              width: "135px",
              height: "38px",
              fontSize: "14px",
            }}
            value={cohort}
            label="Select Cohort"
            onChange={(e) => {
              setCohort(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "13px" }} value={"2022-23"}>
              2022-23
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"2023-24"}>
              2023-24
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"2024-25"}>
              2024-25
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              top: state ? "0px" : "-6px", // adjust as needed for vertical centering
            },
          }}
        >
          <InputLabel>Select State</InputLabel>
          <Select
            sx={{
              width: "150px",
              height: "38px",
              fontSize: "14px",
            }}
            value={state}
            label="Select State"
            onChange={(e) => {
              setState(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "13px" }} value={"karnataka"}>
              Karnataka
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"madhya pradesh"}>
              Madhya Pradesh
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"uttar pradesh"}>
              Uttar Pradesh
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          style={{
            textTransform: "capitalize",
            fontSize: "14px ",
            cursor: "pointer",
          }}
          disableElevation
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </Stack>

      <BarChart width={730} height={300} data={dashboardData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="fully" fill="#6b8e23" />
        <Bar dataKey="partially" fill="#4682b4" />
        <Bar dataKey="none" fill="#d2691e" />
      </BarChart>
    </Box>
  );
};

export default VaccinationChart;
