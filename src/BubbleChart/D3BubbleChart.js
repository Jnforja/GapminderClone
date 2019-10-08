import * as d3 from 'd3';
import './BubbleChart.css';
import DataJson from './data.json';

export default class D3BubbleChart {
  constructor(element) {
    const vis = this;
    const margin = { top: 10, right: 50, bottom: 80, left: 100 };
    const width = 1000 - margin.left - margin.right;
    const height = 550 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3
      .select(element)
      .append('div')
      .attr('class', 'd3-tip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    const x = d3
      .scaleLog()
      .base(8)
      .domain([142, 150000])
      .range([0, width]);

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues([400, 4000, 40000])
          .tickFormat(d3.format('$'))
      );

    // Add X Label
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height + 50)
      .attr('text-anchor', 'middle')
      .attr('font-size', '1.5rem')
      .text(`GDP Per Capita ($)`);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(DataJson, d => d3.max(d.countries, c => c.life_exp))])
      .range([height, 0])
      .nice();

    svg.append('g').call(d3.axisLeft(y));

    const area = d3
      .scaleLinear()
      .range([25 * Math.PI, 1500 * Math.PI])
      .domain([2000, 1400000000]);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    const timeLabel = svg
      .append('text')
      .attr('y', height - 10)
      .attr('x', width - 40)
      .attr('font-size', '2rem')
      .attr('opacity', '0.4')
      .attr('text-anchor', 'middle')
      .text(DataJson[0].year);

    // Add Y label
    svg
      .append('text')
      .attr('x', -(height / 2))
      .attr('y', -60)
      .attr('font-size', '1.5rem')
      .attr('text-anchor', 'middle')
      .text(`Life Expectancy (Years)`)
      .attr('transform', 'rotate(-90)');

    const continents = ['europe', 'asia', 'americas', 'africa'];

    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 10}, ${height - 125})`);

    continents.forEach((c, i) => {
      const row = legend
        .append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      row
        .append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', color(c));

      row
        .append('text')
        .attr('x', -10)
        .attr('y', 10)
        .attr('text-anchor', 'end')
        .style('text-transform', 'capitalize')
        .text(c);
    });

    vis.update = update;

    function update(yearIdx, selectedContinents) {
      const circles = svg
        .selectAll('circle')
        .data(
          DataJson[yearIdx].countries.filter(
            d =>
              d.income &&
              d.life_exp &&
              d.population &&
              (selectedContinents.length === 0 ||
                selectedContinents.includes(d.continent))
          ),
          d => d.country
        );

      circles.exit().remove();

      circles
        .transition(d3.transition().duration(100))
        .attr('cx', d => {
          return x(d.income);
        })
        .attr('cy', d => {
          return y(d.life_exp);
        })
        .attr('r', d => {
          return Math.sqrt(area(d.population) / Math.PI) * 2;
        });

      const enterCircles = circles
        .enter()
        .append('circle')
        .attr('fill', d => color(d.continent))
        .attr('stroke', 'black')
        .attr('stroke-width', '1');

      enterCircles
        .on('mouseover', function(d) {
          const mouse = d3.mouse(this);
          tooltip
            .style('top', mouse[1] + 'px')
            .style('left', mouse[0] + 'px')
            .style('visibility', 'visible')
            .html(() => {
              let text =
                "<strong>Country:</strong> <span style='color:orange'>" +
                d.country +
                '</span><br>';
              text +=
                "<strong>Continent:</strong> <span style='color:orange;text-transform:capitalize'>" +
                d.continent +
                '</span><br>';
              text +=
                "<strong>Life Expectancy:</strong> <span style='color:orange'>" +
                d3.format('.2f')(d.life_exp) +
                '</span><br>';
              text +=
                "<strong>GDP Per Capita:</strong> <span style='color:orange'>" +
                d3.format('$,.0f')(d.income) +
                '</span><br>';
              text +=
                "<strong>Population:</strong> <span style='color:orange'>" +
                d3.format(',.0f')(d.population) +
                '</span><br>';
              return text;
            });
        })
        .on('mouseout', () => {
          tooltip.style('visibility', 'hidden');
        })
        .transition(d3.transition().duration(100))
        .attr('cx', d => {
          return x(d.income);
        })
        .attr('cy', d => {
          return y(d.life_exp);
        })
        .attr('r', d => {
          return Math.sqrt(area(d.population) / Math.PI) * 2;
        });

      timeLabel.text(DataJson[yearIdx].year);
    }
  }
}
