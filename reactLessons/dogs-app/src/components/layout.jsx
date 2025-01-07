import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SideBar from './sidebar.jsx';
import Header from './header.jsx';
import './css/layout.css';

function Layout() {
  const [selectedBreed, setSelectedBreed] = useState('');
  const { breed } = useParams();
  
  return (
    <div className="container">
      <Header />
      <main>
        <div className="sidebar-container">
          <SideBar selectedBreed={breed || selectedBreed} onSelectBreed={setSelectedBreed} />
        </div>
        <div className="gallery-container">
          <Outlet context={{ selectedBreed: selectedBreed || breed }} />
        </div>
      </main>
    </div>
  );
}

export default Layout;