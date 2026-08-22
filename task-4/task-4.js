/**
 * Skye8 JavaScript Practical Assessment
 * Task 4 - Product Search, Filter and Sort
 *
 * Starter file. Implement the functions marked TODO.
 * Do not rename the exported function names or the element ids: the
 * grading rubric references them directly.
 *
 * The PRODUCTS dataset is loaded from data.js. Do not mutate it.
 * sort() mutates: sort a copy.
 *
 * Maintainer: Engr. Lionel A.
 */
"use strict";
 
var els = {
  search: document.getElementById("product-search"),
  category: document.getElementById("category-filter"),
  price: document.getElementById("price-filter"),
  sort: document.getElementById("sort-select"),
  grid: document.getElementById("product-grid"),
  count: document.getElementById("product-count"),
  empty: document.getElementById("product-empty"),
};
 
// TODO [T4-01]: Filter the dataset by search term. Case insensitive,
// partial match on the product name. Return a new array.
function applySearch(products, term) {
  var trimmed = term.trim().toLowerCase();
 
  if (trimmed.length === 0) {
    return products;
  }
 
  var result = [];
  for (var i = 0; i < products.length; i++) {
    var name = products[i].name.toLowerCase();
    if (name.indexOf(trimmed) !== -1) {
      result.push(products[i]);
    }
  }
  return result;
}
 
// TODO [T4-02]: Filter the dataset by category and by price band.
// Return a new array. An empty category or price value means "all".
function applyFilters(products, category, priceBand) {
  var result = [];
 
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
 
    var matchesCategory = category === "" || product.category === category;
 
    var matchesPrice = true;
    if (priceBand !== "") {
      var parts = priceBand.split("-");
      var min = Number(parts[0]);
      var max = parts[1] === "" ? Infinity : Number(parts[1]);
      matchesPrice = product.price >= min && product.price <= max;
    }
 
    if (matchesCategory && matchesPrice) {
      result.push(product);
    }
  }
 
  return result;
}
 
// TODO [T4-03]: Sort a copy of the array by price ascending or
// descending. An empty sort value returns the array unchanged.
// Never mutate the input array.
function applySort(products, sortValue) {
  var copy = products.slice();
 
  if (sortValue === "price-asc") {
    copy.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortValue === "price-desc") {
    copy.sort(function (a, b) {
      return b.price - a.price;
    });
  }
 
  return copy;
}
 
// TODO [T4-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the
// filtered, sorted array.
function getVisible() {
  var term = els.search.value;
  var category = els.category.value;
  var priceBand = els.price.value;
  var sortValue = els.sort.value;
 
  var visible = PRODUCTS;
  visible = applySearch(visible, term);
  visible = applyFilters(visible, category, priceBand);
  visible = applySort(visible, sortValue);
 
  return visible;
}
 
// TODO [T4-05]: Render a single product card. Return a DOM element.
// No innerHTML concatenation of unescaped user input.
function createProductCard(product) {
  var card = document.createElement("article");
  card.className = "card";
 
  var name = document.createElement("h3");
  name.textContent = product.name;
 
  var category = document.createElement("p");
  category.textContent = product.category;
 
  var price = document.createElement("p");
  price.textContent = product.price.toLocaleString() + " XAF";
 
  card.appendChild(name);
  card.appendChild(category);
  card.appendChild(price);
 
  return card;
}
 
// TODO [T4-06]: Render the product grid from the visible set.
// Clear it first.
function renderProducts(products) {
  els.grid.innerHTML = "";
 
  for (var i = 0; i < products.length; i++) {
    var card = createProductCard(products[i]);
    els.grid.appendChild(card);
  }
}
 
// TODO [T4-07]: Update the visible count display.
function renderCount(count) {
  els.count.textContent = String(count);
}
 
// TODO [T4-08]: Toggle the empty state based on visible products.
function renderEmptyState(count) {
  if (count === 0) {
    els.empty.style.display = "block";
  } else {
    els.empty.style.display = "none";
  }
}
 
function init() {
  // TODO [T4-09]: Bind search, filter and sort controls, then
  // perform the first render.
 
  els.search.addEventListener("input", function () {
    var visible = getVisible();
    renderProducts(visible);
    renderCount(visible.length);
    renderEmptyState(visible.length);
  });
 
  els.category.addEventListener("change", function () {
    var visible = getVisible();
    renderProducts(visible);
    renderCount(visible.length);
    renderEmptyState(visible.length);
  });
 
  els.price.addEventListener("change", function () {
    var visible = getVisible();
    renderProducts(visible);
    renderCount(visible.length);
    renderEmptyState(visible.length);
  });
 
  els.sort.addEventListener("change", function () {
    var visible = getVisible();
    renderProducts(visible);
    renderCount(visible.length);
    renderEmptyState(visible.length);
  });
 
  // First render, using the default (empty) control values.
  var visible = getVisible();
  renderProducts(visible);
  renderCount(visible.length);
  renderEmptyState(visible.length);
}
 
document.addEventListener("DOMContentLoaded", init);
 