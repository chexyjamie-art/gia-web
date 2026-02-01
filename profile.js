let tempImage = "";

function uploadDP(){
  document.getElementById("dpInput").click();
}

function changeDP(event){
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e){
    tempImage = e.target.result;
    document.getElementById("cropPreview").src = tempImage;
    document.getElementById("cropBox").style.display = "block";
  };

  reader.readAsDataURL(file);
}

// FULL PHOTO SAVE
function saveFullImage(){
  document.getElementById("profilePic").src = tempImage;
  localStorage.setItem("profileDP", tempImage);
  document.getElementById("cropBox").style.display = "none";
}

// CROPPED SAVE
function saveCropped(){
  const img = document.getElementById("cropPreview");

  const canvas = document.createElement("canvas");
  const size = Math.min(img.width, img.height);

  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    (img.width - size)/2,
    (img.height - size)/2,
    size,
    size,
    0,
    0,
    size,
    size
  );

  const croppedData = canvas.toDataURL();
  document.getElementById("profilePic").src = croppedData;
  localStorage.setItem("profileDP", croppedData);
  document.getElementById("cropBox").style.display = "none";
}

// LOAD SAVED DP
window.onload = function(){
  const savedDP = localStorage.getItem("profileDP");
  if(savedDP){
    document.getElementById("profilePic").src = savedDP;
  }
};

// AI SETTINGS TOGGLE
function openAISettings(){
  const box = document.getElementById("aiSettingsBox");

  if(box.style.display === "block"){
    box.style.display = "none";
  } else {
    box.style.display = "block";
  }
}

// ================= AUTO SAVE PROFILE DATA =================

// Load saved data on page open
window.onload = function () {
  loadProfileData();
};

function saveProfile() {
  const profileData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    dp: document.getElementById("profilePic").src
  };

  localStorage.setItem("giaProfile", JSON.stringify(profileData));
  alert("Profile Auto Saved ✅");
}

function loadProfileData() {
  const saved = localStorage.getItem("giaProfile");
  if (!saved) return;

  const data = JSON.parse(saved);

  document.getElementById("name").value = data.name || "";
  document.getElementById("gender").value = data.gender || "";
  document.getElementById("mobile").value = data.mobile || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("address").value = data.address || "";

  if (data.dp) {
    document.getElementById("profilePic").src = data.dp;
  }
}