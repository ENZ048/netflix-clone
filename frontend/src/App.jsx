import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import LandingPage from "./pages/home/LandingPage";
import {Toaster} from 'react-hot-toast';
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import HomeScreen from "./pages/home/HomeScreen";
import { Navigate } from "react-router-dom";

function App() {
  const {user, isCheckingAuth, authCheck} = useAuthStore();
  console.log(user);

  useEffect(()=>{
    authCheck();
  }, []);

  if(isCheckingAuth){
    return(
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
  }
  return (
    <>
      <Routes>
        <Route path="/" element ={<HomeScreen/>}></Route>
        {/* <Route path="/landing" element ={<LandingPage/>}></Route> */}
        <Route path="/login" element ={!user ? <LoginPage/>  : <Navigate to={"/"}/>}></Route>
        <Route path="/signup" element ={!user ? <SignupPage/> : <Navigate to={"/"}/>}></Route>
      </Routes>
      <Toaster/>
    </>
  );
}

export default App;
