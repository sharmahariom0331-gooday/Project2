import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, Zap } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const RewardsSection: React.FC = () => {
  const { appliedCoupons, applyCoupon } = useDashboardStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loyaltyPoints = 12500;
  const pointsValue = loyaltyPoints / 100; // 100 points = 1 rupee

  const availableCoupons = [
    {
      code: 'WELCOME10',
      discount: 10,
      discountType: 'percentage' as const,
      description: 'Get 10% off on your first order',
      minAmount: 5000,
    },
    {
      code: 'JEWEL20',
      discount: 20,
      discountType: 'percentage' as const,
      description: 'Get 20% off on jewellery items',
      minAmount: 10000,
    },
    {
      code: 'GIFT500',
      discount: 500,
      discountType: 'fixed' as const,
      description: 'Get ₹500 off on orders above ₹20,000',
      minAmount: 20000,
    },
    {
      code: 'SUMMER25',
      discount: 25,
      discountType: 'percentage' as const,
      description: 'Get 25% off on summer collection',
      minAmount: 15000,
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="rewards-container">
      {/* Loyalty Points */}
      <motion.section
        className="loyalty-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="points-header">
          <Zap size={32} className="points-icon" />
          <div>
            <p className="points-label">Loyalty Points</p>
            <p className="points-value">{loyaltyPoints} Points</p>
          </div>
        </div>
        <p className="points-info">Worth approximately ₹{pointsValue.toFixed(0)}</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(loyaltyPoints % 1000) / 10}%` }}
          />
        </div>
        <p className="next-reward">
          {1000 - (loyaltyPoints % 1000)} points to next reward
        </p>
        <button className="btn-primary">Redeem Points</button>
      </motion.section>

      {/* Available Coupons */}
      <motion.section
        className="coupons-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>Available Coupons</h2>
        <div className="coupons-grid">
          {availableCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.code}
              className="coupon-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="coupon-header">
                <Gift size={24} className="coupon-icon" />
                <span className="discount-badge">
                  {coupon.discount}
                  {coupon.discountType === 'percentage' ? '%' : '₹'} OFF
                </span>
              </div>
              <p className="coupon-description">{coupon.description}</p>
              <p className="min-amount">Min. Order: ₹{coupon.minAmount}</p>
              <div className="coupon-code">
                <code>{coupon.code}</code>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(coupon.code)}
                  title="Copy code"
                >
                  {copiedCode === coupon.code ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <button className="btn-secondary full-width">Apply Coupon</button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Applied Coupons */}
      {appliedCoupons.length > 0 && (
        <motion.section
          className="applied-coupons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Applied Coupons</h2>
          <div className="applied-list">
            {appliedCoupons.map((coupon) => (
              <div key={coupon.code} className="applied-coupon">
                <span className="applied-code">{coupon.code}</span>
                <span className="applied-discount">
                  {coupon.discount}
                  {coupon.discountType === 'percentage' ? '%' : '₹'} OFF
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default RewardsSection;
