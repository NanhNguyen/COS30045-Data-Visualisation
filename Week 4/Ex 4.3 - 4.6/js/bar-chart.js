const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1000 600") 
  .style("border", "1px solid #ccc");

d3.csv("data/tv_2026_01_28.csv").then((rawData) => {
  let counts = d3.rollup(
    rawData,
    (v) => v.length,
    (d) => d.Brand_Reg,
  );
  let data = Array.from(counts, ([brand, count]) => ({ brand, count }));

  data.sort((a, b) => b.count - a.count);

  data = data.slice(0, 10);

  console.log("Dữ liệu đã xử lý:", data);
  createBarChart(data);
});

const createBarChart = (data) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 200 };
  const width = 1000 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.count)])
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.brand))
    .range([0, height])
    .padding(0.2);

  chartGroup
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("y", (d) => yScale(d.brand))
    .attr("x", 0)
    .attr("width", (d) => xScale(d.count))
    .attr("height", yScale.bandwidth());

  chartGroup
    .selectAll(".label")
    .data(data)
    .join("text")
    .attr("x", -10)
    .attr("y", (d) => yScale(d.brand) + yScale.bandwidth() / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .text((d) => d.brand);
};
