import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as colormap from 'colormap'

const SizeChart = ({ data }) => {

  useEffect(() => {
    const dpLowerLimit = 3e-9
    const width = 800;
    const height = 450;

    const conMargin = {
      top: 20,
      bottom: 50,
      left: 40,
      right: 100
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

    // "HYY_DMPS.d100e1" to 1e-9
    const mapDp = d => {
      const [_, dpStr] = d.split(".d");
      return +dpStr / 1e12
    };

    let y = data.columns.map(mapDp).filter(x => x>dpLowerLimit).sort( (a, b) => a - b );

    let pxY = y.length

    let z = [];
    for (let i=0; i < pxX; i++ ) {
      for (const k in data.data[i]) {
        if (k !== "samptime") {
          let index = i + pxX * (pxY - 1 - y.indexOf(mapDp(k)));
          let x = data.data[i][k]
          z[index] = x>=10 ? Math.log10(x) : 1.000000001;
        };
      };
    };

    const colors = colormap({
      colormap: 'jet',
      nshades: 61,
      format: 'hex',
      alpha: 1
    })

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

    var scC = d3.scaleLinear()
      .domain(range(1, 4.0001, 0.05))
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
        .attr("stroke", "none")

    return svg.node();
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
