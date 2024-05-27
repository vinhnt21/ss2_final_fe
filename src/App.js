// src/components/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
