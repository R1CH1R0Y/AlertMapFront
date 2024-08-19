import React from 'react';
import AlertSystem from './components/AlertSystem';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/alert' element={<AlertSystem/>}/>
      <Route path='/' element={<UserLogin/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
