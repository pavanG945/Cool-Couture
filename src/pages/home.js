import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext'; // Removed unused import
import { useSearch } from '../context/SearchContext';
import './home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { searchQuery, searchResults, isSearching, searchError } = useSearch();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products', {
          cancelToken: source.token,
          timeout: 5000
        });
        setProducts(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Failed to load products. Please try again later.');
          console.error('API Error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      source.cancel('Component unmounted');
    };
  }, []);

  // Determine which products to display
  const displayProducts = searchQuery ? searchResults : products;
  const isDisplayingSearchResults = searchQuery && searchQuery.trim() !== '';

  if (error) {
    return (
      <div className="container">
        <div className="error-banner">
          ⚠️ {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>Discover Indian Elegance</h1>
        <p>Shop the latest trends in Indian clothing & accessories</p>
        <Link to="/shop" className="btn">Shop Now</Link>
      </section>

      <main>
        <h2 className="section-title">
          {isDisplayingSearchResults 
            ? `Search Results for "${searchQuery}"` 
            : 'Featured Products'
          }
        </h2>
        
        {searchError && (
          <div className="error-banner">
            ⚠️ {searchError}
          </div>
        )}

        {isDisplayingSearchResults && isSearching ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Searching products...</p>
          </div>
        ) : loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="no-products">
            {isDisplayingSearchResults ? (
              <>
                <p>No products found for "{searchQuery}".</p>
                <p>Try searching with different keywords.</p>
              </>
            ) : (
              <>
                <p>No products found.</p>
                <button onClick={() => window.location.reload()}>Refresh</button>
              </>
            )}
          </div>
        ) : (
          <div className="product-grid">
            {displayProducts.map(product => (
              <div className="product-card" key={product._id}>
                <img src={product.images[0]} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>&copy; 2025 Cool Couture. All rights reserved.</p>
        <p style={{fontSize: '1rem', color: '#ff7043', marginTop: '0.2rem'}}>Made with <span role="img" aria-label="love">❤️</span> by GPK</p>
      </footer>
    </div>
  );
}

export default Home;