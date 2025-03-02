import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from './layout/private/layout';

// Page
import Homme from './page/homme';
//import AnimatedCard from './page/animated-card';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                <Route index element={<Homme />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
