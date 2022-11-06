import "../main.css"
import "../style/passpage.css"
import 'bootstrap'
import  "./ajaxUtils"
import "jquery"
import { initializeApp } from 'firebase/app'
import { doc, setDoc, getFirestore} from 'firebase/firestore'
import { createUserWithEmailAndPassword,signInWithPopup, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { createAlert } from "./ajaxUtils"
import { getDatabase } from "firebase/database";

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


// CountDown Timer:
var countDownDate = new Date("Dec 2, 2022 09:00:00").getTime();
var countdown = function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var timers = document.querySelectorAll(".countdown");
  timers.forEach(element => {
    element.innerHTML = "Time Remaining: "+
    days + "d " + hours + "hr(s) " + minutes + "min(s) " + seconds + "sec ";
  if (distance < 0) {
    clearInterval(x);
    element.innerHTML = "Event Expired";
  }
  });
  
}
var x = setInterval(countdown, 1000);



// Checking Login Status to allow the user
document.addEventListener("DOMContentLoaded",()=>{
  onAuthStateChanged(auth, (user) => {
    const user1 = auth.currentUser;
    if(user){
      if(user.displayName){
        document.getElementById("logout").textContent = user1.displayName;
      }
      else{
        user1.displayName = window.localStorage.username;
        document.getElementById("logout").textContent = user1.displayName;
      }
      window.localStorage.uid = user1.uid;

      // Form Verification:
      const db = getFirestore();
      const docRef = doc(db,"Reg",user.uid);
      if(docRef){
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => {
          button.textContent = "View Pass";
          button.setAttribute('href','passpage.html');
        });

      // Random ID on Screen
      let tokenDiv = document.querySelector(".token-number");
      if(tokenDiv){
          // Change token ID here
      }
      }
    }
  })
})


// Logging out of your profile
const logoutButton = document.querySelector('#logout')
if(logoutButton){
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
}

// Sign Up Form Event
const signupform = document.querySelector('.signup');
if(signupform){
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = signupform.Email1.value;
    const password = signupform.Password1.value;
    const username = signupform.username.value;
    console.log(username,email,password);
    window.localStorage.username = username;
    createUserWithEmailAndPassword(auth,email,password)
        .then((cred)=>{
          signupform.reset(); 
          document.location.href = "mainpage.html";
          
        })
        .catch((err)=>{
            createAlert(err.message,"alert alert-danger");
        })
})
}

// Sign In Form Event
const loginForm = document.querySelector('.login')
if(loginForm){
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
}
// Sign In Using Google
const provider = new GoogleAuthProvider();
const logGoogle = document.getElementById("logGoogle");
if(logGoogle){
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

}


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
