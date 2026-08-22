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

// TODO [T5-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(records, term) {
  if (!term || term.trim() === "") {
    return records.slice();
  }
  var lower = term.trim().toLowerCase();
  return records.filter(function (r) {
    return r.product.toLowerCase().indexOf(lower) !== -1;
  });
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  if (!category) {
    return records.slice();
  }
  return records.filter(function (r) {
    return r.category === category;
  });
}

// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  var copy = records.slice();
  if (sortValue === "revenue-desc") {
    copy.sort(function (a, b) {
      return b.quantity * b.price - a.quantity * a.price;
    });
  } else if (sortValue === "revenue-asc") {
    copy.sort(function (a, b) {
      return a.quantity * a.price - b.quantity * b.price;
    });
  } else if (sortValue === "date-desc") {
    copy.sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
  } else if (sortValue === "date-asc") {
    copy.sort(function (a, b) {
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
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
  var term = els.search.value;
  var category = els.category.value;
  var sortValue = els.sort.value;

  var result = applySearch(SALES, term);
  result = applyFilters(result, category);
  result = applySort(result, sortValue);
  return result;
}

// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {
  var total = 0;
  for (var i = 0; i < records.length; i++) {
    total = total + records[i].quantity * records[i].price;
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
  var unitsByProduct = {};
  for (var i = 0; i < records.length; i++) {
    var name = records[i].product;
    unitsByProduct[name] = (unitsByProduct[name] || 0) + records[i].quantity;
  }
  var topName = "-";
  var topUnits = -1;
  for (var product in unitsByProduct) {
    if (unitsByProduct[product] > topUnits) {
      topUnits = unitsByProduct[product];
      topName = product;
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
  var revenueByCategory = {};
  for (var i = 0; i < records.length; i++) {
    var cat = records[i].category;
    var rev = records[i].quantity * records[i].price;
    revenueByCategory[cat] = (revenueByCategory[cat] || 0) + rev;
  }
  var topCat = "-";
  var topRev = -1;
  for (var category in revenueByCategory) {
    if (revenueByCategory[category] > topRev) {
      topRev = revenueByCategory[category];
      topCat = category;
    }
  }
  return topCat;
}

// TODO [T5-09]: Update all six KPI elements from the visible set.
// KPIs must recalculate against the filtered set, not the full
// dataset. Safe values when nothing matches: no NaN, no Infinity.
function renderKPIs(records) {
  var revenue = calcRevenue(records);
  var orders = records.length;
  var units = calcUnits(records);
  var aov = orders === 0 ? 0 : revenue / orders;

  els.kpiRevenue.textContent = revenue.toLocaleString() + " XAF";
  els.kpiOrders.textContent = String(orders);
  els.kpiUnits.textContent = String(units);
  els.kpiAov.textContent = orders === 0 ? "-" : aov.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " XAF";
  els.kpiTopProduct.textContent = findTopProduct(records);
  els.kpiTopCategory.textContent = findTopCategory(records);
}

// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.innerHTML = "";

  if (records.length === 0) {
    els.empty.hidden = false;
    return;
  }
  els.empty.hidden = true;

  for (var i = 0; i < records.length; i++) {
    var r = records[i];
    var tr = document.createElement("tr");

    var cells = [
      r.date,
      r.product,
      r.category,
      String(r.quantity),
      r.price.toLocaleString() + " XAF",
      (r.quantity * r.price).toLocaleString() + " XAF",
      r.region,
    ];

    for (var j = 0; j < cells.length; j++) {
      var td = document.createElement("td");
      td.textContent = cells[j];
      tr.appendChild(td);
    }

    els.tableBody.appendChild(tr);
  }
}
function update() {
  var visible = getVisible();
  renderKPIs(visible);
  renderTable(visible);
}

function init() {
  // Populate category dropdown from the dataset
  // Bind events
  // First render
  var seen = {};
  for (var i = 0; i < SALES.length; i++) {
    seen[SALES[i].category] = true;
  }
  var categories = Object.keys(seen).sort();
  for (var j = 0; j < categories.length; j++) {
    var opt = document.createElement("option");
    opt.value = categories[j];
    opt.textContent = categories[j];
    els.category.appendChild(opt);
  }

  els.search.addEventListener("input", update);
  els.category.addEventListener("change", update);
  els.sort.addEventListener("change", update);

  update();
}

document.addEventListener("DOMContentLoaded", init);
