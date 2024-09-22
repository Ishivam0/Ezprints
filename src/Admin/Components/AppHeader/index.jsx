import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.png'
import { Badge, Drawer, Image, List, Space, Typography } from 'antd'
import { BellFilled, MailOutlined } from '@ant-design/icons'
import { getComments, getOrders } from '../../API'

const AppHeader = () => {
  const [comments, setcomments] = useState([]);
  const [orders, setorders] = useState([]);
  const [commentsOpen, setcommentsOpen] = useState(false);
  const [NotificationOpen, setNotificationOpen] = useState(false);
  useEffect(() => {
    getComments().then((res) => {
      setcomments(res.comments);
    });
    getOrders().then((res) => {
      setorders(res.products);
    });
  }, [])
  
  return (
    <div className='AppHeader'>
      <Image src={logo}
      width={60}
      />
      <Typography.Title>Admin Dashboard</Typography.Title>
      <Space>
        <Badge count={comments.length} dot>
          <MailOutlined style={{fontSize:24}} onClick={()=>{
            setcommentsOpen(true);
          }} />
          </Badge>
        <Badge count={orders.length}>
          <BellFilled style={{fontSize:24}} onClick={()=>{
            setNotificationOpen(true);
          }}/>
          </Badge>
      </Space>
      <Drawer title='Comments' open={commentsOpen} onClose={() => setcommentsOpen(false)} maskClosable >
        <List dataSource={comments} renderItem={(item) => {
          return <List.Item>{item.body}</List.Item>
        }} />
      </Drawer>
      <Drawer title='Notifications' open={NotificationOpen} onClose={() => setNotificationOpen(false)} maskClosable >
      <List dataSource={orders} renderItem={(item) => {
          return <List.Item><Typography.Text strong>{item.title}</Typography.Text> has been ordered!</List.Item>
        }} />
      </Drawer>
    </div>
  )
}

export default AppHeader