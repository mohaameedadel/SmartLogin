var userInfo = document.getElementById("userInfo");
var btnLogOut = document.getElementById("btnLogOut");

userInfo.innerHTML = `"${localStorage.getItem("userName")}"`;

toastr.success(`Hello ${localStorage.getItem("userName")}`)

btnLogOut.addEventListener("click", function () {
  localStorage.removeItem("userName");
  location.href = "./index.html";
});
