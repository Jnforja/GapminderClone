import * as d3 from 'd3';
import DataJson from './data.json';

export default class D3ScatterPlot {
  constructor(element) {
    const margin = { top: 10, right: 30, bottom: 80, left: 80 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

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

    let time = 0;
    d3.interval(() => {
      time = time < 214 ? time + 1 : 0;
      update(DataJson[time]);
    }, 100);

    function update(data) {
      const circles = svg
        .selectAll('circle')
        .data(
          data.countries.filter(d => d.income && d.life_exp && d.population),
          d => d.country
        );

      circles
        .exit()
        .attr('class', 'exit')
        .remove();

      circles
        .transition(d3.transition().duration(100))
        .attr('cx', d => {
          return x(d.income);
        })
        .attr('cy', d => {
          return y(d.life_exp);
        })
        .attr('r', d => {
          return Math.sqrt(area(d.population) / Math.PI);
        });

      circles
        .enter()
        .append('circle')
        .attr('class', 'enter')
        .attr('fill', d => color(d.continent))
        .transition(d3.transition().duration(100))
        .attr('cx', d => {
          return x(d.income);
        })
        .attr('cy', d => {
          return y(d.life_exp);
        })
        .attr('r', d => {
          return Math.sqrt(area(d.population) / Math.PI);
        });

      timeLabel.text(data.year);
    }
  }
}
