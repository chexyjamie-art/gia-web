function generateOutfit(occasion) {
  let outfit;

  switch (occasion) {
    case "date":
      outfit = "Black shirt + Slim jeans + Leather watch";
      break;
    case "office":
      outfit = "Formal shirt + Trousers + Oxford shoes";
      break;
    default:
      outfit = "Casual tee + Sneakers + Smartwatch";
  }

  document.getElementById("outfitResult").innerText = outfit;
}