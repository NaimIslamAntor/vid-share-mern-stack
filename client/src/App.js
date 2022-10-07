import React from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";



//import page
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>

         <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                
        </Route>

         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
