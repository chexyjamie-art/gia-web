async function loadProducts(){
let res = await fetch("data/prices.json");
let data = await res.json();

let box = document.getElementById("products");

data.forEach(p=>{
box.innerHTML+=`
<div class="card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="buy('${p.link}')">Buy Now</button>
<button onclick="tryOn('${p.img}')">Try</button>
</div>
`;
});
}

function buy(link){
window.open(link,"_blank");
}

function tryOn(img){
localStorage.setItem("tryProduct",img);
location.href="tryon.html";
}

function openAI(){
document.getElementById("aiBox").classList.toggle("hidden");
}

loadProducts();