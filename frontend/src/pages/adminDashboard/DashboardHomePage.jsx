import React from "react";
import CustomAngleCircle from "../../assets/Custom-Angle-Circle.png";
import GradientChart from "../../assets/Gradient-Chart.png";
import LineColumnChart from "../../assets/Line-&-Column-Chart.png";
import StackedColumn from "../../assets/Stacked-Column.png";
import Dashed from "../../assets/Dashed.png";
const DashboardHomePage = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="flex items-center justify-start">
        <p className="text-6xl font-bold text-blue">
          Welcome to Admin Dashboard
        </p>
      </div>
      <img src={CustomAngleCircle} alt="customAngle_image" className="h-60" />
      <img src={GradientChart} alt="gradient_image" className="h-60" />
      <img src={LineColumnChart} alt="linecolumn_image" className="h-60" />
      <img src={StackedColumn} alt="stackedcolumn_image" className="h-60" />
      <img src={Dashed} alt="dashed_image" className="h-60" />
    </div>
  );
};

export default DashboardHomePage;
