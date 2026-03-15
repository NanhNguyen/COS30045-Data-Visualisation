// js/scatter.js
const scatterSvg = d3
  .select("#scatter-plot")
  .append("svg")
  .attr("viewBox", "0 0 500 400")
  .attr("class", "responsive-svg")
  .style("border", "1px solid #eee");

d3.csv("data/tv_2026_01_28.csv").then((data) => {
  data.forEach((d) => {
    d.star = +d.Star2;
    d.energy = +d["Labelled energy consumption (kWh/year)"];
  });

  const cleanData = data.filter((d) => d.star > 0 && d.energy > 0);

  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const g = scatterSvg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(cleanData, (d) => d.star)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(cleanData, (d) => d.energy)])
    .range([height, 0]);

  g.selectAll("circle")
    .data(cleanData)
    .join("circle")
    .attr("cx", (d) => xScale(d.star))
    .attr("cy", (d) => yScale(d.energy))
    .attr("r", 3)
    .attr("fill", "rgba(70, 130, 180, 0.5)");

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  g.append("g").call(d3.axisLeft(yScale));
});
