import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'


import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
function Header() {
  const {user}= useContext(AuthContext)
  const {auth} =useContext(FirebaseContext)
  const navigate=useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{
            if (!user) {
              navigate('/login')
            }
          }}>{user?`Welcome ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={()=>{
          signOut(auth)
          navigate('/login')
        }}>Logout</span>}
        <div className="sellMenu" onClick={()=>{
              if(user){
                navigate('/create')
              }else{
                navigate('/login')
              }
            }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
