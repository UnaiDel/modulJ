// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RenderRoutes } from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <RenderRoutes />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
