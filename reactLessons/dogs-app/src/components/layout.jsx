import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './sidebar.jsx';
import Header from './header.jsx';
import './css/layout.css';

function Layout() {
  const [selectedBreed, setSelectedBreed] = useState('shihtzu');

  return (
    <div className="container">
      <Header />
      <main>
        <div className="sidebar-container">
          <SideBar onSelectBreed={setSelectedBreed} />
        </div>
        <div className="gallery-container">
          <Outlet context={{ selectedBreed }} />
        </div>
      </main>
    </div>
  );
}

export default Layout;