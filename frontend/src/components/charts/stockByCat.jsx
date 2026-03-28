import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const StockByCat = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
        categories: ["ELECTRONICS", "FURNITURE", "APPAREL", "ACCESSORIES", "OTHER"],
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
          data: [420, 280, 190, 150, 95],
        },
      ],
    };

    const chart = new ApexCharts(el, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[280px] w-full" />;
};

export default StockByCat;
