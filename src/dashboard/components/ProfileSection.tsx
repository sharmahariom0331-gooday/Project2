import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Plus, Trash2, Check, X } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { UserProfile, Address } from '../types';

const ProfileSection: React.FC = () => {
  const { userProfile, updateUserProfile } = useDashboardStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [formData, setFormData] = useState(userProfile || {});
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: 'home',
  });

  const handleProfileSave = () => {
    updateUserProfile(formData as Partial<UserProfile>);
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    if (userProfile) {
      const address: Address = {
        id: Date.now().toString(),
        fullName: newAddress.fullName || '',
        phone: newAddress.phone || '',
        street: newAddress.street || '',
        city: newAddress.city || '',
        state: newAddress.state || '',
        pincode: newAddress.pincode || '',
        type: (newAddress.type as any) || 'home',
        isDefault: newAddress.isDefault || false,
      };
      updateUserProfile({
        addresses: [...(userProfile.addresses || []), address],
      });
      setNewAddress({ type: 'home' });
      setIsAddingAddress(false);
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    if (userProfile) {
      updateUserProfile({
        addresses: userProfile.addresses.filter((a) => a.id !== addressId),
      });
    }
  };

  if (!userProfile) {
    return <div className="profile-section">Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Information */}
      <motion.section
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="section-header">
          <h2>Personal Information</h2>
          <button
            className="edit-btn"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            <Edit2 size={18} />
            {isEditingProfile ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditingProfile ? (
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button className="btn-primary" onClick={handleProfileSave}>
                <Check size={18} /> Save Changes
              </button>
              <button
                className="btn-secondary"
                onClick={() => setIsEditingProfile(false)}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value">
                {userProfile.firstName} {userProfile.lastName}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Email</span>
              <span className="value">{userProfile.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone</span>
              <span className="value">{userProfile.phone}</span>
            </div>
            {userProfile.dateOfBirth && (
              <div className="info-row">
                <span className="label">Date of Birth</span>
                <span className="value">{userProfile.dateOfBirth}</span>
              </div>
            )}
          </div>
        )}
      </motion.section>

      {/* Addresses */}
      <motion.section
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="section-header">
          <h2>Addresses</h2>
          <button
            className="edit-btn"
            onClick={() => setIsAddingAddress(!isAddingAddress)}
          >
            <Plus size={18} />
            {isAddingAddress ? 'Cancel' : 'Add Address'}
          </button>
        </div>

        {isAddingAddress && (
          <div className="address-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newAddress.fullName || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, fullName: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={newAddress.phone || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  value={newAddress.street || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  value={newAddress.city || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  value={newAddress.state || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  value={newAddress.pincode || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, pincode: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newAddress.type || 'home'}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      type: e.target.value as any,
                    })
                  }
                  className="form-input"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn-primary" onClick={handleAddAddress}>
                <Check size={18} /> Add Address
              </button>
              <button
                className="btn-secondary"
                onClick={() => setIsAddingAddress(false)}
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="addresses-list">
          {userProfile.addresses && userProfile.addresses.length > 0 ? (
            userProfile.addresses.map((address) => (
              <motion.div
                key={address.id}
                className={`address-card ${address.isDefault ? 'default' : ''}`}
                layout
              >
                <div className="address-header">
                  <h3>{address.fullName}</h3>
                  <span className="address-type">{address.type}</span>
                </div>
                <p className="address-text">{address.street}</p>
                <p className="address-text">
                  {address.city}, {address.state} {address.pincode}
                </p>
                <p className="address-phone">{address.phone}</p>
                <div className="address-actions">
                  <button className="icon-btn">
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="empty-message">No addresses saved yet</p>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default ProfileSection;
