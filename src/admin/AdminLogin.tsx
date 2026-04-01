import React, { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/admin-login.css';

interface AdminLoginProps {
  onLoginSuccess: (adminData: { email: string; name: string }) => void;
}

// Default admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@akshima.com',
  password: 'admin@123'
};

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        onLoginSuccess({ email, name: 'Admin' });
      } else {
        setError('Invalid email or password. Try admin@akshima.com / admin@123');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="admin-login-container">
      <motion.div
        className="admin-login-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="login-header">
          <h1>AKSHIMA ADMIN</h1>
          <p>Management Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="form-group-login">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="admin@akshima.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group-login">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-note">Demo Credentials:</p>
          <code>
            Email: admin@akshima.com<br />
            Password: admin@123
          </code>
        </div>
      </motion.div>

      <div className="login-background"></div>
    </div>
  );
};

export default AdminLogin;
