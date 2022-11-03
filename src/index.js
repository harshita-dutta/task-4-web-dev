import "./firebaseUtils"

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
