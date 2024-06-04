var userName = document.getElementById("name");
var userMail = document.getElementById("mail");
var userPass = document.getElementById("pass");
var btnSignup = document.getElementById("btnSignup");
var alertMsg = document.getElementById("alertMsg");
var successMsg = document.getElementById("successMsg");
var existMsg = document.getElementById("existMsg");

var users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (userName.value == "" || userMail.value == "" || userPass.value == "") {
      alertMsg.classList.remove("d-none");
      toastr.error("All inputs is required");
    } else {
      alertMsg.classList.add("d-none");
      if (validation(userName) && validation(userMail) && validation(userPass))
        getData();
    }
  }
});

btnSignup.addEventListener("click", function () {
  if (userName.value == "" || userMail.value == "" || userPass.value == "") {
    alertMsg.classList.remove("d-none");
    toastr.error("All inputs is required");
  } else {
    alertMsg.classList.add("d-none");
    if (validation(userName) && validation(userMail) && validation(userPass))
      getData();
  }
});

function getData() {
  var userData = {
    name: userName.value,
    mail: userMail.value,
    pass: userPass.value,
  };

  var index = true;

  for (var i = 0; i < users.length; i++) {
    if (userData.mail == users[i].mail) {
      index = false;
    }
  }

  if (index) {
    existMsg.classList.add("d-none");
    successMsg.classList.remove("d-none");
    toastr.success("Successfully");

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(() => {
      location.href = "./index.html";
    }, 300);
  } else {
    existMsg.classList.remove("d-none");
    successMsg.classList.add("d-none");
    toastr.warning("Email already exists");
  }
}

function validation(item) {
  var regex = {
    name: /^[a-zA-Z]{3,}$/,
    mail: /^.{3,}@(gmail|yahoo).com$/,
    pass: /^[A-Z][a-z0-9]{7}$/,
  };

  if (regex[item.id].test(item.value)) {
    item.classList.remove("is-invalid");
    item.classList.add("is-valid");
    return true;
  } else {
    item.classList.remove("is-valid");
    item.classList.add("is-invalid");
    return false;
  }
}

document.addEventListener("input", function (e) {
  validation(e.target);
  successMsg.classList.add("d-none");
  alertMsg.classList.add("d-none");
  existMsg.classList.add("d-none");
});
