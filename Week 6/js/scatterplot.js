// js/scatterplot.js
function drawScatterplot(data) {
  const svg = d3
    .select("#scatterplot-chart")
    .append("svg")
    .attr("viewBox", "0 0 700 450");

  const marginS = { top: 40, right: 120, bottom: 60, left: 80 };
  const widthS = 700 - marginS.left - marginS.right;
  const heightS = 450 - marginS.top - marginS.bottom;

  const innerChartS = svg
    .append("g")
    .attr("transform", `translate(${marginS.left},${marginS.top})`);

  const cleanData = data.filter((d) => !isNaN(d.star) && !isNaN(d.energy));

  const xScaleS = d3.scaleLinear().domain([0, 6]).range([0, widthS]);

  const yScaleS = d3
    .scaleLinear()
    .domain([0, d3.max(cleanData, (d) => d.energy)])
    .range([heightS, 0]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(["LCD", "LED", "OLED", "Plasma"])
    .range(["#3498db", "#e67e22", "#2ecc71", "#e74c3c"]);

  const circles = innerChartS
    .selectAll("circle")
    .data(cleanData)
    .join("circle")
    .attr("cx", (d) => xScaleS(d.star))
    .attr("cy", (d) => yScaleS(d.energy))
    .attr("r", 5)
    .attr("fill", (d) => colorScale(d.screenTech))
    .attr("opacity", 0.7)
    .style("cursor", "pointer");

  innerChartS
    .append("g")
    .attr("transform", `translate(0,${heightS})`)
    .call(d3.axisBottom(xScaleS).ticks(6));

  innerChartS.append("g").call(d3.axisLeft(yScaleS));

  svg
    .append("text")
    .attr("x", 350)
    .attr("y", 440)
    .attr("text-anchor", "middle")
    .text("Star Rating");
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -225)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .text("Energy (kWh/year)");

  const legend = svg.append("g").attr("transform", `translate(${600}, 50)`);
  colorScale.domain().forEach((tech, i) => {
    const row = legend.append("g").attr("transform", `translate(0, ${i * 25})`);
    row
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colorScale(tech));
    row
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "12px")
      .text(tech);
  });

  let tooltip = d3.select("#tooltip-div");
  if (tooltip.empty()) {
    tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip-div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "rgba(0,0,0,0.8)")
      .style("color", "#fff")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none");
  }

  circles
    .on("mouseover", (event, d) => {
      tooltip
        .style("visibility", "visible")
        .html(
          `Size: ${d.screensize} inch<br>Star: ${d.star}<br>Tech: ${d.screenTech}`,
        );
      d3.select(event.currentTarget).attr("r", 8).attr("stroke", "#000");
    })
    .on("mousemove", (event) => {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", (event) => {
      tooltip.style("visibility", "hidden");
      d3.select(event.currentTarget).attr("r", 5).attr("stroke", "none");
    });
}
