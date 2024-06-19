// src/components/App.js
import React from 'react';
import './App.css';
import App from "./App";
import {createRoot} from "react-dom/client";
import './index.css';

const root = createRoot(document.getElementById("root"));

root.render(
    <>
        <App/>
    </>
)