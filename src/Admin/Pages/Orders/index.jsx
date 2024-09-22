import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getOrders } from '../../API';

const Orders = () => {
  const [loading, setloading] = useState(false);
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    setloading(true);
    getOrders().then((res) => {
      setdataSource(res.products);
      setloading(false);
    });
  }, [])
  

  return (
    <div>
      <Space size={20} direction='vertical'>
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        columns={[
          {
            title:'Title',
            dataIndex:'title'
          },
          {
            title:'Price',
            dataIndex:'price',
            render:(value) => <span>${value}</span>
          },
          {
            title:'DiscountedPrice',
            dataIndex:'discountedPrice',
            render:(value) => <span>${value}</span>
          },
          {
            title:'Quantity',
            dataIndex:'quantity',
            render:(rating) => {
              return <Rate value={rating} allowHalf disabled />
            }
          },
          {
            title:'Total',
            dataIndex:'total'
          },
          {
            title:'Category',
            dataIndex:'category'
          },
        ]}
        dataSource={dataSource}
        pagination = {{
          pageSize:6,
        }}
        loading={loading}
      ></Table>
      </Space>
    </div>
  )
}

export default Orders