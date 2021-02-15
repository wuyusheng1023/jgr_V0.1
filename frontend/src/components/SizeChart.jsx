import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as colormap from 'colormap'

const SizeChart = ({ data }) => {

  useEffect(() => {
    const dpLowerLimit = 3e-9
    const width = 640;
    const height = 360;

    const conMargin = {
      top: 20,
      bottom: 80,
      left: 60,
      right: 120
    };

    const colorBarMargin = {
      top: 20,
      bottom: 50,
      left: 720,
      right: 50
    };

    const conWidth = width - conMargin.left - conMargin.right
    const conHeight = height - conMargin.top - conMargin.bottom

    const x = data.data.map( (d, i) => new Date(data.data[i].samptime));
    const pxX = x.length
    const scX = d3.scaleUtc().domain(d3.extent(x)).range([conMargin.left, conMargin.left + conWidth])

    // "HYY_DMPS.d100e1" to 1e-9
    const mapDp = d => {
     const [_, dpStr] = d.split(".d");
      return +dpStr / 1e12
    };
    const y = data.columns.map(mapDp).filter(x => x>dpLowerLimit).sort( (a, b) => a - b );
    const pxY = y.length
    const scY = d3.scaleLog().domain(d3.extent(y)).range([conMargin.top + conHeight, conMargin.top])

    let dNdlogDp = [];
    for (let j=0; j < pxX; j++) {
      for (const k in data.data[j]) {
        if (k !== "samptime") {
          let i = y.indexOf(mapDp(k));
          if (i >= 0) {
            if (j === 0) {dNdlogDp[i] = []};
            dNdlogDp[i][j] = data.data[j][k];
          }
        };
      };
    };

    let z = dNdlogDp.reverse();
    z = [].concat(...z).map( x => x >= 10 ? Math.log10(x) : 1.000000001);

    const range = (start, end, step = 1) => {
      let output = [];
      if (typeof end === 'undefined') {
        end = start;
        start = 0;
      }
      for (let i = start; i < end; i += step) {
        output.push(i);
      }
      return output;
    };

    const logDpRange = range(1, 4.0001, 0.05)

    const colors = colormap({
      colormap: 'jet',
      nshades: logDpRange.length,
      format: 'hex',
      alpha: 1
    })

    var scC = d3.scaleLinear()
      .domain(logDpRange)
      .range(colors);
    
    const svg = d3.select(ref.current).attr("viewBox", `0 0 ${width} ${height}`);
    const g = svg.append("g");

    const conMkr = d3.contours().size([pxX, pxY]).thresholds(100);
    g.append("g")
      .attr("transform", `translate( ${conMargin.left}, ${conMargin.top} ) scale(${conWidth / pxX}, ${conHeight / pxY})`)
      .selectAll("path").data( conMkr(z) ).enter()
      .append("path")
        .attr("d", d3.geoPath())
        .attr("fill", d => scC(d.value))
        .attr("stroke", "none");

    svg.append("g")
      .attr("transform", `translate( 0, ${conMargin.top + conHeight} )`)
      .call(d3.axisBottom(scX).tickFormat(d3.utcFormat("%H:%M"))
        .ticks(d3.utcHour.every(3)));
    
    svg.append("g") 
      .attr("transform", `translate( ${conMargin.left}, 0 )`)
      .call(d3.axisLeft(scY))

    // return svg.node();
  })

  const ref = useRef()

  return (
    <svg
      style={{backgroundColor: "LishtGrey"}}
      ref={ref}
    />
  )
};

export default SizeChart
