import "./main.css"
import 'bootstrap'
import  "./ajaxUtils"

import { initializeApp } from 'firebase/app'
import {collection,doc,getDoc,getDocs,getFirestore,onSnapshot,query,where} from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAlert } from "./ajaxUtils"


// Add your config here
const firebaseConfig = {
    apiKey: "AIzaSyDub_7NQXQSjx6juNrfQCjM21M6IlNWuWM",
    authDomain: "fireweb-2d408.firebaseapp.com",
    projectId: "fireweb-2d408",
    storageBucket: "fireweb-2d408.appspot.com",
    messagingSenderId: "991930535994",
    appId: "1:991930535994:web:29541a11f6b34641d52503"
  };
// Initialize Firebase App
initializeApp(firebaseConfig);
const auth = getAuth();

// logging in and out
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

const signupform = document.querySelector('.signup');
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupform.Email1.value;
    const password = signupform.Password1.value;
    console.log(email,password);
    createUserWithEmailAndPassword(auth,email,password)
        .then((cred)=>{
          signInWithEmailAndPassword(auth, email, password)
          .then(cred => {
            pageLoader();
          })
          .catch(err => {
            console.log(err.message)
          })
          signupform.reset(); 
        })
        .catch((err)=>{
            alert(err.message);
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.Email1.value
  const password = loginForm.Password1.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      loginForm.reset();
    })
    .catch(err => {
      console.log(err.message)
    })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  if(user!=null){
    document.location.href = "mainpage.html";
  }
})
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
