function populateFilters(rawData) {
  const filterDiv = d3.select("#filters");

  filterDiv
    .selectAll("button")
    .data(filters_screen)
    .join("button")
    .text((d) => d.label)
    .attr("class", (d) => (d.isActive ? "active" : ""))
    .on("click", function (event, d) {
      filters_screen.forEach((f) => (f.isActive = f.id === d.id));
      d3.selectAll("#filters button").attr("class", (f) =>
        f.isActive ? "active" : "",
      );

      const filteredData =
        d.id === "all"
          ? rawData
          : rawData.filter((item) => item.screenTech === d.id);

      updateHistogram(filteredData);
    });
}

function updateHistogram(data) {
  const bins = binGenerator(data);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([height, 0]);

  d3.select("#histogram-svg")
    .selectAll("rect")
    .data(bins)
    .join("rect")
    .transition()
    .duration(500)
    .attr("y", (d) => yScale(d.length))
    .attr("height", (d) => height - yScale(d.length));
}
