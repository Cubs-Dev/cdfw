import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Page
import Ajoutdemonde from './page/ajoutdemonde';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/test" element={<Ajoutdemonde/>}/>
            </Routes>
        </Router>
    );
}

export default App;
