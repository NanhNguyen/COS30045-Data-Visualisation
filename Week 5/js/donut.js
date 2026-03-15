// js/donut.js
const donutSvg = d3
  .select("#donut-chart")
  .append("svg")
  .attr("viewBox", "0 0 500 400")
  .attr("class", "responsive-svg");

d3.csv("data/tv_2026_01_28.csv").then((rawData) => {
  const counts = d3.rollup(
    rawData,
    (v) => v.length,
    (d) => d.Screen_Tech,
  );
  const data = Array.from(counts, ([tech, count]) => ({ tech, count }));

  const width = 500,
    height = 400,
    radius = Math.min(width, height) / 2 - 40;
  const g = donutSvg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie().value((d) => d.count);
  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius);

  g.selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.tech))
    .attr("stroke", "white")
    .style("stroke-width", "2px");

  const legend = donutSvg.append("g").attr("transform", "translate(380, 50)");
  data.forEach((d, i) => {
    const row = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
    row
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", color(d.tech));
    row
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text(d.tech)
      .style("font-size", "12px");
  });
});
