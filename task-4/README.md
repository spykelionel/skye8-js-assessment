# Task 4 - Product Search, Filter and Sort

## Objective

Build a product catalogue that transforms a product dataset through
composable search, filter and sort operations.

## What you are building

A product grid rendered from the provided dataset. The user can search by
name, filter by category, filter by price band and sort by price. All
controls compose: applying one does not reset the others. A live count
shows visible products, and a distinct empty state appears when nothing
matches.

## Required features

- [ ] Render product cards from the PRODUCTS dataset
- [ ] Search by name, case insensitive, partial match, live update
- [ ] Filter by category with an All categories option
- [ ] Filter by price band
- [ ] Sort by price ascending and descending
- [ ] All controls compose without resetting each other
- [ ] Display a live count of visible products
- [ ] Show a distinct empty state for no matches
- [ ] Never mutate the source dataset

## JavaScript concepts assessed

Array methods (map, filter, sort), function composition, DOM rendering,
event handling, defensive copying.

## Provided for you

- `index.html` with toolbar controls, grid container and empty state
- Element ids: `product-search`, `category-filter`, `price-filter`,
  `sort-select`, `product-grid`, `product-count`, `product-empty`
- `data.js` with 18 products across 6 categories
- `task-4.js` with function stubs and TODO markers
- The shared design system in `assets/css/style.css`

## What you must not do

- Hardcode product cards in HTML
- Mutate the PRODUCTS array (sort mutates: sort a copy)
- Let one control reset another
- Use innerHTML with unescaped user input
- Add a framework or external dependency

## Definition of done

- [ ] All nine TODO markers implemented
- [ ] All 18 products render on load
- [ ] Search, filter and sort compose correctly
- [ ] Visible count updates live
- [ ] Empty state appears for zero matches
- [ ] Source dataset confirmed unmutated
- [ ] Zero console errors
- [ ] Responsive at 360px, 768px and 1280px
- [ ] Dashboard link works from this page

See [../README.md](../README.md) and [../GRADING.md](../GRADING.md).
