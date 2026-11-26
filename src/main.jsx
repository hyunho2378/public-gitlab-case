import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './krds/resources/css/component/krds-built.css';
import './krds/bridge/krds-bridge.css';
import './krds/bridge/fix_nav.css';
import './krds/bridge/fix_menu.css';
import './krds/bridge/fix_layout.css';
import './krds/bridge/fix_form.css';
import './index.css';

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
