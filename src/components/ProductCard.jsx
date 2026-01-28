export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p className="price">{product.price}</p>
      <button>Buy Now →</button>
    </div>
  );
}