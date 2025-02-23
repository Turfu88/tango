import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBuilder } from './GameBuilder';
import '@/styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <GameBuilder />
    // </React.StrictMode>
);
