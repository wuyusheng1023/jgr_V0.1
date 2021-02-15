import { useState } from 'react'

import './App.css';
import 'antd/dist/antd.css'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import ParamForm from './components/ParamsForm.jsx'
import DateList from './components/DateList.jsx'
import ChartsFrame from './components/ChartsFrame.jsx'

function App() {
  const [queryMeta, setQueryMeta] = useState({isSubmitted: false})
  const [dateList, setDateList] = useState()
  const [runID, setRunID] = useState(-1)

  const getDaysArray = (startDateStr, endDateStr) => {
    const start = new Date(startDateStr)
    const end = new Date(endDateStr)
    for (var arr=[], dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      const dtItem = dt.toISOString().slice(0, 10)
      arr.push(dtItem)
    }
    return arr.map((item, index) => ({ id: index, date: item }));
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
            <DateList runID={runID} dateList={dateList} onClick={ () => (setRunID(0)) }/>
          </Col>

          <Col span={15} offset={0}>
            <ChartsFrame id={runID} dateList={dateList} queryMeta={queryMeta} />
            </Col>
        </Row> : null
      }

      <Row style={{ padding: "20px" }}>
        <Col span={20} offset={2}>
          <p style={{ textAlign: 'center', fontSize: '10px', marginTop: '30px' }}>
            © Copyright 2021. All Rights Reserved.
            <br></br>yusheng.wu@helsinki.fi
          </p>
        </Col>
      </Row>
      
    </div>
  );
}

export default App;
