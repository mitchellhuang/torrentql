import React from 'react';
import Dashboard from '../layouts/Dashboard';
import Button from '../components/Button';

const Settings = () => (
  <Dashboard title="Settings" noFooter>
    <div>
      <div>Settings.</div>
      <Button href="/logout" className="mt-3">
        Logout
      </Button>
    </div>
  </Dashboard>
);

export default Settings;
