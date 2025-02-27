import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './component/navbar'

const layout = () => {
  return (
    <div>
    <header>
        <div><Navbar/></div>
      </header>
    <main>
      <Outlet/>
    </main>
</div>
)
}

export default layout