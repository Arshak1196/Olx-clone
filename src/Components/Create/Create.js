import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate=useNavigate()
  const { storage, db } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date()
  const handleSubmit = () => {
    console.log(name, category, price)
    try {
      const storageRef = ref(storage, `/image/${image.name}`)
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload Paused')
            break;
          case 'running':
            console.log('Uploading')
            break;
        }
      }, (error) => {
        console.log(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Image Url:', downloadURL)
          addDoc(collection(db,'products'),{
            name,
            category,
            price,
            url:downloadURL,
            userId:user.uid,
            createdAt:date.toDateString()
          })
        })
      })
      navigate('/')
    } catch (error) {

    }
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}
            id="fname"
            name="Price" />
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

            <br />
            <input
              type="file"
              onChange={(e) => { setImage(e.target.files[0]) }}
            />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>Upload and Submit</button>
   
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
