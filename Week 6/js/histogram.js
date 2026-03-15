function drawHistogram(data) {
  const svg = d3
    .select("#histogram-chart")
    .append("svg")
    .attr("viewBox", "0 0 600 400")
    .attr("id", "histogram-svg");

  const innerChart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const bins = binGenerator(data);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.energy)])
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height, 0]);

  innerChart
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.x0) + 1)
    .attr("width", (d) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
    .attr("y", (d) => yScale(d.length))
    .attr("height", (d) => height - yScale(d.length))
    .attr("fill", "steelblue");

  innerChart
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  innerChart.append("g").attr("class", "y-axis-hist").call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", 300)
    .attr("y", 390)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh)");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -200)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Number of TVs");
}
