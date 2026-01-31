function goWishlist() {
  alert("Wishlist page coming next");
}

function logout() {
  alert("Logged out successfully");
  window.location.href = "index.html";
}

function saveProfile(){
  const profileData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("giaProfile", JSON.stringify(profileData));
  alert("Profile Saved Successfully ✅");
}

window.onload = function(){
  const saved = JSON.parse(localStorage.getItem("giaProfile"));

  if(saved){
    document.getElementById("name").value = saved.name;
    document.getElementById("gender").value = saved.gender;
    document.getElementById("mobile").value = saved.mobile;
    document.getElementById("email").value = saved.email;
    document.getElementById("address").value = saved.address;
  }
}

function uploadDP(){
  document.getElementById("dpInput").click();
}

function changeDP(event){
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    const imgData = e.target.result;
    document.getElementById("profilePic").src = imgData;
    localStorage.setItem("profileDP", imgData);
  };

  reader.readAsDataURL(file);
}

window.onload = function(){
  const savedDP = localStorage.getItem("profileDP");
  if(savedDP){
    document.getElementById("profilePic").src = savedDP;
  }
}