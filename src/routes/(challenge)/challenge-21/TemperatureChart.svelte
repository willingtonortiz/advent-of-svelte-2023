<script lang="ts">
  import {
    axisBottom as d3axisBottom,
    axisLeft as d3axisLeft,
    extent as d3extent,
    line as d3line,
    type NumberValue,
    scaleLinear as d3scaleLinear,
    scaleTime as d3scaleTime,
    select as d3select,
  } from "d3";
  import { onMount } from "svelte";

  type Temperature = {
    timestamp: Date;
    temperature: number;
  };

  let graphContainer: HTMLDivElement;
  export let data: Temperature[] = [];
  const xAccessor = (d: Temperature) => d.timestamp;
  const yAccessor = (d: Temperature) => d.temperature;

  const margins = { top: 20, right: 20, bottom: 20, left: 40 };
  const dimensions = { width: 400, height: 200 };
  const chartBounds = {
    boundedWidth: dimensions.width - margins.left - margins.right,
    boundedHeight: dimensions.height - margins.top - margins.bottom,
  };

  onMount(() => {
    const bounds = d3select(graphContainer)
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .style("transform", `translate(${margins.left}px, ${margins.top}px)`);

    // X Scale
    const xScale = d3scaleTime()
      .domain(d3extent(data, xAccessor) as Iterable<Date>)
      .range([0, chartBounds.boundedWidth]);

    // Y Scale
    const yScale = d3scaleLinear()
      .domain(d3extent(data, yAccessor) as Iterable<NumberValue>)
      .range([chartBounds.boundedHeight, 0]);

    // X Axis
    bounds
      .append("g")
      .attr("class", "x-axis")
      .call(d3axisLeft(yScale).tickFormat((d) => `${d}°C`));

    // Y Axis
    bounds
      .append("g")
      .attr("class", "y-axis")
      .call(d3axisBottom(xScale))
      .style("transform", `translateY(${chartBounds.boundedHeight}px)`);

    // Line chart
    bounds
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr(
        "d",
        d3line<Temperature>()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d))),
      )
      .attr("fill", "none")
      .attr("stroke", "mediumseagreen")
      .attr("stroke-width", 1);
  });
</script>

<div bind:this={graphContainer}></div>
