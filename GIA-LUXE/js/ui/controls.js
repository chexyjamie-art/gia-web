window.handleUpload=function(e){
    const file=e.target.files[0];
    if(file) uploadUserPhoto(file);
}

window.tryProduct=function(id){

    const product={
        id:id,
        type:"topwear",
        image:`assets/products/${id}.png`,
        baseWidth:400
    };

    loadProductTryOn(product);
}

window.saveLook=function(){
    const canvas=document.getElementById("tryonCanvas");
    const link=document.createElement("a");
    link.download="tryon.png";
    link.href=canvas.toDataURL();
    link.click();
}