import React from 'react'
import { Outlet } from 'react-router-dom';


const PageContent = () => {
  const { path } = '/admin_panel';
  return (
    <div className='PageContent'>
     <Outlet/>
    </div>
  )
}

export default PageContent