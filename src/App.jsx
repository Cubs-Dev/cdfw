import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Privatelayout from './layout/private/privatelayout';

// Page
import Mofawadhiya from './layout/private/page/mofawadhiya';
//import AnimatedCard from './page/animated-card';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Privatelayout />}>
                <Route index element={<Mofawadhiya/>} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;
