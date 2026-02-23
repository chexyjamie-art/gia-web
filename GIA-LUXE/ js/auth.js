function login(){
let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;

if(!name||!phone) return alert("Fill details");

localStorage.setItem("giaUserName",name);
localStorage.setItem("giaUserPhone",phone);

location.href="index.html";
}