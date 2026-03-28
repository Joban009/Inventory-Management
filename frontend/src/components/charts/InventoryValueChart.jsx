import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const InventoryValueChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
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
          name: "Value",
          data: [38200, 40100, 41500, 43800, 45200],
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

export default InventoryValueChart;
