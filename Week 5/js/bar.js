// js/bar.js
const barSvg = d3
  .select("#bar-chart")
  .append("svg")
  .attr("viewBox", "0 0 500 400")
  .attr("class", "responsive-svg");

d3.csv("data/tv_2026_01_28.csv").then((data) => {
  const filteredData = data.filter(
    (d) => +d.screensize >= 54 && +d.screensize <= 56,
  );
  const rollup = d3.rollup(
    filteredData,
    (v) => d3.mean(v, (d) => +d.Avg_mode_power),
    (d) => d.Brand_Reg,
  );
  let plotData = Array.from(rollup, ([brand, avgPower]) => ({
    brand,
    avgPower,
  }))
    .sort((a, b) => b.avgPower - a.avgPower)
    .slice(0, 5);

  const margin = { top: 20, right: 20, bottom: 60, left: 50 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const g = barSvg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleBand()
    .domain(plotData.map((d) => d.brand))
    .range([0, width])
    .padding(0.3);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(plotData, (d) => d.avgPower)])
    .range([height, 0]);

  g.selectAll("rect")
    .data(plotData)
    .join("rect")
    .attr("x", (d) => x(d.brand))
    .attr("y", (d) => y(d.avgPower))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.avgPower))
    .attr("fill", "#69b3a2");

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));
  g.append("g").call(d3.axisLeft(y));
});
