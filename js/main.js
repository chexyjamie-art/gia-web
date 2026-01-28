// Greeting based on time
const greetingEl = document.getElementById('greeting');
const hours = new Date().getHours();

let greet = "Hello!";
if(hours < 12) greet = "Good Morning";
else if(hours < 17) greet = "Good Afternoon";
else greet = "Good Evening";

if(greetingEl) {
  greetingEl.innerText = `${greet}, User! Aaj main aapke liye kis chiz me madad kar sakta hoon?`;
}