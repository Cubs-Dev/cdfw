import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from './layout/public/layout';

// Page
import Homme from './page/homme';
import AnimatedCard from './page/animated-card';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                <Route index element={<Homme />} />
                </Route>
            <Route path='/tt' element={<AnimatedCard/>}/>

            </Routes>
        </Router>
    );
}

export default App;
