import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import { addDoc,collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { auth,db } = useContext(FirebaseContext);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const user=await createUserWithEmailAndPassword(auth, email, password)
      console.log(user);
      const updatename =await updateProfile(auth.currentUser,{displayName:username})
      const data = await addDoc(collection(db,'users'),{
        id:user.user.uid,
        username:username,
        phone:phone
      });
      console.log(data);
      navigate('/login')
    } catch (error) {
      console.log(error.code,error.message)
    }
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
