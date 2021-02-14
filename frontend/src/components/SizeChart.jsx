import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import * as colormap from 'colormap'

const SizeChart = ({ data }) => {

  useEffect(() => {
    let width = 800;
    let height = 600;

    let contourMargin = {
      top: 20,
      bottom: 50,
      left: 40,
      right: 100
    };

    let colorBarMargin = {
      top: 20,
      bottom: 50,
      left: 720,
      right: 50
    }

    let x = data.data.map( (d, i) => new Date(data.data[i].samptime));
    let pxX = x.length

    // "HYY_DMPS.d100e1" to 1e-9
    let mapDp = d => {
      let [_, dpStr] = d.split(".d")
      return +dpStr / 1e12
    }

    let y = data.columns.map(mapDp).sort( (a, b) => a - b );
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
    
    const svg = d3.select(ref.current);
    const g = svg.append("g");

    const conMkr = d3.contours().size([pxX, pxY]).thresholds(100);
    g.append("g").selectAll("path").data( conMkr(z) ).enter()
      .append("path")
        .attr("d", d3.geoPath())
        .attr("fill", d => scC(d.value))
        .attr("stroke", "none")

    return svg.node();
  })

  const ref = useRef()

  return (
    <svg viewBox="0 0 200 150"
      style={{backgroundColor: "LishtGrey"}}
      ref={ref}
    />
  )
};

export default SizeChart
