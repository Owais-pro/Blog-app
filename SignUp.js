import { auth, createUserWithEmailAndPassword, doc, setDoc,app,db } from "./FireBase.js";
console.log("db", db);
console.log("app", app);



const SignupHandler = async () => {
  try {
    const FullName = document.querySelector("#FullName");
    const Number = document.querySelector("#Number");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    const UserData = {
        FullName: FullName.value,
        Number: Number.value,
        Email: email.value
    }
    console.log(FullName.value);
    console.log(Number.value);
    console.log(email.value);
    
    
    

    const Response = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
    );
    const Uid = Response.user.uid;
    await setDoc(doc(db,"Users",Uid), UserData);
    alert("SignUp Successfull");
    window.location.href ="./Login.html"
  

  } 
  catch (error) {
    alert(error.message);
  }
};

window.SignupHandler = SignupHandler;
