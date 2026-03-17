import React from 'react'
import { Route, Routes } from 'react-router';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useState } from 'react';
import { useAuthStore } from './store/useAuthStore';

function App() {

  const {authUser,  login, isLoggedIn} = useAuthStore();

  console.log("auth user:", authUser);
  console.log("isLoggedIn", isLoggedIn);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden"> 

    {/* DECORATORS - GLOW SHAPES ONLY */}
    <div className="absolute top-0 -left-4 size-96 bg-fuchsia-200 opacity-25 blur-[120px]" />
    <div className="absolute bottom-0 -right-4 size-96 bg-teal-200 opacity-25 blur-[120px]" />  

    <button onClick={login} className="z-10">login</button>

    <Routes>
      <Route path= "/" element={<ChatPage  />} />
      <Route path= "/login" element={<LoginPage  />} />
      <Route path= "/signup" element={<SignUpPage  />} />
    </Routes>
    </div>
  );
} 
export default App;