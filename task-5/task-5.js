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
  var searchTerm = term.trim().toLowerCase();

  if (searchTerm === "") {
    return records.slice();
  }

  return records.filter(function (record) {
    return record.product.toLowerCase().includes(searchTerm);
  });
}

// TODO [T5-02]: Filter the dataset by category. An empty value means
// "all". Return a new array.
function applyFilters(records, category) {
  return records.filter(function (record) {
    return category === "" || record.category === category;
  });
}
// TODO [T5-03]: Sort a copy of the array by the selected criterion.
// An empty sort value returns the array unchanged. Never mutate the
// input array.
function applySort(records, sortValue) {
  var sortedRecords = records.slice();

  if (sortValue === "revenue-asc") {
    sortedRecords.sort(function (a, b) {
      return (a.quantity * a.price) - (b.quantity * b.price);
    });
  }

  if (sortValue === "revenue-desc") {
    sortedRecords.sort(function (a, b) {
      return (b.quantity * b.price) - (a.quantity * a.price);
    });
  }

  if (sortValue === "units-asc") {
    sortedRecords.sort(function (a, b) {
      return a.quantity - b.quantity;
    });
  }

  if (sortValue === "units-desc") {
    sortedRecords.sort(function (a, b) {
      return b.quantity - a.quantity;
    });
  }

  if (sortValue === "product-asc") {
    sortedRecords.sort(function (a, b) {
      return a.product.localeCompare(b.product);
    });
  }

  if (sortValue === "product-desc") {
    sortedRecords.sort(function (a, b) {
      return b.product.localeCompare(a.product);
    });
  }

  return sortedRecords;
}
// TODO [T5-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the filtered,
// sorted array.
function getVisible() {
  var records = applySearch(
    SALES,
    els.search.value
  );

  records = applyFilters(
    records,
    els.category.value
  );

  records = applySort(
    records,
    els.sort.value
  );

  return records;
}

// TODO [T5-05]: Calculate total revenue from a set of records.
// Revenue for a record is quantity * price.
function calcRevenue(records) {
  return records.reduce(function (total, record) {
    return total + (record.quantity * record.price);
  }, 0);
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

  var productUnits = {};

  records.forEach(function (record) {
    if (!productUnits[record.product]) {
      productUnits[record.product] = 0;
    }

    productUnits[record.product] += record.quantity;
  });

  var topProduct = "-";
  var highestUnits = 0;

  Object.keys(productUnits).forEach(function (product) {
    if (productUnits[product] > highestUnits) {
      highestUnits = productUnits[product];
      topProduct = product;
    }
  });

  return topProduct;
}

// TODO [T5-08]: Find the best-selling category by total revenue
// across the provided records. Return the category name, or a dash
// if the set is empty.
function findTopCategory(records) {
  if (records.length === 0) {
    return "-";
  }

  var categoryRevenue = {};

  records.forEach(function (record) {
    if (!categoryRevenue[record.category]) {
      categoryRevenue[record.category] = 0;
    }

    categoryRevenue[record.category] += record.quantity * record.price;
  });

  var topCategory = "-";
  var highestRevenue = 0;

  Object.keys(categoryRevenue).forEach(function (category) {
    if (categoryRevenue[category] > highestRevenue) {
      highestRevenue = categoryRevenue[category];
      topCategory = category;
    }
  });

  return topCategory;
}

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

  els.kpiRevenue.textContent = revenue.toLocaleString() + " XAF";
  els.kpiOrders.textContent = orders;
  els.kpiUnits.textContent = units;
  els.kpiAov.textContent = aov.toLocaleString() + " XAF";
  els.kpiTopProduct.textContent = findTopProduct(records);
  els.kpiTopCategory.textContent = findTopCategory(records);
}

// TODO [T5-10]: Build the table rows from the visible set. Clear
// the table body first. No innerHTML concatenation of unescaped
// user input.
function renderTable(records) {
  els.tableBody.replaceChildren();

  records.forEach(function (record) {
    var row = document.createElement("tr");

    var dateCell = document.createElement("td");
    dateCell.textContent = record.date;

    var productCell = document.createElement("td");
    productCell.textContent = record.product;

    var categoryCell = document.createElement("td");
    categoryCell.textContent = record.category;

    var quantityCell = document.createElement("td");
    quantityCell.textContent = record.quantity;

    var priceCell = document.createElement("td");
    priceCell.textContent = record.price.toLocaleString() + " XAF";

    var revenueCell = document.createElement("td");
    revenueCell.textContent =
      (record.quantity * record.price).toLocaleString() + " XAF";

    row.appendChild(dateCell);
    row.appendChild(productCell);
    row.appendChild(categoryCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(revenueCell);

    els.tableBody.appendChild(row);
  });
}

function init() {
  // TODO [T5-11]: Populate the category dropdown from the dataset,
  // bind search, filter and sort controls, then perform the first
  // render.
  function init() {
  var categories = [];

  SALES.forEach(function (record) {
    if (!categories.includes(record.category)) {
      categories.push(record.category);
    }
  });

  categories.sort();

  categories.forEach(function (category) {
    var option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    els.category.appendChild(option);
  });

  function updateDashboard() {
    var visibleRecords = getVisible();

    renderKPIs(visibleRecords);
    renderTable(visibleRecords);

    els.empty.hidden = visibleRecords.length !== 0;
  }

  els.search.addEventListener("input", updateDashboard);

  els.category.addEventListener("change", updateDashboard);

  els.sort.addEventListener("change", updateDashboard);

  updateDashboard();
}
}

document.addEventListener("DOMContentLoaded", init);
