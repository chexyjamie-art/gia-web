import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import products from "../data/products";

export default function Home() {
  return (
    <>
      <Header />
      <SearchBar />

      <section className="hero">
        <h1>Curated luxury for you, Rahul</h1>
        <p>Smart choices recommended by AI.</p>
      </section>

      <CategoryTabs />

      <section className="products">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>

      <Footer />
    </>
  );
}