export function renderProduct(body,product,placement){

    const canvas=document.getElementById("tryonCanvas");
    const ctx=canvas.getContext("2d");

    const userImg=new Image();
    userImg.src=body.src;

    const prodImg=new Image();
    prodImg.src=product.image;

    userImg.onload=()=>{
        canvas.width=userImg.width;
        canvas.height=userImg.height;

        ctx.drawImage(userImg,0,0);

        prodImg.onload=()=>{

            const w=prodImg.width*placement.scale;
            const h=prodImg.height*placement.scale;

            ctx.drawImage(
                prodImg,
                placement.x-w/2,
                placement.y,
                w,
                h
            );
        }
    }
}