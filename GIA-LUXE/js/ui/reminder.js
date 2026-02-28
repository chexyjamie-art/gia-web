const lastTry = localStorage.getItem("tryReminder")

if(lastTry){
const mins = (Date.now()-lastTry)/60000
if(mins < 10){
showReminder()
}
}

function showReminder(){
const div=document.createElement("div")
div.innerText="Continue your Try-On?"
div.style=`
position:fixed;
bottom:20px;
left:50%;
transform:translateX(-50%);
background:#111;
color:#fff;
padding:14px 22px;
border-radius:40px;
z-index:9999;
cursor:pointer;
`
div.onclick=()=>location.href="tryon.html"
document.body.appendChild(div)
}