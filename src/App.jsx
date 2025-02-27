import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Page
import AjoutDon from "./page/ajoutdon";
import Ajoutdemonde from './page/ajoutdemonde';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/test" element={<AjoutDon/>}/>
            //<Route path="/assossiation" element={<Ajoutdemonde/>}/>*/
            </Routes>
        </Router>
    );
}

export default App;
