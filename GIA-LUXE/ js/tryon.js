const product=localStorage.getItem("tryProduct");

function addCloth(texture){
const loader=new THREE.TextureLoader();
let tex=loader.load(texture);

let geo=new THREE.PlaneGeometry(5,6,30,30);
let mat=new THREE.MeshBasicMaterial({map:tex,transparent:true});
let mesh=new THREE.Mesh(geo,mat);

mesh.position.z=0.2;
scene.add(mesh);
}

setTimeout(()=>{
if(product) addCloth(product);
},1000);