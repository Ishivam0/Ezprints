import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {getCustomers, getInventory, getOrders, getRevenue } from '../../API'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {

  const [orders, setorders] = useState(0);
  const [inventory, setinventory] = useState(0);
  const [customers, setcustomers] = useState(0);
  const [revenue, setrevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setorders(res.total);
      setrevenue(res.discountedTotal);
    });
    getInventory().then((res) =>{
      setinventory(res.total);
    });
    getCustomers().then((res) => {
      setcustomers(res.total);
    });
  }, [])
  

  const DashboardCard =({title,value,icon}) => {
    return <Card>
    <Space direction='horizontal'>
    {icon}
    <Statistic title={title} value={value} />
    </Space>
  </Card>
  }

  const RecentOrders = () => {
    const [dataSource, setdataSource] = useState([]);
    const [loading, setloading] = useState(false);

      useEffect(() => {
        setloading(true);
        getOrders().then((res) => {
        setdataSource(res.products.splice(0,3));
        setloading(false);
        })

      }, []);

    return(
      <>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
        columns={[
          {
            title:'title',
            dataIndex:'title',
          },
          {
            title:'Quantity',
            dataIndex:'quantity',
          },
          {
            title:'Price',
            dataIndex:'discountedTotal',
          },
      ]}
      dataSource={dataSource}
      loading={loading}
      pagination={false}
      ></Table>
      </>
    )
  }

  const DashBoardChart = () => {

    const [revenueData, setrevenueData] = useState({
      labels:[],
      datasets:[],
    });

    useEffect(() => {
        getRevenue().then((res) => {
          const labels = res.carts.map((cart) => {
            return `User-${cart.userId}`;
          });
          const data = res.carts.map((cart) => {
            return cart.discountedTotal;
          });

              
          const dataSource = {
            labels,
            datasets:[
              {
                label:'Revenue',
                data:data,
                backgroundColor:'rgba(255, 99, 132, 0.5)',
              }
            ]
          };

          setrevenueData(dataSource);
        })
    }, []);


    const options = {
     responsive: true,
     plugins: {
       legend: {
         position: 'top'
       },
       title: {
         display: true,
         text: 'Orders Revenue',
       },
     },
   };



   return <Card style={{width:500,height:250}}>
      <Bar options={options} data={revenueData} />
   </Card>;
 };

  return (
    <div>
      <Space size={20} direction='vertical' >
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space>
        <DashboardCard icon={<ShoppingCartOutlined style={{color:'green',backgroundColor:'rgba(0,255,0,0.25)',borderRadius:20,fontSize:24,padding:8}}/>} title="Orders" value={orders} />
        <DashboardCard icon={<ShoppingOutlined style={{color:'blue',backgroundColor:'rgba(0,0,255,0.25)',borderRadius:20,fontSize:24,padding:8}}/>} title="Inventory" value={inventory} />
        <DashboardCard icon={<UserOutlined style={{color:'purple',backgroundColor:'rgba(0,255,255,0.25)',borderRadius:20,fontSize:24,padding:8}}/>} title="Customers" value={customers} />
        <DashboardCard icon={<DollarCircleOutlined style={{color:'red',backgroundColor:'rgba(255,0,0,0.25)',borderRadius:20,fontSize:24,padding:8}}/>} title="Revenue" value={revenue} />
      </Space>
      <Space>
        <RecentOrders />
        <DashBoardChart />
      </Space>
      </Space>
    </div>
  )
}

export default Dashboard