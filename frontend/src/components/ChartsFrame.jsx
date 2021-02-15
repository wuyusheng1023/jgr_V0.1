import { useState } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col';

import SizeChart from './SizeChart.jsx'

import setting from '../setting'

const { rootEndpoint, dpList} = setting

const steps = {
  step1: "Load data"
}

const ChartsFrame = ({id, dateList, queryMeta}) => {
  const [step, setStep] = useState(0)
  const [data, setDate] = useState()

  if (id < 0) {return null}

  const date = dateList[id].date
  const queryParams = { ...queryMeta }
  const { station } = queryMeta 
  queryParams.from = date + "T00:00:00.000"
  queryParams.to = date + "T23:59:59.999"
  queryParams.interval = queryParams.interval.split(" ")[0]
  const variableList = dpList.map( item => "tablevariable=" + station + "_DMPS." + item )
  delete queryParams.station
  delete queryParams.isSubmitted
  let params = []
  for (let key in queryParams) {
    params.push(key + "=" + queryParams[key])
  }
  const url = rootEndpoint + "?" + params.join("&") + "&" + variableList.join("&")

  const processRawData = rawData => {
    const data = rawData
    setDate(data)
    setStep(2);
  }

  if (step === 0) {
    fetch(url)
      .then(response => response.json())
      .then(processRawData)
      .catch(console.error);
  }

  return (
    <>
      <Row>
        { (typeof data === "undefined") ? <h2>Loading data</h2> : <SizeChart data={data}/> }
      </Row>
    </>
  )
}

export default ChartsFrame;
