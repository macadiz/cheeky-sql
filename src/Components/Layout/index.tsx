import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles.css';
import type { LayoutProps } from './types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Layout;