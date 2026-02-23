function toast(msg){
let t=document.createElement("div");
t.innerText=msg;
t.style.position="fixed";
t.style.bottom="20px";
t.style.left="50%";
t.style.transform="translateX(-50%)";
t.style.background="#000";
t.style.padding="12px 20px";
t.style.borderRadius="10px";
document.body.appendChild(t);
setTimeout(()=>t.remove(),2000);
}