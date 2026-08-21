/**
 * Skye8 JavaScript Practical Assessment
 * Task 5 - Interactive Sales Dashboard
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * The SALES dataset is loaded from data.js. Do not mutate it.
 * sort() mutates: sort a copy.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";

var els = {
  search: document.getElementById("sales-search"),
  category: document.getElementById("sales-category"),
  sort: document.getElementById("sales-sort"),
  tableBody: document.getElementById("sales-table-body"),
  kpiRevenue: document.getElementById("kpi-revenue"),
  kpiOrders: document.getElementById("kpi-orders"),
  kpiUnits: document.getElementById("kpi-units"),
  kpiAov: document.getElementById("kpi-aov"),
  kpiTopProduct: document.getElementById("kpi-top-product"),
  kpiTopCategory: document.getElementById("kpi-top-category"),
  empty: document.getElementById("sales-empty"),
};

// Helper to format money in a consistent way
function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0
  }).format(amount);
}

// TODO [T5-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(records, term) {
  if (!term || term.trim() === "") {
    return records;
  }

  var searchTerm = term.trim().toLowerCase();
  var result = [];

  for (var i = 0; i < records.length; i++) {
    var productName = records[i].product.toLowerCase();
    if (productName.indexOf(searchTerm) !== -1) {
      result.push(records[i]);
    }
  }
  return result;
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  if (!category || category === "") {
    return records;
  }

  var result = [];
  for (var i = 0; i < records.length; i++) {
    if (records[i].category === category) {
      result.push(records[i]);
    }
  }
  return result;
}

// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  if (!sortValue || sortValue === "") {
    return records;
  }

  // Make a copy
  var copy = [];
  for (var i = 0; i < records.length; i++) {
    copy.push(records[i]);
  }

  if (sortValue === "revenue-desc") {
    copy.sort(function (a, b) {
      var revA = a.quantity * a.price;
      var revB = b.quantity * b.price;
      return revB - revA;
    });
  } else if (sortValue === "revenue-asc") {
    copy.sort(function (a, b) {
      var revA = a.quantity * a.price;
      var revB = b.quantity * b.price;
      return revA - revB;
    });
  } else if (sortValue === "date-desc") {
    copy.sort(function (a, b) {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
  } else if (sortValue === "date-asc") {
    copy.sort(function (a, b) {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
  } else if (sortValue === "quantity-desc") {
    copy.sort(function (a, b) {
      return b.quantity - a.quantity;
    });
  }

  return copy;
}

// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  var searchTerm = els.search.value;
  var categoryValue = els.category.value;
  var sortValue = els.sort.value;

  var result = SALES;

  result = applySearch(result, searchTerm);
  result = applyFilters(result, categoryValue);
  result = applySort(result, sortValue);

  return result;
}

// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total = total + (records[i].quantity * records[i].price);
  }
  return total;
}

// TODO [T5-06]: Calculate total units sold from a set of records.
function calcUnits(records) {
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total = total + records[i].quantity;
  }
  return total;
}

// TODO [T5-07]: Find the best-selling product by total units across
// the provided records. Return the product name, or a dash if the
// set is empty.
function findTopProduct(records) {
  if (records.length === 0) {
    return "-";
  }

  // Count units per product name
  var unitsByProduct = {};

  for (var i = 0; i < records.length; i++) {
    var name = records[i].product;
    var qty = records[i].quantity;

    if (unitsByProduct[name] === undefined) {
      unitsByProduct[name] = 0;
    }
    unitsByProduct[name] = unitsByProduct[name] + qty;
  }

  // Find the product with the highest units
  var topName = "-";
  var topUnits = -1;

  for (var productName in unitsByProduct) {
    if (unitsByProduct[productName] > topUnits) {
      topUnits = unitsByProduct[productName];
      topName = productName;
    }
  }

  return topName;
}

// TODO [T5-08]: Find the best-selling category by total revenue
// across the provided records. Return the category name, or a dash
// if the set is empty.
function findTopCategory(records) {
  if (records.length === 0) {
    return "-";
  }

  // Sum revenue per category
  var revenueByCategory = {};

  for (var i = 0; i < records.length; i++) {
    var cat = records[i].category;
    var rev = records[i].quantity * records[i].price;

    if (revenueByCategory[cat] === undefined) {
      revenueByCategory[cat] = 0;
    }
    revenueByCategory[cat] = revenueByCategory[cat] + rev;
  }

  // Find the category with the highest revenue
  var topCat = "-";
  var topRev = -1;

  for (var categoryName in revenueByCategory) {
    if (revenueByCategory[categoryName] > topRev) {
      topRev = revenueByCategory[categoryName];
      topCat = categoryName;
    }
  }

  return topCat;
}

// TODO [T5-09]: Update all six KPI elements from the visible set.
// KPIs must recalculate against the filtered set, not the full
// dataset. Safe values when nothing matches: no NaN, no Infinity.
function renderKPIs(records) {
  if (records.length === 0) {
    els.kpiRevenue.textContent = "-";
    els.kpiOrders.textContent = "0";
    els.kpiUnits.textContent = "0";
    els.kpiAov.textContent = "-";
    els.kpiTopProduct.textContent = "-";
    els.kpiTopCategory.textContent = "-";
    return;
  }

  var totalRevenue = calcRevenue(records);
  var orderCount = records.length;
  var totalUnits = calcUnits(records);
  var averageOrderValue = totalRevenue / orderCount;

  els.kpiRevenue.textContent = formatMoney(totalRevenue);
  els.kpiOrders.textContent = String(orderCount);
  els.kpiUnits.textContent = String(totalUnits);
  els.kpiAov.textContent = formatMoney(averageOrderValue);
  els.kpiTopProduct.textContent = findTopProduct(records);
  els.kpiTopCategory.textContent = findTopCategory(records);
}

// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.innerHTML = "";

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var revenue = record.quantity * record.price;

    var row = document.createElement("tr");

    var cells = [
      record.date,
      record.product,
      record.category,
      String(record.quantity),
      formatMoney(record.price),
      formatMoney(revenue),
      record.region
    ];

    for (var j = 0; j < cells.length; j++) {
      var cell = document.createElement("td");
      cell.textContent = cells[j];
      row.appendChild(cell);
    }

    els.tableBody.appendChild(row);
  }

  // Show or hide empty state
  if (records.length === 0) {
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function updateView() {
  var visible = getVisible();
  renderKPIs(visible);
  renderTable(visible);
}

function populateCategoryDropdown() {
  // Collect unique categories from the dataset
  var categories = [];
  for (var i = 0; i < SALES.length; i++) {
    var cat = SALES[i].category;
    // Only add if not already in the list
    var alreadyThere = false;
    for (var j = 0; j < categories.length; j++) {
      if (categories[j] === cat) {
        alreadyThere = true;
        break;
      }
    }
    if (!alreadyThere) {
      categories.push(cat);
    }
  }

  // Sort categories alphabetically for nicer display
  categories.sort();

  // Add options (keep the existing "All categories" option)
  for (var k = 0; k < categories.length; k++) {
    var option = document.createElement("option");
    option.value = categories[k];
    option.textContent = categories[k];
    els.category.appendChild(option);
  }
}

function init() {
  // TODO [T5-11]: Populate the category dropdown from the dataset,
  // bind search, filter and sort controls, then perform the first
  // render.

  populateCategoryDropdown();

  // Live search
  els.search.addEventListener("input", function () {
    updateView();
  });

  // Category filter
  els.category.addEventListener("change", function () {
    updateView();
  });

  // Sort
  els.sort.addEventListener("change", function () {
    updateView();
  });

  // First render
  updateView();
}

document.addEventListener("DOMContentLoaded", init);
