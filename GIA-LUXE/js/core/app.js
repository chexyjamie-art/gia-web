import { detectBody } from "../api/bodyDetect.js";
import { placeProduct } from "../ai/placementAI.js";
import { renderProduct } from "../tryon/tryonEngine.js";

let userImage = null;
let productData = null;

window.uploadUserPhoto = async function(file){
    userImage = await detectBody(file);
    document.getElementById("preview").src = userImage.src;
};

window.loadProductTryOn = function(product){
    productData = product;
    const placement = placeProduct(userImage, productData);
    renderProduct(userImage, productData, placement);
};