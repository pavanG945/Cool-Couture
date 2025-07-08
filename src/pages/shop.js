import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './shop.css';

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Group products by category
  const clothes = products.filter(p => (p.category || '').toLowerCase().includes('clothes'));
  const accessories = products.filter(p => (p.category || '').toLowerCase().includes('accessories'));
  const others = products.filter(p => !clothes.includes(p) && !accessories.includes(p));

  return (
    <div className="container shop-container">
      <h1 className="shop-title">Shop All Products</h1>
      {error && <div className="error-banner">{error}</div>}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          <section className="shop-section">
            <h2 className="section-title">Clothes</h2>
            <div className="product-grid">
              {clothes.length === 0 ? <p>No clothes found.</p> : clothes.map(product => (
                <div className="product-card" key={product._id}>
                  <img src={product.images[0]} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price}</p>
                  <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>
          <section className="shop-section">
            <h2 className="section-title">Accessories</h2>
            <div className="product-grid">
              {accessories.length === 0 ? <p>No accessories found.</p> : accessories.map(product => (
                <div className="product-card" key={product._id}>
                  <img src={product.images[0]} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price}</p>
                  <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>
          {others.length > 0 && (
            <section className="shop-section">
              <h2 className="section-title">Other Products</h2>
              <div className="product-grid">
                {others.map(product => (
                  <div className="product-card" key={product._id}>
                    <img src={product.images[0]} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price}</p>
                    <button className="add-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Shop; 