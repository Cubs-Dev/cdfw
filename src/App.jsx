import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Privatelayout from './layout/private/privatelayout';

// Pages
import AwelcomePage from './page/private/welcomepage';
import Login from './page/public/LogIn';


//admin
import Amofawadhiya from './page/private/admin/Amofawadhiya'; // Assurez-vous que le chemin est correct
import Aobjectif from './page/private/admin/Aobjectif';
import ProfileEdit from './page/private/admin/ProfileEdit ';


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
                    <Route path='aobjectif' element={<Aobjectif/>}/>
                    <Route path='eprofil' element={<ProfileEdit/>}/>

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
