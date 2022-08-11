import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

import './View.css';

function View() {
  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(PostContext)
  const{db}=useContext(FirebaseContext)
  useEffect(()=>{
    console.log(postDetails)
    const {userId}= postDetails;
    const q=query(collection(db,"users"),where('id','==',userId))
    getDocs(q).then((querySnapshot)=>{
      querySnapshot.forEach(doc=>{
        setUserDetails(doc.data())
        console.log(userDetails)
      })
    })
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
