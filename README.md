# Animated Gapminder-style bubble chart

An interactive React and D3 visualization of the relationship between income,
life expectancy, population, geography, and time.

[Live demo](https://jnforja.github.io/GapminderClone/) ·
[Original Gapminder visualization](https://www.gapminder.org/tools/)

## Interaction

- Play or pause the timeline
- Scrub across 215 yearly data points
- Filter countries by continent
- Inspect country-level values in a tooltip

## Implementation

React owns the application controls and selected state. A focused D3 chart
class owns the SVG visualization, scales, axes, data joins, transitions,
tooltips, and legend.

Income uses a logarithmic scale, life expectancy uses a linear scale, bubble
area represents population, and color identifies the continent. Stable country
keys let D3 animate changes across each year while adding and removing data
points as needed.

## Run locally

This is a historical visualization project and its dependencies reflect the
React and D3 ecosystem at the time it was written.

```bash
npm install
npm start
```

## Stack

React · D3 · SVG · Semantic UI

## Status

Archived as a historical visualization project. For my current work and recent
engineering experience, visit [joaoforja.com](https://joaoforja.com).
