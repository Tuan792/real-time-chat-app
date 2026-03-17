import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import {Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth) return <PageLoader />


  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden"> 

    {/* DECORATORS - GLOW SHAPES ONLY */}
    <div className="absolute top-0 -left-4 size-96 bg-fuchsia-200 opacity-25 blur-[120px]" />
    <div className="absolute bottom-0 -right-4 size-96 bg-teal-200 opacity-25 blur-[120px]" />  


    <Routes>
      <Route path= "/" element={authUser ? <ChatPage  /> : <Navigate to ={"/login"} />} />
      <Route path= "/login" element={!authUser ? <LoginPage  /> : <Navigate to ={"/"} />} />
      <Route path= "/signup" element={!authUser ? <SignUpPage  />: <Navigate to ={"/"} />} />
    </Routes>
    </div>
  );
} 
export default App;