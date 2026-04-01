import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Gift,
  TrendingUp,
  ArrowRight,
  Package,
  Zap,
} from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import {
  generateMockOrders,
  generateMockAnalytics,
  calculateMonthlySpending,
  formatCurrency,
} from '../utils/helpers';

const DashboardOverview: React.FC = () => {
  const {
    userProfile,
    orders,
    setOrders,
    wishlist,
    cart,
    analyticsData,
    setAnalyticsData,
  } = useDashboardStore();

  useEffect(() => {
    // Load mock data
    if (orders.length === 0) {
      const mockOrders = generateMockOrders();
      setOrders(mockOrders);
    }
    if (!analyticsData) {
      const mockAnalytics = generateMockAnalytics();
      setAnalyticsData(mockAnalytics);
    }
  }, []);

  const monthlySpending = calculateMonthlySpending(orders);
  const recentOrders = orders.slice(0, 3);
  const pendingOrders = orders.filter((o) => o.status !== 'delivered').length;

  const stats = [
    {
      icon: <ShoppingBag size={24} />,
      label: 'Total Orders',
      value: orders.length,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Package size={24} />,
      label: 'In Transit',
      value: pendingOrders,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <Heart size={24} />,
      label: 'Wishlist Items',
      value: wishlist.length,
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: <Gift size={24} />,
      label: 'Loyalty Points',
      value: analyticsData?.loyaltyPoints || 0,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="overview-container">
      {/* Welcome Section */}
      <motion.div
        className="welcome-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="welcome-title">
            Welcome back, {userProfile?.firstName || 'Guest'}! 👋
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your account today
          </p>
        </div>
        <div className="welcome-stats">
          <div className="stat-box">
            <span className="stat-label">This Month</span>
            <span className="stat-value">{formatCurrency(monthlySpending)}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`stat-card bg-gradient-to-br ${stat.color}`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-number">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="overview-grid">
        {/* Recent Orders */}
        <motion.section
          className="overview-card"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h2>Recent Orders</h2>
            <a href="#orders" className="view-all-link">
              View All <ArrowRight size={16} />
            </a>
          </div>
          <div className="orders-list">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-img">
                    <img
                      src={order.items[0]?.productImage}
                      alt={order.items[0]?.productName}
                    />
                  </div>
                  <div className="order-info">
                    <p className="order-name">{order.items[0]?.productName}</p>
                    <p className="order-number">#{order.orderNumber}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${order.status}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="order-price">{formatCurrency(order.total)}</p>
                </div>
              ))
            ) : (
              <p className="empty-message">No orders yet</p>
            )}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className="overview-card"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <ShoppingBag size={24} />
              <span>Continue Shopping</span>
            </button>
            <button className="action-btn">
              <Heart size={24} />
              <span>View Wishlist</span>
            </button>
            <button className="action-btn">
              <Gift size={24} />
              <span>Redeem Rewards</span>
            </button>
            <button className="action-btn">
              <Zap size={24} />
              <span>Track Order</span>
            </button>
          </div>
        </motion.section>

        {/* Spending Overview */}
        <motion.section
          className="overview-card"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <h2>Spending Overview</h2>
            <span className="period-badge">Last 6 Months</span>
          </div>
          <div className="spending-chart">
            <div className="chart-placeholder">
              <TrendingUp size={40} className="chart-icon" />
              <p>Total Spent: {formatCurrency(analyticsData?.totalSpent || 0)}</p>
              <p className="avg-order">
                Avg Order: {formatCurrency(analyticsData?.averageOrderValue || 0)}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Featured Collection */}
        <motion.section
          className="overview-card full-width"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <h2>Recommended For You</h2>
          <div className="recommendations-grid">
            {[
              {
                name: 'Elegant Necklace',
                price: '₹45,000',
                img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300',
              },
              {
                name: 'Sparkle Earrings',
                price: '₹25,000',
                img: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=300',
              },
              {
                name: 'Royal Ring',
                price: '₹35,000',
                img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="recommendation-card"
                whileHover={{ y: -8 }}
              >
                <div className="rec-img">
                  <img src={item.img} alt={item.name} />
                </div>
                <p className="rec-name">{item.name}</p>
                <p className="rec-price">{item.price}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DashboardOverview;
