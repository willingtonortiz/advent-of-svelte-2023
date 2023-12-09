<script lang="ts">
  import { onMount } from "svelte";
  import {
    select as d3select,
    scaleLinear as d3scaleLinear,
    extent as d3extent,
    line as d3line,
    axisLeft as d3axisLeft,
    axisBottom as d3axisBottom,
    scaleTime as d3scaleTime,
    type NumberValue,
  } from "d3";
  import { browser } from "$app/environment";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";
  import { Heart, HeartHandshake, HeartPulse } from "lucide-svelte";

  const apiUrl = "https://advent.sveltesociety.dev/data/2023/day-four.json";

  type HeartRate = {
    value: number;
    timestamp: Date;
  };

  async function fetchHeartRate(): Promise<HeartRate> {
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => ({ value: data.heartRate, timestamp: new Date() }));
  }

  let graphContainer: HTMLDivElement;
  let heartRateList: HeartRate[] = [];
  const xAccessor = (d: HeartRate) => d.timestamp;
  const yAccessor = (d: HeartRate) => d.value;

  const margins = { top: 20, right: 20, bottom: 20, left: 40 };
  const dimensions = { width: 400, height: 400 };
  const chartbounds = {
    boundedWidth: dimensions.width - margins.left - margins.right,
    boundedHeight: dimensions.height - margins.top - margins.bottom,
  };

  $: {
    if (browser && heartRateList) {
      updateChart(heartRateList);
    }
  }

  function addHeartRate(heartRate: HeartRate) {
    const heartRateListCopy = [...heartRateList];
    if (heartRateListCopy.length > 10) {
      heartRateListCopy.shift();
    }
    heartRateList = [...heartRateListCopy, heartRate];
  }

  function getScales(data: HeartRate[]) {
    // X Scale
    const xScale = d3scaleTime()
      .domain(d3extent(data, xAccessor) as Iterable<Date>)
      .range([0, chartbounds.boundedWidth]);

    // Y Scale
    const yScale = d3scaleLinear()
      .domain(d3extent(data, yAccessor) as Iterable<NumberValue>)
      .range([chartbounds.boundedHeight, 0]);

    return { xScale, yScale };
  }

  function updateChart(data: HeartRate[]) {
    const { xScale, yScale } = getScales(data);

    const container = d3select(graphContainer).select("svg g");

    // X Axis
    container.select<SVGGElement>("g.x-axis").transition().duration(1000).call(d3axisLeft(yScale));

    // Y Axis
    container
      .select<SVGGElement>("g.y-axis")
      .call(
        d3axisBottom(xScale).tickFormat(
          (d) =>
            `${(d as Date).getMinutes().toString().padStart(2, "0")}:${(d as Date).getSeconds()}`,
        ),
      )
      .style("transform", `translateY(${chartbounds.boundedHeight}px)`);

    // Line chart
    container
      .select("path.line")
      .datum(data)
      .attr(
        "d",
        d3line<HeartRate>()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d))),
      );

    // Labels with small circles
    container
      .select<SVGGElement>("g.labels")
      .selectAll("g")
      .data(data)
      .join((enter) => {
        const g = enter.append("g");
        g.append("text")
          .attr("y", -10)
          .attr("font-size", 10)
          .attr("fill", "tomato")
          .text((d) => yAccessor(d));

        g.append("circle")
          .attr("r", 2)
          .attr("fill", "tomato")
          .attr("stroke", "tomato")
          .attr("stroke-width", 1);
        return g;
      })
      .style("transform", (d) => `translate(${xScale(xAccessor(d))}px, ${yScale(yAccessor(d))}px)`);
  }

  onMount(() => {
    const bounds = d3select(graphContainer)
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .append("g")
      .style("transform", `translate(${margins.left}px, ${margins.top}px)`);

    const { xScale, yScale } = getScales(heartRateList);

    // X Axis
    bounds.append("g").attr("class", "x-axis").call(d3axisLeft(yScale));

    // Y Axis
    bounds
      .append("g")
      .attr("class", "y-axis")
      .call(d3axisBottom(xScale))
      .style("transform", `translateY(${chartbounds.boundedHeight}px)`);

    // Line chart
    bounds
      .append("path")
      .datum(heartRateList)
      .attr("class", "line")
      .attr(
        "d",
        d3line<HeartRate>()
          .x((d) => xScale(xAccessor(d)))
          .y((d) => yScale(yAccessor(d))),
      )
      .attr("fill", "none")
      .attr("stroke", "mediumseagreen")
      .attr("stroke-width", 1);

    // Labels
    bounds.append("g").attr("class", "labels");

    const intervalId = setInterval(() => {
      fetchHeartRate().then(addHeartRate);
    }, 1000);

    return () => clearInterval(intervalId);
  });
</script>

<main class="mt-4">
  <ChallengeBackButton />

  <ChallengeTitle>Challenge 04 - Santa's Heart Rate Monitor</ChallengeTitle>

  <p>Santa's current Heart Rate</p>

  <div class="grid grid-cols-[1fr_400px] gap-4">
    <div class="p-4 bg-gray-100 rounded-xl place-self-center">
      <h1 class="text-sm">Heart Rate</h1>

      {#if heartRateList.length > 0}
        <div class="flex gap-2 mt-2 flex-nowrap">
          <HeartPulse class="w-12 h-12 text-red-400" />
          <p class="text-4xl">{heartRateList[heartRateList.length - 1].value}</p>
        </div>
      {/if}
    </div>

    <div class="p-4 bg-gray-100 rounded-xl place-self-center">
      <div bind:this={graphContainer}></div>
    </div>
  </div>
</main>
