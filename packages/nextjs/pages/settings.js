import React from 'react';
import Dashboard from '../layouts/Dashboard';
import Button from '../components/Button';

const Settings = () => (
  <Dashboard title="Settings" noFooter>
    <div>
      <Button href="/logout">
        Logout
      </Button>
    </div>
  </Dashboard>
);

export default Settings;
