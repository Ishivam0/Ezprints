import { Routes, Route } from 'react-router-dom';
import Admin from '../Admin/Admin'
import Dashboard from '../Admin/Pages/Dashboard/index'
import Inventory from '../Admin/Pages/Inventory/index'
import Orders from '../Admin/Pages/Orders/index'
import Customers from '../Admin/Pages/Customer/index'

import React from 'react'

const AdminPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  )
}

export default AdminPanelRoutes
