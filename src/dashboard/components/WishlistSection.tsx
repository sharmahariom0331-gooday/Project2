import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const WishlistSection: React.FC = () => {
  const { wishlist, removeFromWishlist } = useDashboardStore();

  return (
    <div className="wishlist-container">
      <div className="section-header">
        <h1>My Wishlist</h1>
        <p className="section-subtitle">{wishlist.length} items saved</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              className="wishlist-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <div className="wishlist-image">
                <img src={item.productImage} alt={item.productName} />
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.productId)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="wishlist-info">
                <h3>{item.productName}</h3>
                <p className="material">{item.material}</p>
                <p className="price">{item.price}</p>
                <p className="added-date">Added {item.addedAt}</p>
              </div>
              <button className="add-to-cart-btn">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={48} />
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite items to view them later</p>
          <button className="btn-primary">Start Shopping</button>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;
