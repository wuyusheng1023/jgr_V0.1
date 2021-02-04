import './App.css';
import 'antd/dist/antd.css'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={18} offset={3} >
          header
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          header
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={3}>
          sider
        </Col>
        <Col span={12} offset={0}>
          contene
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          footer
        </Col>
      </Row>
    </div>
  );
}

export default App;
