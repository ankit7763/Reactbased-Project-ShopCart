import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = ({ onAdd }) => {

    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name.trim() || !product.price.trim()) {
            alert("Name and price are required.");
            return;
        }

        setSubmitting(true);
        try {
            await onAdd(product);
            setProduct({ name: "", price: "", description: "", image: "" });
            navigate("/products");
        } catch (err) {
            alert("Failed to add product.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>Add a New Product</h2>

            <input
                type="text"
                name="name"
                placeholder="Product name"
                value={product.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="price"
                placeholder="Price (e.g. ₹ 1999)"
                value={product.price}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Short description"
                value={product.description}
                onChange={handleChange}
                rows={3}
            />

            <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={product.image}
                onChange={handleChange}
            />

            <button type="submit" className="add-product-button" disabled={submitting}>
                {submitting ? "Adding..." : "Add Product"}
            </button>
        </form>
    );
};

export default ProductForm;
