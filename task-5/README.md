# Task 5 - Interactive Sales Dashboard

## Objective

Build an interactive sales dashboard that derives business metrics from a
sales dataset and presents them with composable search, filter and sort.

## What you are building

A KPI panel and a data table rendered from the provided sales dataset. Six
KPIs are derived from the visible (filtered) records. The user can search
by product, filter by category and sort by multiple criteria. All controls
compose. KPIs recalculate against the filtered set, not the full dataset.

## Required features

- [ ] Derive total revenue (quantity * price per record)
- [ ] Derive order count, total units, average order value
- [ ] Derive best-selling product by units
- [ ] Derive best-selling category by revenue
- [ ] KPIs recalculate against the filtered set
- [ ] Build the data table from the dataset
- [ ] Search, filter and sort compose without resetting each other
- [ ] Safe KPI values when nothing matches (no NaN, no Infinity)
- [ ] Currency formatted consistently
- [ ] Table scrolls inside .table-wrap on mobile
- [ ] Populate the category dropdown from the dataset

## JavaScript concepts assessed

Data aggregation, reduce, derived metrics, composable pipelines,
data-driven rendering, defensive programming, number formatting.

## Provided for you

- `index.html` with KPI grid, toolbar, data table and empty state
- Element ids: `sales-search`, `sales-category`, `sales-sort`,
  `sales-table-body`, `kpi-revenue`, `kpi-orders`, `kpi-units`,
  `kpi-aov`, `kpi-top-product`, `kpi-top-category`, `sales-empty`
- `data.js` with 30 sales records across 3 months
- `task-5.js` with function stubs and TODO markers
- The shared design system in `assets/css/style.css`

## What you must not do

- Hardcode any KPI value in HTML
- Calculate KPIs from the full dataset when filters are active
- Mutate the SALES array (sort mutates: sort a copy)
- Let one control reset another
- Allow NaN or Infinity in the interface
- Use innerHTML with unescaped user input
- Add a framework or external dependency

## Definition of done

- [ ] All eleven TODO markers implemented
- [ ] All six KPIs derived and correct
- [ ] KPIs change when a filter is applied
- [ ] 30 records render in the table on load
- [ ] Search, filter and sort compose correctly
- [ ] No NaN or Infinity in any state
- [ ] Currency formatted consistently
- [ ] Table scrolls on mobile, no horizontal page overflow
- [ ] Zero console errors
- [ ] Responsive at 360px, 768px and 1280px
- [ ] Dashboard link works from this page

See [../README.md](../README.md) and [../GRADING.md](../GRADING.md).
