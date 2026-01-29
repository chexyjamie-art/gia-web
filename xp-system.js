let xp = localStorage.getItem("xp") || 0;

function addXP(points) {
  xp = parseInt(xp) + points;
  localStorage.setItem("xp", xp);
  updateXPDisplay();
}

function updateXPDisplay() {
  document.getElementById("xpBox").innerText =
    "Style XP: " + xp;
}

updateXPDisplay();