function upgradePlan() {
  alert("Redirecting to payment gateway...");
}

function isPremium() {
  return localStorage.getItem("premium") === "true";
}

function tryOnLock() {
  if (!isPremium()) {
    alert("Premium Feature 🔒 Upgrade to access Try-On");
    return;
  }
  alert("Launching AI Try-On...");
}