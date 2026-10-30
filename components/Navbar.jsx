import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ onToggleTheme, currentTheme, searchQuery, onSearch }) => (
    <header className="navbar">

        {/* LEFT — Logo */}
        <div className="nav-left">
            <div className="logo">ShopCart</div>
        </div>

        {/* CENTER — Search Bar */}
        <div className="nav-center">
            <div className="search-bar-wrapper">
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                />
                {searchQuery && (
                    <button className="search-clear" onClick={() => onSearch("")} title="Clear search">
                        ✕
                    </button>
                )}
            </div>
        </div>

        {/* RIGHT — Nav Links + Theme Toggle */}
        <div className="nav-right">
            <nav>
                <Link to="/products">Products</Link>
                <Link to="/AddProduct">Add Product</Link>
            </nav>
            <button className="theme-toggle" onClick={onToggleTheme}>
                {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
        </div>

    </header>
);

export default Navbar;