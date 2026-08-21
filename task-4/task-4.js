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
  if (!term || term.trim() === "") {
    return products.slice();
  }
  var lower = term.trim().toLowerCase();
  return products.filter(function (p) {
    return p.name.toLowerCase().indexOf(lower) !== -1;
  });
}

// TODO [T4-02]: Filter the dataset by category and by price band.
// Return a new array. An empty category or price value means "all".
function applyFilters(products, category, priceBand) {
  return products.filter(function (p) {
    if (category && p.category !== category) {
      return false;
    }
    if (priceBand) {
      var parts = priceBand.split("-");
      var min = parts[0] === "" ? 0 : Number(parts[0]);
      var max = parts[1] === "" ? Infinity : Number(parts[1]);
      if (p.price < min || p.price > max) {
        return false;
      }
    }
    return true;
  });
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

  var result = applySearch(PRODUCTS, term);
  result = applyFilters(result, category, priceBand);
  result = applySort(result, sortValue);
  return result;
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

  var rating = document.createElement("p");
  rating.textContent = "Rating: " + product.rating;

  var stock = document.createElement("p");
  stock.textContent = product.inStock ? "In stock" : "Out of stock";

  card.appendChild(name);
  card.appendChild(category);
  card.appendChild(price);
  card.appendChild(rating);
  card.appendChild(stock);

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
