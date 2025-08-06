//log hello
console.log("Hello!");

//init variables
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboards;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

//buttons
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");
const filterRangeButton = document.getElementById("filter_range");

// Create a function to log workbook information
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards within the workbook
  dashboards = workbook.publishedSheetsInfo;
  dashboards.forEach(logDashboard);

  // Get the active sheet (tab)
  vizActiveSheet = workbook.activeSheet;
  console.log("The active is: " + vizActiveSheet.name);

  //List all the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach(logActiveSheet);

  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

//defining functions
function logDashboard(dashboard) {
  index = dashboard.index;
  console.log("The sheet with index [" + index + "] is: " + dashboard.name);
}

function logActiveSheet(worksheet) {
  index = worksheet.index;
  console.log(
    "The worksheet with the index [" + index + "] is:" + worksheet.name
  );
}

// Functions that tell JS what to do when buttons are clicked

function oregonWashingtonFunction() {
  //Log what's pressed
  console.log(oregonWashingtonButton.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
  //Log what's pressed
  console.log(clearFilterButton.value);

  //Apply the filter to all of the sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function unDo() {
  // Log what's pressed
  console.log(undoButton.value);

  //Undo last action to viz
  viz.undoAsync();
}

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});

viz.addEventListener("firstinteractive", logWorkbookInformation);
oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
