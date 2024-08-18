import React from 'react';
import AlertSystem from './components/AlertSystem';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AlertSystem/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
