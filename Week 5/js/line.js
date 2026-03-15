// js/line.js
const lineSvg = d3
  .select("#line-chart")
  .append("svg")
  .attr("viewBox", "0 0 650 500")
  .attr("class", "responsive-svg")
  .style("border", "1px solid #eee");

d3.csv("data/spot_prices.csv").then((data) => {
  data.forEach((d) => {
    d.year = +d.year;
    d.price = +d.price;
  });

  const margin = { top: 50, right: 50, bottom: 80, left: 80 };
  const width = 650 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const g = lineSvg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.price) + 10])
    .range([height, 0]);

  const lineGenerator = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.price))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 3)
    .attr("d", lineGenerator);

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).format(d3.format("d")).ticks(6))
    .style("font-size", "12px");

  g.append("g").call(d3.axisLeft(y)).style("font-size", "12px");

  g.append("text")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Year");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .text("Price ($/MWh)");
});
