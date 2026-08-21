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
  if (!term || typeof term !== "string") {
    return products.slice();
  }
  var cleanTerm = term.trim().toLowerCase();
  if (!cleanTerm) {
    return products.slice();
  }

  return products.filter(function (product) {
    return product.name.toLowerCase().indexOf(cleanTerm) !== -1;
  });

// [T4-02]: Filter the dataset by category and by price band.
// Return a new array. An empty category or price value means "all".
function applyFilters(products, category, priceBand) {
  var result = products.slice();

  // Apply Category Filter
  if (category && category.trim() !== "") {
    result = result.filter(function (product) {
      return product.category === category;
    });
  }

  // Apply Price Band Filter
  if (priceBand && priceBand.trim() !== "") {
    var parts = priceBand.split("-");
    var min = parseFloat(parts[0]) || 0;
    var max = parts[1] !== "" && parts[1] !== undefined ? parseFloat(parts[1]) : Infinity;

    result = result.filter(function (product) {
      return product.price >= min && product.price <= max;
    });
  }

  return result;
}

// [T4-03]: Sort a copy of the array by price ascending or
// descending. An empty sort value returns the array unchanged.
// Never mutate the input array.
function applySort(products, sortValue) {
  var sortedCopy = products.slice();

  if (sortValue === "price-asc") {
    sortedCopy.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sortValue === "price-desc") {
    sortedCopy.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return sortedCopy;
}
// [T4-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the
// filtered, sorted array.
function getVisible() {
  var rawDataset = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
  var term = els.search ? els.search.value : "";
  var category = els.category ? els.category.value : "";
  var priceBand = els.price ? els.price.value : "";
  var sortValue = els.sort ? els.sort.value : "";

  // Pipeline Execution
  var searched = applySearch(rawDataset, term);
  var filtered = applyFilters(searched, category, priceBand);
  var sorted = applySort(filtered, sortValue);

  return sorted;
}

// [T4-05]: Render a single product card. Return a DOM element.
// No innerHTML concatenation of unescaped user input.
function createProductCard(product) {
  var card = document.createElement("article");
  card.className = "card product-card";
  card.dataset.id = product.id;

  var badge = document.createElement("span");
  badge.className = "product-card__badge " + (product.inStock ? "badge--success" : "badge--warning");
  badge.textContent = product.inStock ? "In Stock" : "Out of Stock";

  var category = document.createElement("span");
  category.className = "product-card__category";
  category.textContent = product.category;

  var title = document.createElement("h3");
  title.className = "product-card__title";
  title.textContent = product.name;

  var meta = document.createElement("div");
  meta.className = "product-card__meta";

  var price = document.createElement("span");
  price.className = "product-card__price";
  price.textContent = product.price.toLocaleString("en-US") + " XAF";

  var rating = document.createElement("span");
  rating.className = "product-card__rating";
  rating.textContent = "★ " + product.rating.toFixed(1);

  meta.appendChild(price);
  meta.appendChild(rating);

  card.appendChild(badge);
  card.appendChild(category);
  card.appendChild(title);
  card.appendChild(meta);

  return card;
}
// TODO [T4-06]: Render the product grid from the visible set.
// Clear it first.
function renderProducts(products) {}

// TODO [T4-07]: Update the visible count display.
function renderCount(count) {}

// TODO [T4-08]: Toggle the empty state based on visible products.
function renderEmptyState(count) {}

function init() {
  // TODO [T4-09]: Bind search, filter and sort controls, then
  // perform the first render.
}

document.addEventListener("DOMContentLoaded", init);
