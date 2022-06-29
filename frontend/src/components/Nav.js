import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Nav() {
  return (
    <div className='nav'>
      <Topbar />
      <Sidebar />
    </div>
  )
}

export default Nav
