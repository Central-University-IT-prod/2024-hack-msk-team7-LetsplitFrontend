import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme.css';
import './buttons.css';
import './overflow.css';
import Router from './Router';
import {Navbar} from "./Components/Navbar";
import {UserProvider} from "./Components/UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserProvider>
            <Navbar/>
            <Router/>
        </UserProvider>
    </React.StrictMode>
);
