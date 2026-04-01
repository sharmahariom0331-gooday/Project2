import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, Share2 } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { formatDate } from '../utils/helpers';

const CollectionSection: React.FC = () => {
  const { collection } = useDashboardStore();

  const mockCollection = [
    {
      id: '1',
      productId: '1',
      productName: 'Exquisite Gold Gheroo Haram',
      productImage:
        'https://www.tanishq.co.in/dw/image/v2/BKCH_PRD/on/demandware.static/-/Sites-tan-ak-master/default/dw15b5e7ef/product/images/50/511518NFAAAB2_1.jpg?sw=640&sh=640',
      purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: '₹706,345',
      material: '22K Gold',
      weight: '85.5g',
    },
    {
      id: '2',
      productId: '2',
      productName: 'Spectacular Leaf Pattern Gold Haram',
      productImage:
        'https://www.tanishq.co.in/dw/image/v2/BKCH_PRD/on/demandware.static/-/Sites-tan-ak-master/default/dw86a7d25e/product/images/51/511518NMAAAB2_1.jpg?sw=640&sh=640',
      purchaseDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      price: '₹1,496,571',
      material: '22K Gold',
      weight: '150.2g',
    },
  ];

  const displayCollection = collection.length > 0 ? collection : mockCollection;

  return (
    <div className="collection-container">
      <div className="section-header">
        <h1>Your Collection</h1>
        <p className="section-subtitle">
          {displayCollection.length} pieces in your collection
        </p>
      </div>

      {displayCollection.length > 0 ? (
        <div className="collection-grid">
          {displayCollection.map((item, index) => (
            <motion.div
              key={item.id}
              className="collection-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <div className="collection-image">
                <img src={item.productImage} alt={item.productName} />
                <div className="image-overlay">
                  <div className="overlay-actions">
                    <button className="action-icon" title="Download">
                      <Download size={20} />
                    </button>
                    <button className="action-icon" title="Share">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="collection-info">
                <h3>{item.productName}</h3>
                <p className="purchase-date">
                  Purchased: {formatDate(item.purchaseDate)}
                </p>
                <div className="specs">
                  <span className="spec-item">
                    <strong>Material:</strong> {item.material}
                  </span>
                  {item.weight && (
                    <span className="spec-item">
                      <strong>Weight:</strong> {item.weight}
                    </span>
                  )}
                </div>
                <p className="item-price">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Sparkles size={48} />
          <h3>Your collection is empty</h3>
          <p>Once you purchase jewelry, they will appear in your collection</p>
          <button className="btn-primary">Start Shopping</button>
        </div>
      )}
    </div>
  );
};

export default CollectionSection;
