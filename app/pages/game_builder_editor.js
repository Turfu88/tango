import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/app.css';
import { GameBuilderEditor } from './GameBuilderEditor';

ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
        <GameBuilderEditor />
     </React.StrictMode>
);
