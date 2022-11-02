import "./main.css"
import 'bootstrap'
import  "./ajaxUtils"

import { initializeApp } from 'firebase/app'
import {collection,doc,getDoc,getDocs,getFirestore,onSnapshot,query,where} from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'


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


const db = getFirestore();
const colReference = collection(db, 'books');

// Function to select a 'snapshot' and return the data we need in the form of array
var selectData = function (ref) {
    onSnapshot(ref, (snapshot)=> {
        let books = [];
        snapshot.docs.forEach((doc) =>{
            books.push({ ...doc.data(), id: doc.id})
        })
        console.log(books);
    });
}

var q = query(colReference, where("author","==","Autodesk"));
selectData(q);

// const addBookForm = document.querySelector(".add");
// addBookForm.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     addDoc(colReference, {
//         title: addBookForm.title.value,
//         author: addBookForm.author.value,
//         createdAt: serverTimestamp()
//     })
//     .then( ()=>{
//         addBookForm.reset();
//     })
// })


// const deleteBookForm = document.querySelector(".delete");
// deleteBookForm.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     const docRef = doc(db,'books', deleteBookForm.id.value);
//     deleteDoc(docRef)
//         .then( ()=> {
//             deleteBookForm.reset();
//         })
// })

const docRef = doc(db,'books', "I6vPoEG36BmN3VJPAqGg");
getDoc(docRef)
.then ((ref)=>{
    console.log(ref);
})

const auth = getAuth();

// const signupform = document.querySelector('.signup');
// signupform.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const email = signupform.Email1.value;
//     const password = signupform.Password1.value;
//     console.log(email,password);
//     createUserWithEmailAndPassword(auth,email,password)
//         .then((cred)=>{
//             alert("Created User "+cred);
//             signupform.reset();
//         })
//         .catch((err)=>{
//             alert(err.message);
//         })
// })

// logging in and out
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

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.Email1.value
  const password = loginForm.Password1.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      loginForm.reset();
      pageLoader();
    })
    .catch(err => {
      console.log(err.message)
    })
})



// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  if(user!=null){
    loginForm.style["display"] = "none";
    $ajaxUtils.sendGetRequest("otherinfo.html", 
    function (res) {
      console.log(res);
      document.querySelector("#content").innerHTML = res;}
      ,false);
  }
  else{
    console.log("NO USER")
  }
})

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("Inside DOM")
})
