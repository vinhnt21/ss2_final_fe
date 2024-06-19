// src/components/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';
import {AuthProvider, PrivateRoute} from "./services/privateRouter";

function App() {

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/chat" element={<PrivateRoute children={<Chat/>}/>}/>
                        <Route path="/" element={<Login/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
