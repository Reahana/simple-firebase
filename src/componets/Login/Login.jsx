import React, { useState } from 'react';
import { getAuth,GoogleAuthProvider, signInWithPopup, signOut, GithubAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase.init';
const Login = () => {
    const [user,setUser]= useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider) 
    .then(result => {
        const loggerInUser = result.user;
        console.log(loggerInUser);
        setUser(loggerInUser)
    })
    .catch(error =>{
        console.log('error', error.message);
    })
}
const handleGithubSignIn = () =>{
signInWithPopup(auth, githubProvider) 
    .then(result => {
        const loggerInUser = result.user;
        console.log(loggerInUser);
        setUser(loggerInUser)
    })
    .catch(error =>{
        console.log('error', error.message);
    })
}
const handleSignOut = () =>{
    signOut(auth)
    .then(result =>{
        console.log(result);
        setUser(null)
    })
    .catch(error =>{
        console.log(error);
    })
}

    return (
        <div>
           { user ?
             <button onClick={handleSignOut}> Sign out</button> :
             <div>
                 <button onClick={handleGoogleSignIn}>Google login</button>
                 <button onClick={handleGithubSignIn}>Github login</button>
             </div>
           }
  { user && 
      <div>
      <h3> user : {user.displayName}</h3>
      <h3>email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
  </div>
  }
        </div>
    );
};

export default Login;