import React, { useState } from 'react';
import { Authcontex } from './Authcontex';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';
import { useEffect } from 'react';



const googleprovider=new GoogleAuthProvider();

const Authprovider = ({ children }) => {
            const [user,setuser]=useState(null);
            const [loading,setloading]=useState(true)
    const registeruser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signinuser = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password);
    };
const signingoogle=()=>{
     setloading(true)
    return signInWithPopup(auth,googleprovider)
}
const resetPassword =(email)=>{
    setloading(true)
    return sendPasswordResetEmail(auth,email)
}
const logout=()=>{
    setloading(true);
    return signOut(auth);
}
const updateuserprofile=(profile)=>{
    return updateProfile(auth.currentUser,profile)
}
useEffect(()=>{
    const unsuscribe=onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser);
        setloading(false)

    })
    return ()=>{
        unsuscribe();
    }
},[])
    const authinfo = {
        registeruser,
        signinuser,
        signingoogle,
        user,
        loading,
        setloading,
        setuser,
        logout,
        updateuserprofile,
   resetPassword ,
    };

    return (
        <Authcontex.Provider value={authinfo}>
            {children}
        </Authcontex.Provider>
    );
};

export default Authprovider;
