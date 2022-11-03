const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB5dz82Olwh6Gezuw9GAsqIZesgOVTDCWg",
    authDomain: "events-59546.firebaseapp.com",
    projectId: "events-59546",
    storageBucket: "events-59546.appspot.com",
    messagingSenderId: "397686800845",
    appId: "1:397686800845:web:2c6923eb39003f8d754484",
    measurementId: "G-B6N0NF8RG1"
  });
  const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();

let count=0;
    let x=0;
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
            alert("Please enter all values");
        }
        else
        {
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
    db.collection("Reg").add({
        Name:a,
        Email:b,
        PhoneNumber:c,
        CollegeName:p
    }).then((docref)=>
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
        alert("Thank you for registering");

    })
    .catch((error)=>
    {
        console.error("Error",error);
    })
    }
}