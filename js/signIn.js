var userMail = document.getElementById("mail");
var userPass = document.getElementById("pass");
var btnSignin = document.getElementById("btnSignin");

var alertMsg = document.getElementById("alertMsg");
var successMsg = document.getElementById("successMsg");
var existMsg = document.getElementById("existMsg");
var users = [];

if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    if (userMail.value == "" || userPass.value == "") {
      alertMsg.classList.remove("d-none");
      toastr.error("All inputs is required");
    } else {
      alertMsg.classList.add("d-none");
      if (validation(userMail) && validation(userPass)) getData();
    }
  }
});

btnSignin.addEventListener("click", function () {
  if (userMail.value == "" || userPass.value == "") {
    alertMsg.classList.remove("d-none");
    toastr.error("All inputs is required");
  } else {
    alertMsg.classList.add("d-none");
    if (validation(userMail) && validation(userPass)) getData();
  }
});

function getData() {
  var userData = {
    mail: userMail.value,
    pass: userPass.value,
  };

  var check = false;

  for (var i = 0; i < users.length; i++) {
    if (userData.mail == users[i].mail && userData.pass == users[i].pass) {
      var userName = users[i].name;
      check = true;
    }
  }

  if (check) {
    alertMsg.classList.add("d-none");
    existMsg.classList.add("d-none");
    successMsg.classList.remove("d-none");

    toastr.success("Successfully");
    setTimeout(() => {
      localStorage.setItem("userName", `${userName}`);
      location.href = "./home.html";
    }, 300);
  } else {
    existMsg.classList.remove("d-none");
    toastr.warning("That was an invalid email or password. Try again!");
  }
}

function validation(item) {
  var regex = {
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
