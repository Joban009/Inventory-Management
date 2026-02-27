
import React , {useEffect} from 'react'
import ApexCharts from 'apexcharts';
import { Chart } from 'chart.js';

const stockByCat = () => {
  useEffect(() => {
    const options = {
      chart: { type: "bar",
        title: "Stocks"
      },
      series: [
        {
          name: "Stock",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();

    return () => {
      chart.destroy(); // cleanup
    };
  }, []);

  return <div id="chart"></div>;
};



export default stockByCat

