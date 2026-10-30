import React, { useState, useEffect } from "react";
import productsData from "./Product.json";
import "./components/ProductSearch.css";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shopcart-products") || "null");
    setProducts(stored && stored.length ? stored : productsData);
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-search-wrapper">
      <input
        type="text"
        className="product-search-input"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="search-results">
        {filtered.length > 0 ? (
          filtered.map(product => (
            <li key={product.id} className="result-item">
              <strong>{product.name}</strong> - {product.price}
              <p className="desc">{product.description}</p>
            </li>
          ))
        ) : (
          <li className="no-results">No matching products</li>
        )}
      </ul>
    </div>
  );
};

export default ProductSearch;
