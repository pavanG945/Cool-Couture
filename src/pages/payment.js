import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './payment.css';

const paymentModes = [
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
  { value: 'netbanking', label: 'Net Banking' },
  { value: 'cod', label: 'Cash on Delivery' }
];

function Payment() {
  const { getCartTotal } = useCart();
  const [mode, setMode] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [upi, setUpi] = useState('');
  const [bank, setBank] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Payment</h2>
        <div className="payment-summary">
          <span>Total Amount:</span>
          <span className="payment-total">₹{getCartTotal().toFixed(2)}</span>
        </div>
        <div className="payment-modes">
          {paymentModes.map(pm => (
            <button
              key={pm.value}
              className={`mode-btn${mode === pm.value ? ' active' : ''}`}
              onClick={() => setMode(pm.value)}
              type="button"
            >
              {pm.label}
            </button>
          ))}
        </div>
        {success ? (
          <div className="payment-success">
            <h3>Payment Successful!</h3>
            <p>Thank you for your purchase.</p>
          </div>
        ) : (
          <form className="payment-form" onSubmit={handleSubmit}>
            {mode === 'card' && (
              <>
                <label>Name on Card</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Full Name"
                />
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  required
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <div className="payment-row">
                  <div>
                    <label>Expiry</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={e => setExpiry(e.target.value)}
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div className="cvv-col">
                    <label>CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                      required
                      placeholder="123"
                      maxLength={4}
                      className="cvv-input"
                    />
                  </div>
                </div>
              </>
            )}
            {mode === 'upi' && (
              <>
                <label>UPI ID</label>
                <input
                  type="text"
                  value={upi}
                  onChange={e => setUpi(e.target.value)}
                  required
                  placeholder="yourname@upi"
                />
              </>
            )}
            {mode === 'netbanking' && (
              <>
                <label>Select Bank</label>
                <select value={bank} onChange={e => setBank(e.target.value)} required>
                  <option value="">Choose Bank</option>
                  <option value="sbi">SBI</option>
                  <option value="hdfc">HDFC</option>
                  <option value="icici">ICICI</option>
                  <option value="axis">Axis</option>
                  <option value="kotak">Kotak</option>
                </select>
              </>
            )}
            {mode === 'cod' && (
              <div className="cod-info">
                <p>Pay with cash when your order is delivered.</p>
              </div>
            )}
            <button type="submit" className="pay-btn">
              {mode === 'cod' ? 'Place Order' : 'Pay Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;
