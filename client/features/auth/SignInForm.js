import React, {useState} from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      console.log(userCredential);
      navigate('/profile')
    }).catch((error) => {console.log(error)})
  }

  return (
    <div className="sign-in-container">
      <form onSubmit ={signIn}>
        <h1>Log Into Your Account</h1>
        <input type="email" placeholder="email" value={email} onChange = {(e) => setEmail(e.target.value)}></input>
        <input type="password" placeholder="password" value={password} onChange = {(e) => setPassword(e.target.value)}></input>
        <button type = "submit">Log in, champ</button>
        <Link to="/profile">Go to Profile</Link>
      </form>
    </div>
  );
};

export default SignIn;
