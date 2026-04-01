import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Package, Tag, AlertCircle, Trash2 } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { formatDate } from '../utils/helpers';

const NotificationsSection: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    addNotification,
  } = useDashboardStore();

  const mockNotifications = [
    {
      id: '1',
      type: 'order' as const,
      title: 'Order Shipped',
      message: 'Your order ORD-001 has been shipped',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'offer' as const,
      title: 'Special Offer',
      message: 'Get 20% off on all necklaces this week!',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '3',
      type: 'delivery' as const,
      title: 'Delivery Update',
      message: 'Your order will be delivered tomorrow',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package size={20} />;
      case 'offer':
        return <Tag size={20} />;
      case 'delivery':
        return <AlertCircle size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  return (
    <div className="notifications-container">
      <div className="section-header">
        <h1>Notifications</h1>
        <p className="section-subtitle">
          {mockNotifications.filter((n) => !n.read).length} unread
        </p>
      </div>

      <div className="notifications-list">
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div
                className="notification-content"
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {formatDate(notification.timestamp)}
                </span>
              </div>
              {!notification.read && <div className="unread-dot" />}
              <button className="delete-btn" title="Delete">
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="empty-state">
            <Bell size={48} />
            <h3>No notifications</h3>
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsSection;
