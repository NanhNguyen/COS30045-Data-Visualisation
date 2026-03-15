d3.csv("data/Ex6_TVdata.csv")
  .then((data) => {
    data.forEach((d) => {
      d.energy = +d.energyConsumption;
      d.star = +d.star;
      d.screensize = +d.screenSize;
    });

    console.log("Data Loaded & Cleaned:", data[0]);

    drawHistogram(data);
    drawScatterplot(data);
    populateFilters(data);
  })
  .catch((err) => {
    console.error(
      "Lỗi nạp file CSV. Hãy kiểm tra đường dẫn data/Ex6_TVdata.csv",
      err,
    );
  });
