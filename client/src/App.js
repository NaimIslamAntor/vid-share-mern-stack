import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import { BrowserRouter, Routes, Route } from "react-router-dom";



//import page
import Home from './pages/Home'



//import components
import Navbar from './components/global/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
         <Routes>
          <Route index path='/' element={<Home/>} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
