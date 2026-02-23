export async function detectBody(file){

    const img = new Image();
    img.src = URL.createObjectURL(file);

    await new Promise(r=> img.onload=r);

    const canvas=document.createElement("canvas");
    canvas.width=img.width;
    canvas.height=img.height;

    const ctx=canvas.getContext("2d");
    ctx.drawImage(img,0,0);

    const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;

    let top=canvas.height, bottom=0, left=canvas.width, right=0;

    for(let y=0;y<canvas.height;y++){
        for(let x=0;x<canvas.width;x++){
            const i=(y*canvas.width+x)*4;
            const r=data[i];
            const g=data[i+1];
            const b=data[i+2];

            if(r>40||g>40||b>40){
                if(y<top) top=y;
                if(y>bottom) bottom=y;
                if(x<left) left=x;
                if(x>right) right=x;
            }
        }
    }

    return{
        src:img.src,
        bounds:{top,bottom,left,right},
        width:img.width,
        height:img.height
    };
}