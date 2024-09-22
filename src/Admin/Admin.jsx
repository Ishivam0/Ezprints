import React from 'react'
import './Admin.css'
import AppHeader from './Components/AppHeader'
import { Space } from 'antd'
import Sidebar from './Components/Sidebar'
import PageContent from './Components/PageContent'

const Admin = () => {
  return (
    <div>
        <AppHeader />
        <Space className='SidebarAndPageContent'>
            <Sidebar></Sidebar>
            <PageContent></PageContent>
        </Space>
    </div>
  )
}

export default Admin