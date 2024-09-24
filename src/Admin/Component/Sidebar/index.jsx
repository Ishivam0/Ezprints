import { AppstoreOutlined, ShopFilled, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <div className='Sidebar'>
      <Menu
      onClick={(item)=>navigate(item.key)}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label:'Dashboard',
          icon:<AppstoreOutlined/>,
          key:"/admin",
        },
        {
          label:'Inventory',
          icon:<ShopOutlined />,
          key:'/admin/inventory'
        },
        {
          label:'Orders',
          icon:<ShoppingCartOutlined />,
          key:'/admin/orders'
        },
        {
          label:'Customers',
          icon:<UserOutlined />,
          key:'/admin/customers'
        },
      ]}
      ></Menu>
    </div>
  )
}

export default Sidebar