import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Login_Register from "./Login-Register";

const App = () => {
  return(
    <Router id="App">
      <Routes>
        <Route path="/login-register" element={<Login_Register/>} />
      </Routes>
    </Router>
  );
}
export default App;