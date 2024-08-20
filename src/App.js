import React from 'react';
import AlertSystem from './components/AlertSystem';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import AdminSignIn from './components/AdminSignIn';
import AddAlert from './components/AddAlert';
import AddGeoFencing from './components/AddGeoFencing';
import Home from './components/Home';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/alert' element={<AlertSystem/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/adminsignin' element={<AdminSignIn/>}/>
      <Route path='/addalerts' element={<AddAlert/>}/>
      <Route path='/addgeofences' element={<AddGeoFencing/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
