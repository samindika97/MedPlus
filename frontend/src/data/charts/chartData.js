export const barChartData = {
  options: {
    chart: {
      width: "100%",
      type: "bar",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

export const lineChartData = {
  options: {
    chart: {
      width: "100%",
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

export const donutChartData = {
  options: {
    chart: {
      width: "100%",
      type: "donut",
    },
  },
  series: [44, 55, 41, 17, 15],
  labels: ["A", "B", "C", "D", "E"],
};
