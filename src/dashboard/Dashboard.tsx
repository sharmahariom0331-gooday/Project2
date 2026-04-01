import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  Bell,
  Gift,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Package,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { useDashboardStore } from './store/dashboardStore';
import DashboardOverview from './components/DashboardOverview';
import ProfileSection from './components/ProfileSection';
import OrdersSection from './components/OrdersSection';
import WishlistSection from './components/WishlistSection';
import CartSection from './components/CartSection';
import PaymentSection from './components/PaymentSection';
import NotificationsSection from './components/NotificationsSection';
import RewardsSection from './components/RewardsSection';
import CollectionSection from './components/CollectionSection';
import AnalyticsSection from './components/AnalyticsSection';
import SettingsSection from './components/SettingsSection';
import './styles/dashboard.css';

type DashboardTab =
  | 'overview'
  | 'profile'
  | 'orders'
  | 'wishlist'
  | 'cart'
  | 'payments'
  | 'notifications'
  | 'rewards'
  | 'collection'
  | 'analytics'
  | 'settings';

interface DashboardNavItem {
  id: DashboardTab;
  label: string;
  icon: React.ReactNode;
}

const Dashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile, userSettings } = useDashboardStore();

  const navItems: DashboardNavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Home size={20} />,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={20} />,
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <Package size={20} />,
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: <Heart size={20} />,
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: <ShoppingBag size={20} />,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <CreditCard size={20} />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={20} />,
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: <Gift size={20} />,
    },
    {
      id: 'collection',
      label: 'Collection',
      icon: <Sparkles size={20} />,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
    },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  const renderContent = () => {
    const variants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    };

    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileSection />;
      case 'orders':
        return <OrdersSection />;
      case 'wishlist':
        return <WishlistSection />;
      case 'cart':
        return <CartSection />;
      case 'payments':
        return <PaymentSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'rewards':
        return <RewardsSection />;
      case 'collection':
        return <CollectionSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div
      className={`dashboard-container ${userSettings.theme}`}
      style={{
        '--primary-color': '#D4AF37',
        '--dark-bg': '#0a0a0a',
        '--light-bg': '#ffffff',
      } as React.CSSProperties}
    >
      {/* Sidebar Navigation */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            <Sparkles size={24} className="logo-icon" />
            AKSHIMA
          </h2>
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="user-card">
          <div className="user-avatar">
            {userProfile?.profilePhoto ? (
              <img src={userProfile.profilePhoto} alt={userProfile.firstName} />
            ) : (
              <div className="avatar-placeholder">
                {userProfile?.firstName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="user-info">
            <p className="user-name">
              {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Guest User'}
            </p>
            <p className="user-email">{userProfile?.email || 'user@example.com'}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.id === 'notifications' && (
                <span className="nav-badge">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={() => {
              onLogout?.();
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Main Content Area */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
