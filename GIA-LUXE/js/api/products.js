function detectType(title){

title=title.toLowerCase()

if(title.includes("shirt")||title.includes("tshirt")) return "topwear"
if(title.includes("pant")||title.includes("jean")) return "bottomwear"
if(title.includes("shoe")||title.includes("sneaker")) return "footwear"
if(title.includes("glass")) return "glasses"
if(title.includes("watch")) return "watch"

return "topwear"
}