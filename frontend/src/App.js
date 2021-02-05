import { useState } from 'react'

import './App.css';
import 'antd/dist/antd.css'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ParamForm from './components/ParamsForm'
import DateList from './components/DateList'

function App() {
  const [queryMeta, setQueryMeta] = useState({isSubmitted: false})
  const [dateList, setDateList] = useState()

  // const url = "https://smear-backend.rahtiapp.fi/search/timeseries"

  // const dpList = [
  //   "d100e1", "d112e1", "d126e1", "d141e1", "d158e1", "d178e1", "d200e1", "d224e1", "d251e1", "d282e1",
  //   "d316e1", "d355e1", "d398e1", "d447e1", "d501e1", "d562e1", "d631e1", "d708e1", "d794e1", "d891e1",
  //   "d100e2", "d112e2", "d126e2", "d141e2", "d158e2", "d178e2", "d200e2", "d224e2", "d251e2", "d282e2",
  //   "d316e2", "d355e2", "d398e2", "d447e2", "d501e2", "d562e2", "d631e2", "d708e2", "d794e2", "d891e2",
  //   "d100e3", "d112e3", "d126e3", "d141e3", "d158e3", "d178e3", "d200e3", "d224e3", "d251e3", "d282e3",
  //   "d316e3", "d355e3", "d398e3", "d447e3", "d501e3", "d562e3", "d631e3", "d708e3", "d794e3", "d891e3",
  //   "d100e4"]

  // from: dateList[0] + "T00:00:00.000",
  // to: dateList[1] + "T23:59:59.999"

  const getDaysArray = (startDateStr, endDateStr) => {
    const start = new Date(startDateStr)
    const end = new Date(endDateStr)
    for (var arr=[], dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      const dtItem = dt.toISOString().slice(0, 10)
      arr.push(dtItem)
    }
    return arr;
  }

  return (
    <div className="App">

      <Row style={{ padding: "10px" }}>
        <Col span={20} offset={2} >
          <h1>SMEAR NPF event auto-analyzer</h1>
        </Col>
      </Row>

      <Row>
        <Col span={20} offset={2}>
          {queryMeta.isSubmitted === true ? null:<ParamForm
            onSubmit={(queryMeta) => {
              queryMeta.isSubmitted = true;
              setQueryMeta(queryMeta)
              setDateList(getDaysArray(queryMeta.from, queryMeta.to))
            }}
          />}
        </Col>
      </Row>

      {queryMeta.isSubmitted === true ? 
        <Row>
          
          <Col span={5} offset={2}>
            <DateList dateList={dateList}/>
          </Col>
          <Col span={15} offset={0}>
            content
          </Col>
        </Row> : null
      }

      <Row style={{ padding: "20px" }}>
        <Col span={20} offset={2}>
          <p style={{ textAlign: 'center', fontSize: '10px', marginTop: '30px' }}>
            © Copyright 2021. All Rights Reserved.
            <br></br>yusheng.wu@helisinki.fi
          </p>
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
