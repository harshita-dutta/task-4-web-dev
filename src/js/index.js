import "./firebaseUtils"
import  "./ajaxUtils"
import "../main.css"

import 'bootstrap'
import "jquery"

// logging in and out
const auth = getAuth();
const logoutButton = document.querySelector('#logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      alert('user signed out')
      document.location.reload();
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
            createAlert(err.message,"alert-danger");
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
      loginForm.reset();
    })
    .catch(err => {
      createAlert(err.message,"alert alert-danger");
    })
})

// Checking Login Status to allow the user
onAuthStateChanged(auth, (user) => {
  if(user!=null){
    document.location.href = "mainpage.html";
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
