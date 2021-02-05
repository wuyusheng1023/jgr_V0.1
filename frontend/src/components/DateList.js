import React from 'react';
import Button from 'antd/lib/button'
import List from 'antd/lib/list';

const DateList = ({ runID, dateList, onClick }) => {
  return (
    <>
      <h2 style={{ padding: "10px" }}>Date List</h2>
      <Button onClick={onClick}>Start Analysis</Button>
      <List
        style={{ padding: "10px" }}
        itemLayout="horizontal"
        dataSource={dateList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta 
              style={{
                backgroundColor:
                  item.id > runID ? null :
                    (item.id === runID ? "PaleGreen": "AliceBlue")
              }}
              title={item.date}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default DateList
