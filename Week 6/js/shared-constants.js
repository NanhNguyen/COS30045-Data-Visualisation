const margin = { top: 40, right: 30, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "LED", label: "LED", isActive: false },
  { id: "OLED", label: "OLED", isActive: false },
  { id: "Plasma", label: "Plasma", isActive: false },
];

const binGenerator = d3
  .bin()
  .value((d) => d.energy) 
  .thresholds(20); 
