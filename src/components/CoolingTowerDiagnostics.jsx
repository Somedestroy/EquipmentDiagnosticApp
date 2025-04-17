import React from "react";
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

const CoolingIndexes = () => {
  const fontFamily = "'Segoe UI', 'Roboto', 'Inter', sans-serif";

  const data = [
    { date: "01.08.2023", index: 0.92, temp: 23 },
    { date: "02.08.2023", index: 0.93, temp: 22 },
    { date: "03.08.2023", index: 0.95, temp: 21 },
    { date: "04.08.2023", index: 0.97, temp: 20 },
    { date: "05.08.2023", index: 0.99, temp: 19 },
    { date: "06.08.2023", index: 1.02, temp: 18 },
    { date: "07.08.2023", index: 1.05, temp: 17 },
    { date: "08.08.2023", index: 1.08, temp: 18 },
    { date: "09.08.2023", index: 1.06, temp: 19 },
    { date: "10.08.2023", index: 1.03, temp: 22 },
    { date: "11.08.2023", index: 1.00, temp: 21 },
    { date: "12.08.2023", index: 0.98, temp: 20 },
    { date: "13.08.2023", index: 0.97, temp: 19 },
    { date: "14.08.2023", index: 0.95, temp: 18 },
    { date: "15.08.2023", index: 0.93, temp: 17 },
    { date: "16.08.2023", index: 0.91, temp: 16 },
    { date: "17.08.2023", index: 0.89, temp: 24 },
    { date: "18.08.2023", index: 0.88, temp: 25 },
    { date: "19.08.2023", index: 0.87, temp: 26 },
    { date: "20.08.2023", index: 0.85, temp: 27 },
    { date: "21.08.2023", index: 0.86, temp: 23 },
    { date: "22.08.2023", index: 0.88, temp: 21 },
    { date: "23.08.2023", index: 0.90, temp: 22 },
    { date: "24.08.2023", index: 0.93, temp: 23 },
    { date: "25.08.2023", index: 0.95, temp: 24 },
    { date: "26.08.2023", index: 0.97, temp: 25 },
    { date: "27.08.2023", index: 0.99, temp: 26 },
    { date: "28.08.2023", index: 1.01, temp: 27 },
    { date: "29.08.2023", index: 1.03, temp: 28 },
    { date: "30.08.2023", index: 1.05, temp: 29 },
  ];

  const base = 1.0;
  const greenDelta = 0.05;
  const redDelta = 0.10;
  const tempMin = 12;
  const tempMax = 22;

  const alerts = data
    .map((entry) => {
      const messages = [];

      if (entry.index < base - redDelta || entry.index > base + redDelta) {
        messages.push({
          date: entry.date,
          severity: "critical",
          message: `Индекс охлаждения (${entry.index.toFixed(2)}) вне допустимых границ.`,
        });
      } else if (entry.index < base - greenDelta || entry.index > base + greenDelta) {
        messages.push({
          date: entry.date,
          severity: "warning",
          message: `Индекс охлаждения (${entry.index.toFixed(2)}) вне оптимального диапазона.`,
        });
      }

      if (entry.temp < tempMin || entry.temp > tempMax) {
        messages.push({
          date: entry.date,
          severity: "critical",
          message: `Температура охлаждающей воды (${entry.temp}°C) вне нормативных границ.`,
        });
      }

      return messages;
    })
    .flat();

  return (
    <div style={{ width: "100%", padding: 20, fontFamily }}>
      <h2 style={{ fontWeight: 600 }}>Температура охлаждающей воды</h2>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} interval={2} />
            <YAxis domain={[10, 30]} label={{ value: '°C', position: 'insideLeft' }} />
            <Tooltip />
            <ReferenceLine y={tempMin} stroke="red" strokeDasharray="3 3" label="Нижний норматив" />
            <ReferenceLine y={tempMax} stroke="red" strokeDasharray="3 3" label="Верхний норматив" />
            <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ fontWeight: 600, marginTop: 40 }}>Индексы технического состояния</h2>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} interval={2} />
            <YAxis domain={[0.8, 1.1]} />
            <Tooltip />
            <ReferenceLine y={base - greenDelta} stroke="green" strokeDasharray="4 4" />
            <ReferenceLine y={base + greenDelta} stroke="green" strokeDasharray="4 4" />
            <ReferenceLine y={base - redDelta} stroke="red" strokeDasharray="4 4" />
            <ReferenceLine y={base + redDelta} stroke="red" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="index" stroke="#1976d2" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ fontWeight: 600, marginTop: 40 }}>Журнал сообщений</h2>
      <div style={{ marginTop: 20 }}>
        {alerts.length === 0 ? (
          <div style={{ color: "green" }}>Параметры в пределах нормы</div>
        ) : (
          alerts.map((alert, i) => (
            <div
              key={i}
              style={{
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px",
                backgroundColor: alert.severity === "critical" ? "#ffe5e5" : "#fff9e5",
                borderLeft: `5px solid ${alert.severity === "critical" ? "red" : "orange"}`,
                fontSize: "14px",
              }}
            >
              <strong>{alert.date}</strong>: {alert.message}
              <div style={{ fontStyle: "italic", fontSize: "0.9em", marginTop: "4px" }}>
                Рекомендация: скорректируйте положение воздухозаборных окон, либо проверьте
                неисправности оросительной системы.
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoolingIndexes;
