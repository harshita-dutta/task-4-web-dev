import { initializeApp } from 'firebase/app'
import {addDoc,doc, setDoc, collection,getFirestore} from 'firebase/firestore'

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyDub_7NQXQSjx6juNrfQCjM21M6IlNWuWM",
  authDomain: "fireweb-2d408.firebaseapp.com",
  projectId: "fireweb-2d408",
  storageBucket: "fireweb-2d408.appspot.com",
  messagingSenderId: "991930535994",
  appId: "1:991930535994:web:29541a11f6b34641d52503"
  });

function rand() {
    const s = '123456789abcdefghijklmnopqrstuvwxyz';
    var pass = '';
    for (var i = 0; i < 8; i++) {
        pass += s[Math.floor(Math.random() * s.length)];
    }
    console.log(pass);
    return pass;
    
}

const db = getFirestore();
let count=0;
    
    let r;
    let p;
    document.getElementById("other").onclick=function()
    {
        count=count+1;
        if(count<=1)
        {
        let g = document.createElement("div");
        g.className = "mb-3";
        r=document.createElement("input");
        r.id="x";
        r.className = "form-control"
        r.type="text";
        r.placeholder="Enter the college name";
        g.appendChild(r);
        document.getElementById("coln").appendChild(g);
        
        }
    }
    document.getElementById("vit").onclick=function()
    {
        count=0;
       document.getElementById("x").remove();
       p="VIT";
    }
    document.getElementById("submit").onclick=function()
    {
        if(document.getElementById("nameInput").value=="" || document.getElementById("emailInput").value==""|| document.getElementById("phNoInput").value=="")
        {
            // alert("Please enter all values");
            document.querySelector(".modal-title").textContent = "Please enter All Values";
            document.querySelector(".btn-close").addEventListener("click",()=>{
                document.querySelector(".modal-title").textContent = "!";
            })
        }
        else
        {
            document.querySelector(".modal-title").textContent = "Thank you for registering!";
            let a=document.getElementById("nameInput").value;
            let b=document.getElementById("emailInput").value;
            let c=document.getElementById("phNoInput").value;
            if(document.getElementById("vit").checked)
            {
                p="VIT";
            }
            else
            {
                p=document.getElementById("x").value;
            }
            let x = rand();
            window.localStorage.x = x;
            setDoc(doc(db, "Reg", window.localStorage.uid), {
                Name:a,
                Email:b,
                PhoneNumber:c,
                CollegeName:p,
                PassId: x
              })
            .then((docref)=>
            {
                document.getElementById("nameInput").value="";
                document.getElementById("emailInput").value="";
                document.getElementById("phNoInput").value="";
                if(document.getElementById("x") == null){
                    console.log("Its null")
                }
                else{
                document.getElementById("x").value="";
                }
                console.log("Information Saved");
            })
            .catch((error)=>
            {
                console.error("Error",error);
            })
        }
   
    }

let fallback = document.getElementById("fallback")
if(fallback){
    fallback.addEventListener("click",()=> {
        document.location.href = "mainpage.html"
    })
}
