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

// Helper: format money nicely (e.g. $1,234.56)
function formatMoney(value) {
  return "$" + Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// TODO [T5-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(records, term) {
  // If the search box is empty, just return everything
  if (!term || term.trim() === "") {
    return records.slice(); // return a copy
  }

  var searchTerm = term.trim().toLowerCase();

  // Keep only records whose product name contains the search term
  return records.filter(function (record) {
    return record.product.toLowerCase().includes(searchTerm);
  });
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  // Empty string means "show all categories"
  if (!category || category === "") {
    return records.slice();
  }

  return records.filter(function (record) {
    return record.category === category;
  });
}

// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  // Always work on a copy so we never change the original data
  var copy = records.slice();

  if (!sortValue || sortValue === "") {
    return copy;
  }

  // sortValue examples that are common in these assessments:
  // "revenue-desc", "revenue-asc", "units-desc", "units-asc",
  // "product-asc", "product-desc", "price-desc", etc.
  copy.sort(function (a, b) {
    var aRevenue = a.quantity * a.price;
    var bRevenue = b.quantity * b.price;

    switch (sortValue) {
      case "revenue-desc":
        return bRevenue - aRevenue;
      case "revenue-asc":
        return aRevenue - bRevenue;
      case "units-desc":
        return b.quantity - a.quantity;
      case "units-asc":
        return a.quantity - b.quantity;
      case "product-asc":
        return a.product.localeCompare(b.product);
      case "product-desc":
        return b.product.localeCompare(a.product);
      case "price-desc":
        return b.price - a.price;
      case "price-asc":
        return a.price - b.price;
      case "category-asc":
        return a.category.localeCompare(b.category);
      case "category-desc":
        return b.category.localeCompare(a.category);
      default:
        return 0; // unknown value → leave order as-is
    }
  });

  return copy;
}

// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  var term = els.search.value;
  var category = els.category.value;
  var sortValue = els.sort.value;

  // Pipeline: start with full data → search → filter → sort
  var result = SALES;                 // original data (never mutate)
  result = applySearch(result, term);
  result = applyFilters(result, category);
  result = applySort(result, sortValue);

  return result;
}

/// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {
  return records.reduce(function (total, record) {
    return total + (record.quantity * record.price);
  }, 0);cffvt5g
}

// TODO [T5-06]: Calculate total units sold from a set of records.
function calcUnits(records) {
  return records.reduce(function (total, record) {
    return total + record.quantity;
  }, 0);
}

// TODO [T5-07]: Find the best-selling product by total units across
// the provided records. Return the product name, or a dash if the
// set is empty.
function findTopProduct(records) {
  if (records.length === 0) {
    return "-";
  }

  // Count total units for each product
  var unitsByProduct = {};

  records.forEach(function (record) {
    var name = record.product;
    if (!unitsByProduct[name]) {
      unitsByProduct[name] = 0;
    }
    unitsByProduct[name] += record.quantity;
  });

  // Find the product with the highest unit count
  var topName = "-";
  var maxUnits = -1;

  for (var name in unitsByProduct) {
    if (unitsByProduct[name] > maxUnits) {
      maxUnits = unitsByProduct[name];
      topName = name;
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

  // Sum revenue for each category
  var revenueByCategory = {};

  records.forEach(function (record) {
    var cat = record.category;
    var revenue = record.quantity * record.price;
    if (!revenueByCategory[cat]) {
      revenueByCategory[cat] = 0;
    }
    revenueByCategory[cat] += revenue;
  });

  // Find the category with the highest revenue
  var topCat = "-";
  var maxRev = -1;

  for (var cat in revenueByCategory) {
    if (revenueByCategory[cat] > maxRev) {
      maxRev = revenueByCategory[cat];
      topCat = cat;
    }
  }

  return topCat;
}

// TODO [T5-09]: Update all six KPI elements from the visible set.
// KPIs must recalculate against the filtered set, not the full
// dataset. Safe values when nothing matches: no NaN, no Infinity.
function renderKPIs(records) {}

// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {}

function init() {
  // TODO [T5-11]: Populate the category dropdown from the dataset,
  // bind search, filter and sort controls, then perform the first
  // render.
}

document.addEventListener("DOMContentLoaded", init);
