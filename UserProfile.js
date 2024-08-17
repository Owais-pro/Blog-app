import { getDoc, doc, db } from "./FireBase.js";

window.addEventListener("load", async ()=>{
    if (!localStorage.getItem("UserId")) {
        window.location.replace("./Login.html");
        return;   
    }
    const userid = localStorage.getItem("UserId");
const result = await getDoc(doc(db,"Users", userid));
console.log(result.data());
const name = document.querySelector("#fname");
const email = document.querySelector("#email");
const number = document.querySelector("#number");

fname.innerHTML = `Name : ${result.data().FullName}`;
lname.innerHTML = `Number : ${result.data().Number}`;
email.innerHTML = `Email : ${result.data().Email}`;
});





const LogOut = ()=>{
    localStorage.removeItem("UserId");
    localStorage.clear();
    window.location.replace("./Login.html")
}
window.LogOut = LogOut;