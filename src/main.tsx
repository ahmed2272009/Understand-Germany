import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ServiceProvider } from './context/ServiceContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServiceProvider>
      <AuthProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AuthProvider>
    </ServiceProvider>
  </React.StrictMode>
);
