let newUserNameInput = document.getElementById("newusername");
let newUseremailInput = document.getElementById("newuseremail");
let newUserpasswordInput = document.getElementById("newuserpassword");
let signupMsg = document.querySelector(".msg span");
let index;
let signupBtn = document.getElementById("signupbtn");

let users = [];

if (JSON.parse(localStorage.getItem("usercontainer")) != null) {
  users = JSON.parse(localStorage.getItem("usercontainer"));
}

if (JSON.parse(localStorage.getItem("elementindex")) != null) {
  index = JSON.parse(localStorage.getItem("elementindex"));
}

if (signupBtn != null) {
  signupBtn.addEventListener("click", function () {
    addNewUser();
    clearInputs();
  });
}

function addNewUser() {
  if (
    signUpValidation(newUserNameInput) &&
    signUpValidation(newUseremailInput) &&
    signUpValidation(newUserpasswordInput)
  ) {
    user = {
      name: newUserNameInput.value,
      email: newUseremailInput.value,
      password: newUserpasswordInput.value,
    };

    users.push(user);
    localStorage.setItem("usercontainer", JSON.stringify(users));
  }
  console.log(users);
}

function signUpValidation(input) {
  regex = {
    newusername: /^.+$/,
    newuseremail: /^[a-zA-Z0-9._]+@gmail\.com$/,
    newuserpassword: /^.+$/,
  };

  let text = input.value;

  if (regex[input.id].test(text)) {
    signupMsg.innerHTML = `success`;
    signupMsg.style.color = "green";
    signupMsg.classList.remove("d-none");

    return true;
  } else {
    signupMsg.innerHTML = `All inputs is required`;
    signupMsg.style.color = "red";
    signupMsg.classList.remove("d-none");

    return false;
  }
}

function clearInputs() {
  newUserNameInput.value = null;
  newUseremailInput.value = null;
  newUserpasswordInput.value = null;
}

//                           sign in page

let signinEmailUser = document.getElementById("signinuseremail");
let signinPasswordUser = document.getElementById("signinuserpassword");
let loginBtn = document.getElementById("loginbtn");
let loginMsgText = document.getElementById("loginmsgtext");

loginBtn.addEventListener("click", function () {
  checkLogin();
});

function checkLogin() {
  if (
    signinEmailUser.value.trim() === "" ||
    signinPasswordUser.value.trim() === ""
  ) {
    loginMsgText.innerHTML = `All inputs is required`;
    loginMsgText.style.color = "red";
    loginMsgText.classList.remove("d-none");
    return false;
  }

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === signinEmailUser.value &&
      users[i].password === signinPasswordUser.value
    ) {
      index = i;
      localStorage.setItem("elementindex", JSON.stringify(index));
      window.location.href = "home.html";
      return true;
    }
    loginMsgText.innerHTML = `incorrect email or password`;
    loginMsgText.style.color = "red";
    loginMsgText.classList.remove("d-none");
    console.log(signinEmailUser.value);
    console.log(users[i].email);
  }
}

//     home page
let welcomeMsg = document.getElementById("welcomemsg");

welcomeMsg.innerHTML = `${users[index].name}`;
console.log(index);
