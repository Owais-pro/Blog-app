window.addEventListener("load",()=>{
    if (localStorage.getItem("UserId"))
    {
        window.location.replace("./index.html");

    }
});

import { auth, signInWithEmailAndPassword } from "./FireBase.js";

const LoginHandler = async ()=>{
 try {
    const Email = document.querySelector('#email');
 const Password = document.querySelector('#password');

 const Response = await signInWithEmailAndPassword(
    auth,
    Email.value,
    Password.value
 );
 const Uid = Response.user.uid;
 localStorage.setItem("UserId", Uid);
 window.location.href = "./index.html"
 } catch (error) {
    alert(error.message);
    
 }
};
window.LoginHandler = LoginHandler;