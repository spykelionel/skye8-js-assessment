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
  if (!term.trim()) return records;
  var lower = term.toLowerCase();
  return records.filter((r) => r.product.toLowerCase().includes(lower));
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  if (!category) return records;
  return records.filter((r) => r.category === category);
}

// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  var copy = [...records];
  if (sortValue === "revenue-desc")
    return copy.sort((a, b) => b.quantity * b.price - a.quantity * a.price);
  if (sortValue === "revenue-asc")
    return copy.sort((a, b) => a.quantity * a.price - b.quantity * b.price);
  if (sortValue === "date-desc") return copy.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortValue === "date-asc") return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortValue === "quantity-desc") return copy.sort((a, b) => b.quantity - a.quantity);
  return copy;
}

// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  var searched = applySearch(SALES, els.search.value);
  var filtered = applyFilters(searched, els.category.value);
  return applySort(filtered, els.sort.value);
}

// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {
  return 0;
}

// TODO [T5-06]: Calculate total units sold from a set of records.
function calcUnits(records) {
  return records.reduce((sum, r) => sum + r.quantity, 0);
}

// TODO [T5-07]: Find the best-selling product by total units across
// the provided records. Return the product name, or a dash if the
// set is empty.
function findTopProduct(records) {
  if (records.length === 0) return "-";
  var map = {};
  records.forEach((r) => {
    map[r.product] = (map[r.product] || 0) + r.quantity;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];
}

// TODO [T5-08]: Find the best-selling category by total revenue
// across the provided records. Return the category name, or a dash
// if the set is empty.
function findTopCategory(records) {
  if (records.length === 0) return "-";
  var map = {};
  records.forEach((r) => {
    map[r.category] = (map[r.category] || 0) + r.quantity * r.price;
  });
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0][0];
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
  var revenue = calcRevenue(records);
  var units = calcUnits(records);
  var orders = records.length;
  var aov = revenue / orders;

  els.kpiRevenue.textContent = revenue.toLocaleString() + " XAF";
  els.kpiOrders.textContent = orders;
  els.kpiUnits.textContent = units;
  els.kpiAov.textContent = Math.round(aov).toLocaleString() + " XAF";
  els.kpiTopProduct.textContent = findTopProduct(records);
  els.kpiTopCategory.textContent = findTopCategory(records);
}

// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.innerHTML = "";
  records.forEach((r) => {
    var tr = document.createElement("tr");
    var rev = r.quantity * r.price;
    // use textContent only
    [
      r.date,
      r.product,
      r.category,
      r.quantity,
      r.price.toLocaleString() + " XAF",
      rev.toLocaleString() + " XAF",
      r.region,
    ].forEach((val) => {
      var td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });
    els.tableBody.appendChild(tr);
  });
  els.empty.style.display = records.length === 0 ? "block" : "none";
}

function render() {
  var visible = getVisible();
  renderKPIs(visible);
  renderTable(visible);
}

// TODO [T5-11]: Populate the category dropdown from the dataset,
// bind search, filter and sort controls, then perform the first
// render.
function init() {
  // populate category dropdown from dataset
  var cats = [...new Set(SALES.map((s) => s.category))].sort();
  cats.forEach((c) => {
    var opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    els.category.appendChild(opt);
  });

  els.search.addEventListener("input", render);
  els.category.addEventListener("change", render);
  els.sort.addEventListener("change", render);

  render(); // 30 records on load
}

document.addEventListener("DOMContentLoaded", init);
