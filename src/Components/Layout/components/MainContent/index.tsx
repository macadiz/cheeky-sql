import React from 'react';
import { Button } from '@/components/ui';
import './styles.css';
import type { MainContentProps } from './types';

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="main-content">
      {/* Header/Toolbar */}
      <header className="main-content__header">
        <div className="main-content__header-container">
          <div className="main-content__header-info">
            <h2 className="main-content__title">
              Database Workspace
            </h2>
            <p className="main-content__subtitle">
              Manage your database connections and run queries
            </p>
          </div>
          <div className="main-content__actions">
            <Button variant="secondary" size="md">
              Import
            </Button>
            <Button variant="primary" size="md">
              New Query
            </Button>
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <main className="main-content__main">
        <div className="main-content__content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainContent;