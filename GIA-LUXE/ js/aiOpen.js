async function runAI(){

let q=document.getElementById("aiInput").value.toLowerCase();
let res=await fetch("data/prices.json");
let products=await res.json();

let results=products.filter(p=>p.name.toLowerCase().includes(q));

let box=document.getElementById("products");
box.innerHTML="";

results.forEach(p=>{
box.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="buy('${p.link}')">Buy</button>
</div>`;
});
}