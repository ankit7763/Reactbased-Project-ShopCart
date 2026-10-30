import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage({ products, loading }) {
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">WELCOME TO SHOPCART</span>
          <h1>Find your next favorite thing.</h1>
          <p>
            Explore a handpicked collection of everyday tech and discover
            something you will love.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="hero-button hero-button-primary">
              Explore products <span aria-hidden="true">→</span>
            </Link>
            <Link to="/addproduct" className="hero-button hero-button-secondary">
              Add a product
            </Link>
          </div>
          <div className="hero-note">
            <span className="hero-note-dot" aria-hidden="true" />
            {loading ? "Getting the collection ready" : `${products.length} products in your collection`}
          </div>
        </div>

        <div className="hero-art" aria-label="Featured product">
          {featuredProducts[0]?.image ? (
            <img
              className="hero-product-image"
              src={featuredProducts[0].image}
              alt={featuredProducts[0].name}
            />
          ) : (
            <div className="hero-image-placeholder" />
          )}
          {featuredProducts[0] && (
            <div className="hero-product-label">
              <span>FEATURED FIND</span>
              <strong>{featuredProducts[0].name}</strong>
              <span>{featuredProducts[0].price}</span>
            </div>
          )}
          <span className="hero-sparkle hero-sparkle-one" aria-hidden="true">✳</span>
          <span className="hero-sparkle hero-sparkle-two" aria-hidden="true">✦</span>
        </div>
      </section>

      <section className="home-collection" aria-labelledby="collection-title">
        <div className="collection-heading">
          <div>
            <span className="section-eyebrow">A LITTLE INSPIRATION</span>
            <h2 id="collection-title">Explore the collection</h2>
          </div>
          <Link to="/products" className="collection-link">
            View all products <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading ? (
          <p className="collection-message">Loading your collection...</p>
        ) : featuredProducts.length > 0 ? (
          <div className="home-product-grid">
            {featuredProducts.map((product, index) => (
              <Link
                to="/products"
                className="home-product-card"
                key={product.id}
              >
                <div className="home-product-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className="home-product-number">0{index + 1}</span>
                </div>
                <div className="home-product-details">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>
                  <span className="home-product-price">{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="collection-message">
            <p>Your collection is ready for its first product.</p>
            <Link to="/addproduct">Add your first product →</Link>
          </div>
        )}
      </section>

      <section className="home-benefits" aria-label="ShopCart features">
        <article>
          <span aria-hidden="true">✦</span>
          <div>
            <h3>Your collection, your way</h3>
            <p>Add, edit, and organize products in one place.</p>
          </div>
        </article>
        <article>
          <span aria-hidden="true">◷</span>
          <div>
            <h3>Ready when you return</h3>
            <p>Your product list stays saved in this browser.</p>
          </div>
        </article>
        <article>
          <span aria-hidden="true">☼</span>
          <div>
            <h3>Make it yours</h3>
            <p>Switch between light and dark mode anytime.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
