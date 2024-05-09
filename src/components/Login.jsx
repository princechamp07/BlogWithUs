import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUserName, setSignOutState, setUserLoginDetails } from "../app/userSlice";

import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function Login(props) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(selectUserName);
 
   useEffect(() => {
       auth.onAuthStateChanged(async (user) => {
           if (user) {
               setUser(user);
               navigate("/home");
           }
       });
   }, [user]);

   const handleAuth = (event) => {
       event.preventDefault();
       if (!user) {
           signIn();
       } else {
           signOut();
       }
   };

   const signIn = () => {
       signInWithPopup(auth, provider)
           .then((result) => {
               setUser(result.user);
               navigate("/home");
           })
           .catch((e) => {
               alert(e.message);
           });
   };

   const signOut = () => {
       auth.signOut()
           .then(() => {
               dispatch(setSignOutState());
               navigate("/");
           })
           .catch((err) => alert(err.message));
   };

   const setUser = (usr) => {
       dispatch(
           setUserLoginDetails({
               name: usr.displayName,
               email: usr.email,
               photo: usr.photoURL,
           })
       );
   };



   return (
       <div className="bg-[url('../images/Bg.webp')] flex justify-center items-center bg-[cover] bg-no-repeat h-screen w-full">
           <div className="bg-gray-200 flex flex-col px-24 py-4 justify-center">
               <div className='font-bold justify-center mx-auto flex flex-col text-lg font-serif'>
                   <div className='flex mt-4  justify-center'>
                       <img className='border border-solid border-black' src="./images/Icon.png" alt="" />
                   </div>
                   <div>
                       BlogWithUs
                   </div>
               </div>
               <div className='flex flex-col my-12 text-center'>
                   <div className='text-2xl font-mono font-bold'>
                       Log In
                   </div>
                   <div className='text-sm'>
                       Join our blogging community
                   </div>
               </div>

               <div className=" w-96 mb-12">
                   <Button onClick={handleAuth} className="flex justify-center  text-center items-center h-10 w-full">
                       <img src="../images/google.svg" alt="" />
                       Sign In With Google
                   </Button>
                   <Button className="flex mt-4 bg-blue-700 justify-center  text-center items-center h-10 w-full">
                       <Link to="Posts">
                           Check Posts as guest
                       </Link>
                   </Button>
               </div>

           </div>
       </div>
   );
}

export default Login;
