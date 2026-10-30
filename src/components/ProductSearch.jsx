import React, { useState, useEffect, useMemo } from "react";
import productsData from "../Product.json";
import "./ProductSearch.css";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shopcart-products") || "null");
    setAllProducts(stored && stored.length ? stored : productsData);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lowered = query.toLowerCase();
    return allProducts.filter(p =>
      (p.name && p.name.toLowerCase().includes(lowered)) ||
      (p.description && p.description.toLowerCase().includes(lowered)) ||
      (p.price && String(p.price).toLowerCase().includes(lowered))
    );
  }, [query, allProducts]);

  return (
    <div className="product-search-wrapper">
      <input
        type="text"
        placeholder="Search products…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="product-search-input"
      />
      {query && (
        <ul className="search-results">
          {filtered.length === 0 ? (
            <li className="no-results">No matching product</li>
          ) : (
            filtered.map((p, idx) => (
              <li key={idx} className="result-item">
                <strong>{p.name}</strong> – {p.price}
                {p.description && <p className="desc">{p.description}</p>}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
