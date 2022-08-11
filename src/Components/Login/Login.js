import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useRef } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Login.css';
import {useNavigate} from 'react-router-dom'

function Login() {
  const emailRef=useRef();
  const passwordRef=useRef();
  const{auth}=useContext(FirebaseContext)
  const navigate=useNavigate()
  const handleLogin= async (e)=>{
    e.preventDefault()
    try {
      const email=emailRef.current.value;
      const password =passwordRef.current.value;
      const login = await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            ref={emailRef}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            ref={passwordRef}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={()=>{navigate('/signup')}}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
