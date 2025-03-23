import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Privatelayout from './layout/private/privatelayout';

// Pages
import Amofawadhiya from './page/private/admin/amofawadhiya'; // Assurez-vous que le chemin est correct
import AwelcomePage from './page/private/welcomepage';
import Login from './page/public/LogIn';
//RBR
import Leaders from './page/private/RBR/Leaders';
// import AnimatedCard from './page/animated-card';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/admin' element={<Privatelayout />}>
                    <Route index element={<AwelcomePage />} />
                    <Route path='amofawadhiya' element={<Amofawadhiya/>}/>

                </Route>
                <Route path='/rbr' element={<Privatelayout />}>
                    <Route index element={<AwelcomePage />} />
                    <Route path='leaders' element={<Leaders/>}/>

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
