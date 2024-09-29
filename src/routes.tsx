// src/routes.tsx
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AudioRecorder from './components/AudioRecorder';
import ProtectedRoute from './components/ProtectedRoute';

const routes = [
  { path: "/login", component: Login, isProtected: false },
  { path: "/register", component: Register, isProtected: false },
  { path: "/audio", component: AudioRecorder, isProtected: true },
];

export const RenderRoutes = () => (
  <Switch>
    {routes.map(({ path, component, isProtected }, index) =>
      isProtected ? (
        <ProtectedRoute key={index} path={path} exact component={component} />
      ) : (
        <Route key={index} exact path={path} component={component} />
      )
    )}
    <Redirect to="/login" />
  </Switch>
);
