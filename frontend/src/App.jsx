import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login_Register from "./Login-Register";
import LandingPage from "./LandingPage";
import Layout from "./components/Layout";
const App = () => {
  return(
    <Router id="App">
      <Routes>
         <Route path="/login-register" element={<Login_Register/>} />
         {/*нижче сторінки де має бути лейаут */}
         <Route path="/" element={<Layout />}>
          <Route path="home" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;