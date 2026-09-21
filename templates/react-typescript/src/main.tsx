import React from 'react';
import ReactDOM from 'react-dom/client';
import { VTunnelSDKProvider } from 'vtunnel-sdk/react';
import { App } from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VTunnelSDKProvider
      options={{
        strict: false,
        autoRegisterNativeEvents: true,
      }}
    >
      <App />
    </VTunnelSDKProvider>
  </React.StrictMode>,
);
