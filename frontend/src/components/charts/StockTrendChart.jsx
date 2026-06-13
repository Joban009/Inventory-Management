import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import apiClient from "../../services/api.js";

const StockTrendChart = ({ days = "7" }) => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ days: [], stocks: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await apiClient.get("/stock_trend.php", {
          params: { days },
        });
        const json = res.data;
        console.log("Stock trend data:", json);
        if (json.status === "success") {
          setChartData({ days: json.days, stocks: json.stocks });
        }
      } catch (err) {
        console.error("Error loading stock trend chart", err);
      }
    };

    fetchChartData();
  }, [days]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || chartData.days.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const lineColor = "#0D9488";

    const options = {
      chart: {
        type: "area",
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: "inherit",
        animations: { enabled: true },
      },
      colors: [lineColor],
      stroke: {
        curve: "smooth",
        width: 3,
        colors: [lineColor],
        lineCap: "round",
        show: true,
      },
      markers: {
        size: 5,
        strokeWidth: 2,
        strokeColors: "#fff",
        colors: [lineColor],
        hover: { size: 7 },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.8,
          opacityFrom: 0.22,
          opacityTo: 0.02,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
        padding: { left: 8, right: 8 },
      },
      xaxis: {
        categories: chartData.days,
        labels: {
          style: { colors: "#6B7280", fontSize: "11px", fontWeight: 500 },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: "#6B7280", fontSize: "11px" },
        },
      },
      tooltip: { theme: "light" },
      series: [
        {
          name: "Movement",
          data: chartData.stocks,
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
    <div ref={containerRef} className="w-full" style={{ minHeight: 300 }} />
  );
};

export default StockTrendChart;
