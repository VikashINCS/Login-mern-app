import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false)
  const PrivateRoute=(({element})=>{
    return isAuthenticated?element:<Navigate to="/login"/>
  })



  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
      </Routes>
    </div>
  );
}

export default App;
