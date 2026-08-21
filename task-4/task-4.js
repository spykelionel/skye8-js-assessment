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
    return products;
  }

  var searchTerm = term.trim().toLowerCase();
  var result = [];

  for (var i = 0; i < products.length; i++) {
    var productName = products[i].name.toLowerCase();
    // Partial match: if the name contains the search term
    if (productName.indexOf(searchTerm) !== -1) {
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
    var keep = true;

    // Category filter
    if (category && category !== "") {
      if (product.category !== category) {
        keep = false;
      }
    }

    // Price band filter
    if (keep && priceBand && priceBand !== "") {
      var price = product.price;

      if (priceBand === "0-50000") {
        if (price >= 50000) {
          keep = false;
        }
      } else if (priceBand === "50000-150000") {
        if (price < 50000 || price > 150000) {
          keep = false;
        }
      } else if (priceBand === "150000-500000") {
        if (price < 150000 || price > 500000) {
          keep = false;
        }
      } else if (priceBand === "500000-") {
        if (price <= 500000) {
          keep = false;
        }
      }
    }

    if (keep) {
      result.push(product);
    }
  }
  return result;
}

// TODO [T4-03]: Sort a copy of the array by price ascending or
// descending. An empty sort value returns the array unchanged.
// Never mutate the input array.
function applySort(products, sortValue) {
  if (!sortValue || sortValue === "") {
    return products;
  }

  // Make a copy so we do not change the original
  var copy = [];
  for (var i = 0; i < products.length; i++) {
    copy.push(products[i]);
  }

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
  var searchTerm = els.search.value;
  var categoryValue = els.category.value;
  var priceValue = els.price.value;
  var sortValue = els.sort.value;

  // Start with the full dataset (do not mutate PRODUCTS)
  var result = PRODUCTS;

  // Apply search
  result = applySearch(result, searchTerm);

  // Apply filters
  result = applyFilters(result, categoryValue, priceValue);

  // Apply sort
  result = applySort(result, sortValue);

  return result;
}

// TODO [T4-05]: Render a single product card. Return a DOM element.
// No innerHTML concatenation of unescaped user input.
function createProductCard(product) {
  var card = document.createElement("article");
  card.className = "card";

  // Product name
  var title = document.createElement("h3");
  title.textContent = product.name;
  card.appendChild(title);

  // Category
  var categoryEl = document.createElement("p");
  categoryEl.textContent = "Category: " + product.category;
  card.appendChild(categoryEl);

  // Price
  var priceEl = document.createElement("p");
  priceEl.textContent = "Price: " + product.price.toLocaleString() + " XAF";
  card.appendChild(priceEl);

  // Rating
  var ratingEl = document.createElement("p");
  ratingEl.textContent = "Rating: " + product.rating;
  card.appendChild(ratingEl);

  // Stock status
  var stockEl = document.createElement("p");
  if (product.inStock) {
    stockEl.textContent = "In stock";
  } else {
    stockEl.textContent = "Out of stock";
  }
  card.appendChild(stockEl);

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
    els.empty.hidden = false;
  } else {
    els.empty.hidden = true;
  }
}

function updateView() {
  var visible = getVisible();
  renderProducts(visible);
  renderCount(visible.length);
  renderEmptyState(visible.length);
}

function init() {
  // TODO [T4-09]: Bind search, filter and sort controls, then
  // perform the first render.

  // Live search as the user types
  els.search.addEventListener("input", function () {
    updateView();
  });

  // Category change
  els.category.addEventListener("change", function () {
    updateView();
  });

  // Price change
  els.price.addEventListener("change", function () {
    updateView();
  });

  // Sort change
  els.sort.addEventListener("change", function () {
    updateView();
  });

  // First render
  updateView();
}

document.addEventListener("DOMContentLoaded", init);
