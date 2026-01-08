import { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Sale, salesData } from "../data";
import { CSVLink } from "react-csv";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sortKey, setSortKey] = useState<"sales" | "profit">("sales");

  // Filtered data
  const filteredData: Sale[] = salesData.filter(
    (d) =>
      (selectedRegion === "All" || d.region === selectedRegion) &&
      (selectedMonth === "All" || d.month === selectedMonth) &&
      (selectedCategory === "All" || d.category === selectedCategory)
  );

  // Months, categories
  const months: string[] = [...new Set(filteredData.map((d) => d.month))];
  const categories: string[] = [...new Set(filteredData.map((d) => d.category))];

  // Sales & profit by month
  const sales: number[] = months.map((m) =>
    filteredData.filter((d) => d.month === m).reduce((sum, d) => sum + d.sales, 0)
  );
  const profit: number[] = months.map((m) =>
    filteredData.filter((d) => d.month === m).reduce((sum, d) => sum + d.profit, 0)
  );

  // Category sales
  const categorySales: number[] = categories.map((cat) =>
    filteredData.filter((d) => d.category === cat).reduce((sum, d) => sum + d.sales, 0)
  );

  // Top 5 products
  const topProducts: Sale[] = [...filteredData].sort((a, b) => b[sortKey] - a[sortKey]).slice(0, 5);

  // KPI
  const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0);
  const totalProfit = filteredData.reduce((sum, d) => sum + d.profit, 0);
  const profitMargin = ((totalProfit / totalSales) * 100).toFixed(2);

  // Line chart
  const lineData = {
    labels: months,
    datasets: [
      { label: "Sales", data: sales, borderColor: "rgb(59,130,246)", backgroundColor: "rgba(59,130,246,0.2)" },
      { label: "Profit", data: profit, borderColor: "rgb(16,185,129)", backgroundColor: "rgba(16,185,129,0.2)" }
    ]
  };

  const barData = {
    labels: months,
    datasets: [{ label: "Sales", data: sales, backgroundColor: "rgb(59,130,246)" }]
  };

  const pieData = {
    labels: categories,
    datasets: [{ label: "Category Sales", data: categorySales, backgroundColor: ["rgb(59,130,246)", "rgb(16,185,129)", "rgb(244,63,94)"] }]
  };

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen p-6" : "bg-gray-50 min-h-screen p-6"}>
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interactive Sales Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 border rounded">{darkMode ? "Light Mode" : "Dark Mode"}</button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="p-2 border rounded" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option>All</option>
          {[...new Set(salesData.map(d => d.region))].map(r => <option key={r}>{r}</option>)}
        </select>
        <select className="p-2 border rounded" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option>All</option>
          {[...new Set(salesData.map(d => d.month))].map(m => <option key={m}>{m}</option>)}
        </select>
        <select className="p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option>All</option>
          {[...new Set(salesData.map(d => d.category))].map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-500 dark:text-gray-300">Total Sales</h3>
          <p className="text-2xl font-bold">${totalSales}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-500 dark:text-gray-300">Total Profit</h3>
          <p className="text-2xl font-bold">${totalProfit}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h3 className="text-gray-500 dark:text-gray-300">Profit Margin</h3>
          <p className="text-2xl font-bold">{profitMargin}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold mb-4">Sales & Profit Trend</h2>
          <Line data={lineData} options={{ onClick: (_, elements) => { if(elements.length) setSelectedMonth(months[elements[0].index]); } }} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold mb-4">Monthly Sales</h2>
          <Bar data={barData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="font-semibold mb-4">Category-wise Sales</h2>
          <Pie data={pieData} />
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">Top 5 Products</h2>
            <select className="p-1 border rounded" value={sortKey} onChange={(e) => setSortKey(e.target.value as "sales" | "profit")}>
              <option value="sales">Sort by Sales</option>
              <option value="profit">Sort by Profit</option>
            </select>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Sales</th>
                <th className="border-b p-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="p-2">{p.product}</td>
                  <td className="p-2">${p.sales}</td>
                  <td className="p-2">${p.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-4">
        <CSVLink data={filteredData} filename={"sales.csv"} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Export CSV
        </CSVLink>
      </div>
    </div>
  );
}
