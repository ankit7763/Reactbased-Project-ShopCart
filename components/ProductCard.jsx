import React, { useState } from "react";

const ProductCard = ({ product, onDelete, onEdit }) => {
    const { id, name, price, description, image } = product;
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({ name, price, description, image });

    const handleAddToCart = () => {
        alert(`"${name}" Added to cart!`);
    };

    const handleDelete = () => {
        if (window.confirm(`"${name}" ko delete karna chahte ho?`)) {
            onDelete(id);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditValues(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEdit(id, editValues);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="product-card edit-card">
                <h3>Edit Product</h3>
                <form onSubmit={handleEditSubmit} className="edit-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={editValues.name}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={editValues.price}
                        onChange={handleEditChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={editValues.description}
                        onChange={handleEditChange}
                        rows={3}
                    />
                    <input
                        type="url"
                        name="image"
                        placeholder="Image URL"
                        value={editValues.image}
                        onChange={handleEditChange}
                    />
                    <div className="edit-form-actions">
                        <button type="submit" className="save-btn">💾 Save</button>
                        <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>✕ Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />
            <h2 className="product-name">{name}</h2>
            <p className="product-description">{description}</p>
            <p className="product-price">{price}</p>
            <div className="button-group">
                <button onClick={handleAddToCart} className="add-to-cart-button">🛒 Add to cart</button>
                <div className="secondary-buttons">
                    <button onClick={() => setIsEditing(true)} className="edit-button">✏️ Edit</button>
                    <button onClick={handleDelete} className="delete-button">🗑️ Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
