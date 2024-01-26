import React from "react";
import Chart from "react-apexcharts";

import {
  barChartData,
  lineChartData,
  donutChartData,
} from "../../data/charts/chartData";

const DashboardHomePage = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex items-center justify-start">
        <p className="text-6xl font-bold text-blue">
          Welcome to Admin Dashboard
        </p>
      </div>
      <Chart
        options={barChartData.options}
        series={barChartData.series}
        type="bar"
      />
      <Chart options={lineChartData.options} series={lineChartData.series} />
      <Chart
        type="pie"
        options={donutChartData.options}
        series={donutChartData.series}
      />
    </div>
  );
};

export default DashboardHomePage;
