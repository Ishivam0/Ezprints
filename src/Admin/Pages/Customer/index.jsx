import { Avatar, Rate, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCustomers, getInventory } from '../../API';

const Customers = () => {
  const [loading, setloading] = useState(false);
  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    setloading(true);
    getCustomers().then((res) => {
      setdataSource(res.users);
      setloading(false);
    });
  }, [])
  

  return (
    <div>
      <Space size={20} direction='vertical'>
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        columns={[
          {
            title:'Photo',
            dataIndex:'image',
            render:(image) => {
             return <Avatar src={image} />
            }
          },
          {
            title:'FirstName',
            dataIndex:'firstName'
          },
          {
            title:'LastName',
            dataIndex:'lastName',
          },
          {
            title:'Email',
            dataIndex:'email',
          },
          {
            title:'Phone',
            dataIndex:'phone'
          },
          {
            title:'Address',
            dataIndex:'address',
            render:(address) => {
              return <span>{address.address},{address.city}</span>
            }
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

export default Customers