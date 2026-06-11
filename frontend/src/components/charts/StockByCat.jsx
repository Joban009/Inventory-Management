import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

const StockByCat = () => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ categories: [], stocks: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("/backend/stock_by_category.php", {
          credentials: "include",
        });
        const json = await res.json();
        console.log("Stock by category data:", json);
        if (json.status === "success") {
          setChartData({ categories: json.categories, stocks: json.stocks });
        }
      } catch (err) {
        console.error("Error loading stock by category chart", err);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || chartData.categories.length === 0) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const options = {
      chart: {
        type: "bar",
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "55%",
          dataLabels: { position: "top" },
        },
      },
      colors: ["#3B82F6"],
      dataLabels: { enabled: false },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
        padding: { top: 8, left: 8, right: 8 },
      },
      xaxis: {
        categories: chartData.categories,
        labels: {
          style: { colors: "#6B7280", fontSize: "10px", fontWeight: 600 },
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
          name: "Units",
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

  return <div ref={containerRef} className="min-h-[280px] w-full" />;
};

export default StockByCat;
