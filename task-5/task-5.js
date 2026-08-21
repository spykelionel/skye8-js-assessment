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
 
// commit: add els lookup, start T5-01 applySearch
 
// TODO [T5-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(records, term) {
  var trimmed = term.trim().toLowerCase();
 
  if (trimmed.length === 0) {
    return records;
  }
 
  var result = [];
  for (var i = 0; i < records.length; i++) {
    var name = records[i].product.toLowerCase();
    if (name.indexOf(trimmed) !== -1) {
      result.push(records[i]);
    }
  }
  return result;
}
 
// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  if (category === "") {
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
 
// commit: finish T5-01 and T5-02, start T5-03 applySort
 
// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  var copy = records.slice();
 
  if (sortValue === "revenue-desc") {
    copy.sort(function (a, b) {
      return (b.quantity * b.price) - (a.quantity * a.price);
    });
  } else if (sortValue === "revenue-asc") {
    copy.sort(function (a, b) {
      return (a.quantity * a.price) - (b.quantity * b.price);
    });
  } else if (sortValue === "date-desc") {
    copy.sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  } else if (sortValue === "date-asc") {
    copy.sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
  } else if (sortValue === "units-desc") {
    copy.sort(function (a, b) {
      return b.quantity - a.quantity;
    });
  } else if (sortValue === "units-asc") {
    copy.sort(function (a, b) {
      return a.quantity - b.quantity;
    });
  }
 
  return copy;
}
 
// commit: T5-03 sort criteria done, start T5-04 getVisible pipeline
 
// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  var term = els.search.value;
  var category = els.category.value;
  var sortValue = els.sort.value;
 
  var visible = SALES;
  visible = applySearch(visible, term);
  visible = applyFilters(visible, category);
  visible = applySort(visible, sortValue);
 
  return visible;
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
 
// commit: T5-04 pipeline done, T5-05 revenue derived, start T5-06 units
 
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
    if (unitsByProduct[name] === undefined) {
      unitsByProduct[name] = 0;
    }
    unitsByProduct[name] = unitsByProduct[name] + records[i].quantity;
  }
 
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
 
// commit: T5-06 units done, T5-07 top product tally done, start T5-08
 
// TODO [T5-08]: Find the best-selling category by total revenue
// across the provided records. Return the category name, or a dash
// if the set is empty.
function findTopCategory(records) {
  if (records.length === 0) {
    return "-";
  }
 
  var revenueByCategory = {};
  for (var i = 0; i < records.length; i++) {
    var category = records[i].category;
    var revenue = records[i].quantity * records[i].price;
    if (revenueByCategory[category] === undefined) {
      revenueByCategory[category] = 0;
    }
    revenueByCategory[category] = revenueByCategory[category] + revenue;
  }
 
  var topName = "-";
  var topRevenue = -1;
  for (var categoryName in revenueByCategory) {
    if (revenueByCategory[categoryName] > topRevenue) {
      topRevenue = revenueByCategory[categoryName];
      topName = categoryName;
    }
  }
 
  return topName;
}
 
// commit: T5-08 top category done, start T5-09 renderKPIs
 
// TODO [T5-09]: Update all six KPI elements from the visible set.
// KPIs must recalculate against the filtered set, not the full
// dataset. Safe values when nothing matches: no NaN, no Infinity.
function renderKPIs(records) {
  var revenue = calcRevenue(records);
  var orders = records.length;
  var units = calcUnits(records);
 
  var aov = 0;
  if (orders > 0) {
    aov = revenue / orders;
  }
 
  var topProduct = findTopProduct(records);
  var topCategory = findTopCategory(records);
 
  els.kpiRevenue.textContent = revenue.toLocaleString() + " XAF";
  els.kpiOrders.textContent = String(orders);
  els.kpiUnits.textContent = String(units);
  els.kpiAov.textContent = Math.round(aov).toLocaleString() + " XAF";
  els.kpiTopProduct.textContent = topProduct;
  els.kpiTopCategory.textContent = topCategory;
}
 
// commit: T5-09 KPIs rendered with divide-by-zero guard, start T5-10 table
 
// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.innerHTML = "";
 
  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var revenue = record.quantity * record.price;
 
    var row = document.createElement("tr");
 
    var productCell = document.createElement("td");
    productCell.textContent = record.product;
 
    var categoryCell = document.createElement("td");
    categoryCell.textContent = record.category;
 
    var quantityCell = document.createElement("td");
    quantityCell.textContent = String(record.quantity);
 
    var priceCell = document.createElement("td");
    priceCell.textContent = record.price.toLocaleString() + " XAF";
 
    var revenueCell = document.createElement("td");
    revenueCell.textContent = revenue.toLocaleString() + " XAF";
 
    var dateCell = document.createElement("td");
    dateCell.textContent = record.date;
 
    var regionCell = document.createElement("td");
    regionCell.textContent = record.region;
 
    row.appendChild(productCell);
    row.appendChild(categoryCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(revenueCell);
    row.appendChild(dateCell);
    row.appendChild(regionCell);
 
    els.tableBody.appendChild(row);
  }
 
  if (records.length === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}
 
// commit: T5-10 table rows + empty state toggle done, start T5-11 init
 
function init() {
  // TODO [T5-11]: Populate the category dropdown from the dataset,
  // bind search, filter and sort controls, then perform the first
  // render.
 
  var categories = [];
  for (var i = 0; i < SALES.length; i++) {
    var category = SALES[i].category;
    if (categories.indexOf(category) === -1) {
      categories.push(category);
    }
  }
 
  for (var j = 0; j < categories.length; j++) {
    var option = document.createElement("option");
    option.value = categories[j];
    option.textContent = categories[j];
    els.category.appendChild(option);
  }
 
  els.search.addEventListener("input", function () {
    var visible = getVisible();
    renderTable(visible);
    renderKPIs(visible);
  });
 
  els.category.addEventListener("change", function () {
    var visible = getVisible();
    renderTable(visible);
    renderKPIs(visible);
  });
 
  els.sort.addEventListener("change", function () {
    var visible = getVisible();
    renderTable(visible);
    renderKPIs(visible);
  });
 
  var visible = getVisible();
  renderTable(visible);
  renderKPIs(visible);
}
 
// commit: T5-11 category dropdown + control bindings + first render done
 
document.addEventListener("DOMContentLoaded", init);
 