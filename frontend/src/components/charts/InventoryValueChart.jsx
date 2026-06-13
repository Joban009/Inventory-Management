import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { parseResponseSafely } from "../../utils/helpers";

const InventoryValueChart = () => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [range, setRange] = useState(30);
  const [chartData, setChartData] = useState({ categories: [], values: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch(`/backend/inventory_value.php?range=${range}`, {
          credentials: "include",
        });
        const json = await parseResponseSafely(res);
        if (json && json.status === "success") {
          const categories = json.data.map((r) => r.day);
          const values = json.data.map((r) => r.inventory_value);
          setChartData({ categories, values });
        }
      } catch (err) {
        console.error("Error loading chart data", err);
      }
    };

    fetchChartData();
  }, [range]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || chartData.categories.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const options = {
      chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "inherit",
      },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#22C55E"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          colorStops: [
            { offset: 0, color: "#22C55E", opacity: 0.35 },
            { offset: 100, color: "#22C55E", opacity: 0.02 },
          ],
        },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
        padding: { left: 8, right: 8 },
      },
      xaxis: {
        categories: chartData.categories,
        labels: {
          style: { colors: "#6B7280", fontSize: "11px", fontWeight: 500 },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (v) => `$${(v / 1000).toFixed(0)}k`,
          style: { colors: "#6B7280", fontSize: "11px" },
        },
      },
      tooltip: {
        theme: "light",
        y: { formatter: (v) => `$${v.toLocaleString()}` },
      },
      series: [
        {
          name: "Inventory Value",
          data: chartData.values,
        },
      ],
    };

    chartRef.current = new ApexCharts(el, options);
    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[7, 30, 90].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRange(value)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
              range === value
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Last {value} Days
          </button>
        ))}
      </div>
      <div ref={containerRef} className="min-h-70 w-full" />
    </div>
  );
};

export default InventoryValueChart;
