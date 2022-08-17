import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../Admin';
import Login from '../Login';
import Registration from '../Registeration';

export function Routing() {
    return (
        <React.StrictMode>

            < Routes >
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="/admin" element={<Admin />} />
            </Routes >

        </React.StrictMode>
    );
}

/* <Link to="/signup">Sign Up</Link> */ 