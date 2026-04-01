import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { generateMockAnalytics, formatCurrency } from '../utils/helpers';

const AnalyticsSection: React.FC = () => {
  const { analyticsData, setAnalyticsData } = useDashboardStore();

  useEffect(() => {
    if (!analyticsData) {
      const mockAnalytics = generateMockAnalytics();
      setAnalyticsData(mockAnalytics);
    }
  }, []);

  if (!analyticsData) {
    return <div className="analytics-container">Loading...</div>;
  }

  const COLORS = ['#D4AF37', '#C5A059', '#B8860B', '#DAA520', '#CD853F'];

  return (
    <div className="analytics-container">
      <div className="section-header">
        <h1>Spending Analytics</h1>
        <p className="section-subtitle">Your shopping patterns & insights</p>
      </div>

      {/* Key Metrics */}
      <motion.div
        className="metrics-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Spent</p>
            <p className="metric-value">{formatCurrency(analyticsData.totalSpent)}</p>
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="metric-icon">
            <BarChart3 size={24} />
          </div>
          <div className="metric-content">
            <p className="metric-label">Average Order Value</p>
            <p className="metric-value">
              {formatCurrency(analyticsData.averageOrderValue)}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="metric-icon">
            <span className="metric-number">{analyticsData.totalOrders}</span>
          </div>
          <div className="metric-content">
            <p className="metric-label">Total Orders</p>
            <p className="metric-value">Orders placed</p>
          </div>
        </motion.div>

        <motion.div
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="metric-icon loyalty">🎁</div>
          <div className="metric-content">
            <p className="metric-label">Loyalty Points</p>
            <p className="metric-value">{analyticsData.loyaltyPoints}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Line Chart - Monthly Spending */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Monthly Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
                formatter={(value) => formatCurrency(value as number)}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Category Spending */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.categorySpending}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.category} ${entry.percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {analyticsData.categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <motion.div
        className="category-breakdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2>Category Breakdown</h2>
        <div className="breakdown-list">
          {analyticsData.categorySpending.map((category, index) => (
            <div key={category.category} className="breakdown-item">
              <div className="breakdown-header">
                <span className="category-name">{category.category}</span>
                <span className="percentage">{category.percentage}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
              </div>
              <p className="category-amount">{formatCurrency(category.amount)}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsSection;
