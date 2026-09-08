import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const GovernmentLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className="app-layout">
        <Sidebar />
        <main className="main-viewport" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
