import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getInventory } from '../../API';

const Inventory = () => {
  const [loading, setloading] = useState(false);
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    setloading(true);
    getInventory().then((res) => {
      setdataSource(res.products);
      setloading(false);
    });
  }, [])
  

  return (
    <div>
      <Space size={20} direction='vertical'>
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        columns={[
          {
            title:'Thumbnail',
            dataIndex:'thumbnail',
            render:(link) => {
             return <Avatar src={link} />
            }
          },
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
            title:'Rating',
            dataIndex:'rating',
            render:(rating) => {
              return <Rate value={rating} allowHalf disabled />
            }
          },
          {
            title:'Stock',
            dataIndex:'stock'
          },
          {
            title:'Brand',
            dataIndex:'brand'
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

export default Inventory