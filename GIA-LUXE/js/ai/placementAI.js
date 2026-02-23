export function placeProduct(body,product){

    const h = body.bounds.bottom-body.bounds.top;
    const w = body.bounds.right-body.bounds.left;

    let pos={x:0,y:0,scale:1};

    if(product.type==="topwear"){
        pos.y=body.bounds.top + h*0.15;
        pos.scale=w/product.baseWidth;
    }

    if(product.type==="bottomwear"){
        pos.y=body.bounds.top + h*0.55;
        pos.scale=w/product.baseWidth*0.9;
    }

    if(product.type==="footwear"){
        pos.y=body.bounds.bottom - h*0.15;
        pos.scale=w/product.baseWidth*0.6;
    }

    if(product.type==="glasses"){
        pos.y=body.bounds.top + h*0.12;
        pos.scale=w/product.baseWidth*0.4;
    }

    if(product.type==="watch"){
        pos.y=body.bounds.top + h*0.55;
        pos.scale=w/product.baseWidth*0.3;
    }

    pos.x=(body.bounds.left+body.bounds.right)/2;

    return pos;
}