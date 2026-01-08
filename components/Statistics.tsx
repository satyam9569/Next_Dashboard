"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1900, 3000, 2500, 3200, 2800, 3500, 4000, 4500, 3800],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.5)",
      tension: 0.4,
    },
  ],
};

export const Statistics: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Statistics</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <Line data={data} />
      </div>
    </section>
  );
};
