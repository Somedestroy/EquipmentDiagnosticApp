import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

// Конфигурация параметров
const parameterConfig = {
  temp: {
    label: "Температура охлаждающей воды",
    color: "#ff9800",
    domain: [10, 26],
    unit: "°C",
    greenLimits: [12, 22],
    redLimits: [10, 24],
    mockData: [
      { date: "01.08.2023", value: 18 },
      { date: "02.08.2023", value: 19 },
      { date: "03.08.2023", value: 20 },
      { date: "04.08.2023", value: 21 },
      { date: "05.08.2023", value: 22 },
      { date: "06.08.2023", value: 23 },
      { date: "07.08.2023", value: 21 },
      { date: "08.08.2023", value: 20 },
      { date: "09.08.2023", value: 18 },
    ],
  },
  flow: {
    label: "Расход охлаждающей воды",
    color: "#1976d2",
    domain: [15000, 19000],
    unit: "м³/ч",
    greenLimits: [17000 * 0.95, 17000 * 1.05],
    redLimits: [17000 * 0.90, 17000 * 1.10],
    mockData: [
      { date: "01.08.2023", value: 16000 },
      { date: "02.08.2023", value: 16500 },
      { date: "03.08.2023", value: 17000 },
      { date: "04.08.2023", value: 17500 },
      { date: "05.08.2023", value: 18000 },
      { date: "06.08.2023", value: 17800 },
      { date: "07.08.2023", value: 17200 },
      { date: "08.08.2023", value: 16800 },
      { date: "09.08.2023", value: 16000 },
    ],
  },
};

const Trends = () => {
  const [selectedParams, setSelectedParams] = useState([]);
  const [paramToAdd, setParamToAdd] = useState("");

  const handleAddParam = () => {
    if (paramToAdd && !selectedParams.includes(paramToAdd)) {
      setSelectedParams((prev) => [...prev, paramToAdd]);
    }
  };

  const handleRemoveParam = (param) => {
    setSelectedParams((prev) => prev.filter((p) => p !== param));
  };

  const renderChart = (param) => {
    const config = parameterConfig[param];
    const data = config.mockData;

    return (
      <Box key={param} sx={{ height: 300, mt: 4 }}>
        <Typography variant="h6" sx={{ fontFamily: "Inter, Roboto, sans-serif", fontWeight: 600 }}>
          {config.label}
        </Typography>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={config.domain} />
            <Tooltip />
            <ReferenceLine y={config.greenLimits[0]} stroke="green" strokeDasharray="3 3" />
            <ReferenceLine y={config.greenLimits[1]} stroke="green" strokeDasharray="3 3" />
            <ReferenceLine y={config.redLimits[0]} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine y={config.redLimits[1]} stroke="red" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={2}
              dot={{ r: 3 }}
              name={`${config.label}, ${config.unit}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ fontFamily: "Inter, Roboto, sans-serif", p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Тренды параметров
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
          Выберите контролируемый параметр:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Select
            value={paramToAdd}
            onChange={(e) => setParamToAdd(e.target.value)}
            displayEmpty
            sx={{ width: 300 }}
          >
            <MenuItem value="">-- выбрать параметр --</MenuItem>
            {Object.entries(parameterConfig).map(([key, config]) => (
              <MenuItem key={key} value={key}>
                {config.label}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleAddParam}>
            Добавить
          </Button>
        </Box>
        <Stack direction="row" spacing={1} mt={2}>
          {selectedParams.map((param) => (
            <Chip
              key={param}
              label={parameterConfig[param].label}
              onDelete={() => handleRemoveParam(param)}
              color="primary"
              variant="outlined"
              sx={{ fontFamily: "Inter, Roboto, sans-serif" }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      {selectedParams.map(renderChart)}
    </Box>
  );
};

export default Trends;
