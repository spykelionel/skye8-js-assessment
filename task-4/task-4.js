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
  if (!term.trim()) return products;
  var lower = term.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(lower));
}

// TODO [T4-02]: Filter the dataset by category and by price band.
// Return a new array. An empty category or price value means "all".
function applyFilters(products, category, priceBand) {
  var filtered = products;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (priceBand) {
    var [min, max] = priceBand.split("-");
    filtered = filtered.filter((p) => {
      if (max === "") return p.price >= Number(min); // Over 500k
      if (min === "0") return p.price < 50000;
      return p.price >= Number(min) && p.price <= Number(max);
    });
  }
  return filtered;
}

// TODO [T4-03]: Sort a copy of the array by price ascending or
// descending. An empty sort value returns the array unchanged.
// Never mutate the input array.
function applySort(products, sortValue) {
  var copy = [...products];
  if (sortValue === "price-asc") return copy.sort((a, b) => a.price - b.price);
  if (sortValue === "price-desc") return copy.sort((a, b) => b.price - a.price);
  return copy;
}

// TODO [T4-04]: Compose search, filter and sort into a single
// pipeline. Read the current control values and return the
// filtered, sorted array.
function getVisible() {
  var searched = applySearch(PRODUCTS, els.search.value);
  var filtered = applyFilters(searched, els.category.value, els.price.value);
  return applySort(filtered, els.sort.value);
}

// TODO [T4-05]: Render a single product card. Return a DOM element.
// No innerHTML concatenation of unescaped user input.
function createProductCard(product) {
  var card = document.createElement("article");
  card.className = "card product-card";
  var name = document.createElement("h3");
  name.textContent = product.name;
  var cat = document.createElement("p");
  cat.textContent = product.category;
  var price = document.createElement("p");
  price.className = "product-price";
  price.textContent = product.price.toLocaleString() + " XAF";
  var stock = document.createElement("span");
  stock.textContent = product.inStock ? "In stock" : "Out of stock";
  card.append(name, cat, price, stock);
  return card;
}

// TODO [T4-06]: Render the product grid from the visible set.
// Clear it first.
function renderProducts(products) {
  els.grid.innerHTML = "";
  products.forEach((p) => els.grid.appendChild(createProductCard(p)));
}

// TODO [T4-07]: Update the visible count display.
function renderCount(count) {
  els.count.textContent = count;
}

// TODO [T4-08]: Toggle the empty state based on visible products.
function renderEmptyState(count) {
  els.empty.style.display = count === 0 ? "block" : "none";
  els.grid.style.display = count === 0 ? "none" : "grid";
}
function render() {
  var visible = getVisible();
  renderProducts(visible);
  renderCount(visible.length);
  renderEmptyState(visible.length);
}

// TODO [T4-09]: Bind search, filter and sort controls, then
// perform the first render.
function init() {
  els.search.addEventListener("input", render);
  els.category.addEventListener("change", render);
  els.price.addEventListener("change", render);
  els.sort.addEventListener("change", render);
  render(); //Show all 18 on load
}

document.addEventListener("DOMContentLoaded", init);
