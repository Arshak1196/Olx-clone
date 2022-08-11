import React, { useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthContext, FirebaseContext } from './store/Context';
import './App.css';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext';


function App() {
  const { setUser } = useContext(AuthContext)
  const { auth } = useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user)
    })
  })
  return (
    <div>
      <Post>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
