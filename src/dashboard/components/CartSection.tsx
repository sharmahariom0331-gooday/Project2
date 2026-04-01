import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { formatCurrency } from '../utils/helpers';

const CartSection: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    getCartTotal,
    clearCart,
  } = useDashboardStore();

  const total = getCartTotal();
  const tax = Math.round(total * 0.06);
  const finalTotal = total + tax;

  return (
    <div className="cart-container">
      <div className="section-header">
        <h1>Shopping Cart</h1>
        <p className="section-subtitle">{cart.length} items</p>
      </div>

      {cart.length > 0 ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="item-image">
                  <img src={item.productImage} alt={item.productName} />
                </div>
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p className="item-price">{formatCurrency(item.price)}</p>
                </div>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      updateCartItem(item.productId, Math.max(1, item.quantity - 1))
                    }
                    className="qty-btn"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                    className="qty-btn"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="item-total">
                  <p>{formatCurrency(item.total)}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (6%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>
            <button className="btn-primary full-width">Proceed to Checkout</button>
            <button className="btn-secondary full-width" onClick={() => clearCart()}>
              Clear Cart
            </button>
          </motion.div>
        </div>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={48} />
          <h3>Your cart is empty</h3>
          <p>Add items to your cart to see them here</p>
          <button className="btn-primary">Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default CartSection;
