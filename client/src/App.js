import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import { BrowserRouter, Routes, Route } from "react-router-dom";



//import page
import Home from './pages/Home'
import Video from './pages/Video'


//import components
import Navbar from './components/global/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
         <Routes>
          <Route index path='/' element={<Home/>} />
          <Route path='/video/:id' element={<Video/>} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
