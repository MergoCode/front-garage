import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login_Register from "./Login-Register";
import LandingPage from "./LandingPage";
    
const App = () => {
  return(
    <Router id="App">
      <Routes>
         <Route path="/login-register" element={<Login_Register/>} />
         <Route path="/home" element={<LandingPage/>} /> {/*лендінг*/}
      </Routes>
    </Router>
  );
}
export default App;