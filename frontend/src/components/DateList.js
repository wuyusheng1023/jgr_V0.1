import React from 'react';
import Button from 'antd/lib/button'
import List from 'antd/lib/list';

const DateList = ({ dateList }) => {

  return (
    <>
      <h2 style={{ padding: "10px" }}>Date List</h2>
      <Button>Start Analysis</Button>
      <List
        style={{ padding: "10px" }}
        itemLayout="horizontal"
        dataSource={dateList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default DateList
