import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, Save, AlertCircle } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

const SettingsSection: React.FC = () => {
  const { userSettings, setUserSettings } = useDashboardStore();
  const [isSaved, setIsSaved] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingsChange = (
    key: keyof typeof userSettings,
    value: any
  ) => {
    setUserSettings({ [key]: value });
    setIsSaved(false);
  };

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="settings-container">
      {/* Notification Settings */}
      <motion.section
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-header">
          <h2>Notification Preferences</h2>
          <p className="subtitle">Choose how you want to receive updates</p>
        </div>

        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={userSettings.emailNotifications}
                onChange={(e) =>
                  handleSettingsChange('emailNotifications', e.target.checked)
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>SMS Notifications</h4>
              <p>Receive updates via SMS</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={userSettings.smsNotifications}
                onChange={(e) =>
                  handleSettingsChange('smsNotifications', e.target.checked)
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Push Notifications</h4>
              <p>Browser push notifications</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={userSettings.pushNotifications}
                onChange={(e) =>
                  handleSettingsChange('pushNotifications', e.target.checked)
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Marketing Emails</h4>
              <p>Promotions and special offers</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={userSettings.marketingEmails}
                onChange={(e) =>
                  handleSettingsChange('marketingEmails', e.target.checked)
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Order Updates</h4>
              <p>Status updates for your orders</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={userSettings.orderUpdates}
                onChange={(e) =>
                  handleSettingsChange('orderUpdates', e.target.checked)
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </motion.section>

      {/* Theme Settings */}
      <motion.section
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="section-header">
          <h2>Appearance</h2>
          <p className="subtitle">Customize your dashboard look</p>
        </div>

        <div className="settings-group">
          <div className="setting-item full-width">
            <div className="setting-info">
              <h4>Theme</h4>
              <p>Choose between light and dark mode</p>
            </div>
            <div className="theme-options">
              <button
                className={`theme-btn ${userSettings.theme === 'light' ? 'active' : ''}`}
                onClick={() => handleSettingsChange('theme', 'light')}
              >
                <Sun size={20} />
                <span>Light</span>
              </button>
              <button
                className={`theme-btn ${userSettings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleSettingsChange('theme', 'dark')}
              >
                <Moon size={20} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Language</h4>
              <p>Select your preferred language</p>
            </div>
            <select
              value={userSettings.language}
              onChange={(e) => handleSettingsChange('language', e.target.value)}
              className="form-input"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Currency</h4>
              <p>Display prices in your preferred currency</p>
            </div>
            <select
              value={userSettings.currency}
              onChange={(e) => handleSettingsChange('currency', e.target.value)}
              className="form-input"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Security Settings */}
      <motion.section
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-header">
          <h2>Security & Password</h2>
          <p className="subtitle">Manage your account security</p>
        </div>

        <div className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              className="form-input"
              placeholder="Enter your current password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
              className="form-input"
              placeholder="Enter your new password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPassword: e.target.value,
                })
              }
              className="form-input"
              placeholder="Confirm your new password"
            />
          </div>

          <button className="btn-primary" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>
      </motion.section>

      {/* Save Settings Button */}
      <motion.div
        className="settings-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button className="btn-primary" onClick={handleSaveSettings}>
          <Save size={18} /> Save All Settings
        </button>
        {isSaved && (
          <motion.p
            className="save-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓ Settings saved successfully!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default SettingsSection;
