import "../main.css"
import "../style/passpage.css"
import 'bootstrap'
import  "./ajaxUtils"
import "jquery"
import { initializeApp } from 'firebase/app'
import {collection,doc,getDoc,getDocs,getFirestore,onSnapshot,query,where} from 'firebase/firestore'
import { createUserWithEmailAndPassword,signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAlert } from "./ajaxUtils"


// Add your config here
const firebaseConfig = {
  apiKey: "AIzaSyB5dz82Olwh6Gezuw9GAsqIZesgOVTDCWg",
  authDomain: "events-59546.firebaseapp.com",
  projectId: "events-59546",
  storageBucket: "events-59546.appspot.com",
  messagingSenderId: "397686800845",
  appId: "1:397686800845:web:2c6923eb39003f8d754484",
  measurementId: "G-B6N0NF8RG1"
  };
// Initialize Firebase App
initializeApp(firebaseConfig);
const auth = getAuth();



// Logging out of your profile
const logoutButton = document.querySelector('#logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert("Logged Out");
      document.location.reload();
      document.location.href = "index.html";
      
    })
    .catch(err => {
      console.log(err.message)
    })
})

// Sign Up Form Event
const signupform = document.querySelector('.signup');
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupform.Email1.value;
    const password = signupform.Password1.value;
    console.log(email,password);
    createUserWithEmailAndPassword(auth,email,password)
        .then((cred)=>{
          console.log(cred)
          signInWithEmailAndPassword(auth, email, password)
          .then(cred => {
              document.location.href = "mainpage.html";
          })
          .catch(err => {
            console.log(err.message)
          })
          signupform.reset(); 
        })
        .catch((err)=>{
            createAlert(err.message,"alert alert-danger");
        })
})

// Sign In Form Event
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.Email1.value
  const password = loginForm.Password1.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      
      console.log(cred.user);
      loginForm.reset();
      document.location.href = "mainpage.html";

    })
    .catch(err => {
      createAlert(err.message,"alert alert-danger");
    })
})

// Sign In Using Google
const provider = new GoogleAuthProvider();
const logGoogle = document.getElementById("logGoogle");
logGoogle.addEventListener("click", 
    ()=>{
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    document.getElementById("logout").textContent = user;
    console.log(user);
    document.location.href = "mainpage.html";
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
    }
)

// Checking Login Status to allow the user
onAuthStateChanged(auth, (user) => {
  if(user!=null){
    console.log(user);
   
    
  }
})


// Sign In and Sign Up toggle 
var signup =document.getElementById("signup");
var login = document.getElementById("login");
signup.onclick = function(){
  signupform.style["display"] = "flex";
  loginForm.style["display"] = "none";
  signup.className = "btn btn-info";
  login.className = "btn btn-secondary";
}

login.onclick = function(){
  signupform.style["display"] = "none";
  loginForm.style["display"] = "flex";
  signup.className = "btn btn-secondary";
  login.className = "btn btn-info";
}
