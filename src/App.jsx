import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Privatelayout from './layout/private/privatelayout';

// Page
import Homme from './page/homme';
//import AnimatedCard from './page/animated-card';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Privatelayout />}>
                <Route index element={<Homme />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
