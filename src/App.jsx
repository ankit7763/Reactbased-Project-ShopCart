import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import ProductForm from "./ProductForm";
import HomePage from "./HomePage";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "./api.js";

function App() {

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") ?? "light");

  useEffect(() => {
    const root = document.documentElement;
    root.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("❌ Could not load products.");
        setLoading(false);
      });
  }, []);


  const addProduct = async (newProd) => {
    try {
      const saved = await createProduct(newProd);
      setProducts(prev => [...prev, saved]);
    } catch {
      alert("Failed to add product.");
    }
  };


  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Failed to delete product.");
    }
  };


  const editProduct = async (id, updatedData) => {
    try {
      const updated = await updateProduct(id, updatedData);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    } catch {
      alert("Failed to update product.");
    }
  };


  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<HomePage products={products} loading={loading} />} />

        <Route
          path="/products"
          element={
            <>
              <h1>Our Products</h1>
              {searchQuery && filteredProducts.length > 0 && (
                <p className="search-status">
                  Showing {filteredProducts.length} result(s) for "{searchQuery}"
                </p>
              )}

              {loading && <p className="search-status">⏳ Loading products...</p>}
              {error && <p style={{ color: "red", padding: "1rem" }}>{error}</p>}

              {!loading && !error && (
                <div className="product-list">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onDelete={removeProduct}
                        onEdit={editProduct}
                      />
                    ))
                  ) : (
                    <div className="no-products-found">
                      <span>😕</span>
                      <p>No products found{searchQuery ? ` for "${searchQuery}"` : ""}!</p>
                      <small>Try a different search term or add a new product.</small>
                    </div>
                  )}
                </div>
              )}
            </>
          }
        />

        <Route
          path="/addproduct"
          element={<ProductForm onAdd={addProduct} />}
        />
      </Routes>
    </div>
  );
}

export default App;
