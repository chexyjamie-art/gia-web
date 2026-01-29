const chatBox = document.getElementById("aiChatBox");

function sendMessage() {
  const input = document.getElementById("aiInput");
  const msg = input.value.toLowerCase();
  input.value = "";

  addMsg("You", msg);

  let reply = generateAIReply(msg);
  addMsg("GIA AI", reply);
}

function addMsg(user, text) {
  const div = document.createElement("div");
  div.innerHTML = `<b>${user}:</b> ${text}`;
  chatBox.appendChild(div);
}

function generateAIReply(msg) {
  if (msg.includes("watch"))
    return "I suggest a minimalist watch under ₹10k for daily elegance.";
  if (msg.includes("date"))
    return "For a date look: neutral shirt + clean shoes + signature perfume.";
  if (msg.includes("office"))
    return "Smart casual works best — muted tones with one standout accessory.";
  return "Tell me your occasion & budget — I'll suggest the perfect style.";
}