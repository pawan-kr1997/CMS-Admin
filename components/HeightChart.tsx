import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function HeightChart() {
  const [gender, setGender] = useState("");
  const [cohort, setCohort] = useState([]);
  const [state, setState] = useState("");
  const [enrolled, setEnrolled] = useState("");
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHeightData = () => {
    let query: any = {
      state: state,
      cohorts: cohort,
      gender: gender,
    };

    if (enrolled == "true" || enrolled == "false") {
      query.enrolled = enrolled === "true";
    }

    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/height`, {
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

  const handleClearFilter = () => {
    setGender("");
    setCohort([]);
    setState("");
    setEnrolled("");
  };

  useEffect(() => {
    fetchHeightData();
  }, [gender, cohort.length, state, enrolled]);

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
        Height data trends for different age groups
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
              top: cohort.length ? "0px" : "-6px", // adjust as needed for vertical centering
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
            multiple
            onChange={(e: any) => {
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

        <FormControl
          sx={{
            "& .MuiInputLabel-root": {
              fontSize: "14px",
              top: gender ? "0px" : "-6px", // adjust as needed for vertical centering
            },
          }}
        >
          <InputLabel>Feeding program</InputLabel>
          <Select
            sx={{
              width: "150px",
              height: "38px",
              fontSize: "14px",
            }}
            value={enrolled}
            label="Feeding program"
            onChange={(e) => {
              setEnrolled(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "13px" }} value={"true"}>
              Enrolled
            </MenuItem>
            <MenuItem sx={{ fontSize: "13px" }} value={"false"}>
              Not enrolled
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

      <ComposedChart
        width={730}
        height={350}
        data={dashboardData}
        margin={{ top: 0, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            value: "Age range (in yrs)",
            position: "insideBottom",
            offset: -8,
          }}
        />
        <YAxis
          label={{
            value: "Height (in cm)",
            angle: -90,
            dy: 30,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="normal"
          stroke="none"
          fill="#f9dcc4"
          connectNulls
          dot={false}
          activeDot={false}
        />
        {(!cohort.length || cohort.find((el) => el == "2022-23")) && (
          <Line
            type="natural"
            dataKey="2022-23"
            stroke="#0f4c5c"
            connectNulls
            strokeWidth={3}
          />
        )}
        {(!cohort.length || cohort.find((el) => el == "2023-24")) && (
          <Line
            type="natural"
            dataKey="2023-24"
            stroke="#e36414"
            connectNulls
            strokeWidth={3}
          />
        )}
        {(!cohort.length || cohort.find((el) => el == "2024-25")) && (
          <Line
            type="natural"
            dataKey="2024-25"
            stroke="#c1121f"
            connectNulls
            strokeWidth={3}
          />
        )}
        <Legend verticalAlign="top" height={36} />
      </ComposedChart>
    </Box>
  );
}
