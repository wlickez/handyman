import './App.css';
import { useState, useEffect, React } from "react";
import NavbarComponent from './NavBar/NavbarComponent';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Services from './Pages/Services';

function App() {
  return (
    <>
      <NavbarComponent></NavbarComponent>

      
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/servicios' element={<Services></Services>}></Route>
          <Route path='/login' element={<Home></Home>}></Route>
          <Route path='/tasker' element={<Home></Home>}></Route>
        </Routes>
      
    </>
  );
}

export default App;
