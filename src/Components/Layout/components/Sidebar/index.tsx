import React, { useState } from 'react';
import { Button, Badge, Avatar, StatusIndicator, Modal } from '@/components/ui';
import './styles.css';
import type { NavigationItem } from './types';

const navigationItems: NavigationItem[] = [
  { id: 'connections', label: 'Connections', icon: '🔗' },
  { id: 'queries', label: 'Queries', icon: '📋' },
  { id: 'tables', label: 'Tables', icon: '📊' },
  { id: 'history', label: 'History', icon: '🕒', badge: 5 },
  { id: 'favorites', label: 'Favorites', icon: '⭐' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('connections');
  const [isNewConnectionModalOpen, setIsNewConnectionModalOpen] = useState(false);

  // Form state for connection fields
  const [connectionForm, setConnectionForm] = useState({
    connectionName: '',
    username: '',
    password: '',
    databaseEngine: 'postgresql',
    host: 'localhost',
    port: '5432',
    database: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setConnectionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestConnection = () => {
    // TODO: Implement connection testing
    console.log('Testing connection:', connectionForm);
    alert('Connection test would be implemented here!');
  };

  const handleSaveConnection = () => {
    // TODO: Implement connection saving
    console.log('Saving connection:', connectionForm);
    alert('Connection saved successfully!');
    setIsNewConnectionModalOpen(false);
    // Reset form
    setConnectionForm({
      connectionName: '',
      username: '',
      password: '',
      databaseEngine: 'postgresql',
      host: 'localhost',
      port: '5432',
      database: ''
    });
  };

  const handleCloseModal = () => {
    setIsNewConnectionModalOpen(false);
    // Reset form when closing
    setConnectionForm({
      connectionName: '',
      username: '',
      password: '',
      databaseEngine: 'postgresql',
      host: 'localhost',
      port: '5432',
      database: ''
    });
  };

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar__header">
        <h1 className="sidebar__title">Cheeky SQL</h1>
        <p className="sidebar__subtitle">Database Manager</p>
        <Button
          variant="primary"
          size="md"
          onClick={() => setIsNewConnectionModalOpen(true)}
          className="w-full mt-4"
        >
          New Connection
        </Button>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <div className="sidebar__nav-container">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="nav"
              active={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            >
              <div className="sidebar__nav-item-content">
                <span className="sidebar__nav-item-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant="primary" size="sm">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Additional long content to test scrolling */}
        <div className="sidebar__connections">
          <h3 className="sidebar__connections-title">
            Recent Connections
          </h3>
          <div className="sidebar__connections-list">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="sidebar__connection-item"
              >
                <StatusIndicator status="online" size="md" />
                <div className="sidebar__connection-info">
                  <p className="sidebar__connection-name">
                    Database {i + 1}
                  </p>
                  <p className="sidebar__connection-host">
                    localhost:5432
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <div className="sidebar__user">
          <Avatar variant="primary" size="md">
            U
          </Avatar>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name">User</p>
            <p className="sidebar__user-email">user@example.com</p>
          </div>
        </div>
      </div>

      {/* New Connection Modal */}
      <Modal
        isOpen={isNewConnectionModalOpen}
        onClose={handleCloseModal}
        title="New Database Connection"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-300 text-sm">
            Configure your database connection settings below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Connection Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-400 mb-2">
                Connection Name *
              </label>
              <input
                type="text"
                value={connectionForm.connectionName}
                onChange={(e) => handleInputChange('connectionName', e.target.value)}
                placeholder="My Production Database"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            {/* Database Engine */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-400 mb-2">
                Database Engine *
              </label>
              <select
                value={connectionForm.databaseEngine}
                onChange={(e) => handleInputChange('databaseEngine', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="mariadb">MariaDB</option>
                <option value="sqlite">SQLite</option>
                <option value="mssql">Microsoft SQL Server</option>
                <option value="oracle">Oracle</option>
              </select>
            </div>

            {/* Host */}
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">
                Host *
              </label>
              <input
                type="text"
                value={connectionForm.host}
                onChange={(e) => handleInputChange('host', e.target.value)}
                placeholder="localhost"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            {/* Port */}
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">
                Port *
              </label>
              <input
                type="number"
                value={connectionForm.port}
                onChange={(e) => handleInputChange('port', e.target.value)}
                placeholder="5432"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            {/* Database */}
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">
                Database *
              </label>
              <input
                type="text"
                value={connectionForm.database}
                onChange={(e) => handleInputChange('database', e.target.value)}
                placeholder="myapp_production"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-green-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={connectionForm.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="username"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={connectionForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <Button
              variant="secondary"
              size="md"
              onClick={handleTestConnection}
            >
              Test Connection
            </Button>
            <div className="space-x-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSaveConnection}
                disabled={!connectionForm.connectionName || !connectionForm.host || !connectionForm.port || !connectionForm.database}
              >
                Save Connection
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;