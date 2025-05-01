import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import LandingPage from "./pages/home/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element ={<HomePage/>}></Route>
        <Route path="/landing" element ={<LandingPage/>}></Route>
        <Route path="/login" element ={<LoginPage/>}></Route>
        <Route path="/signup" element ={<SignupPage/>}></Route>
      </Routes>
    </>
  );
}

export default App;
