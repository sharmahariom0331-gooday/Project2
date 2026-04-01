import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Users,
  ShoppingCart,
  Heart,
  TrendingUp,
  DollarSign,
  LogOut,
  Search,
  Filter,
  Eye,
  Download,
  BarChart3,
  Tag,
  Truck,
  CreditCard,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  stock?: string;
  showInStore?: boolean;
  material?: string;
  weight?: string;
  purity?: string;
  length?: string;
  width?: string;
  stone?: string;
}

interface SiteSettings {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroSubheading: string;
  heroImage: string;
  contactNumber: string;
  founderName: string;
  purityPromise: string;
  heritageYears: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  cartItems: number;
  wishlistItems: number;
  totalOrders: number;
  totalSpent: string;
}

interface Order {
  id: number;
  userId: number;
  userName: string;
  productName: string;
  price: string;
  quantity: number;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

interface Category {
  id: number;
  name: string;
  subcategories: string[];
}

interface Coupon {
  id: number;
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  expiryDate: string;
  usageLimit: number;
}

interface PaymentMethod {
  id: number;
  name: string;
  enabled: boolean;
  charges: number;
}

interface DeliveryOption {
  id: number;
  name: string;
  cost: string;
  days: string;
  enabled: boolean;
}

interface AdminPanelV2Props {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  deliveryOptions: DeliveryOption[];
  setDeliveryOptions: React.Dispatch<React.SetStateAction<DeliveryOption[]>>;
  adminEmail: string;
  onLogout: () => void;
}

const AdminPanelV2: React.FC<AdminPanelV2Props> = ({
  products,
  setProducts,
  settings,
  setSettings,
  users,
  orders,
  categories,
  setCategories,
  coupons,
  setCoupons,
  paymentMethods,
  setPaymentMethods,
  deliveryOptions,
  setDeliveryOptions,
  adminEmail,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'users' | 'orders' | 'categories' | 'coupons' | 'payment' | 'delivery' | 'settings'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  const [editingDelivery, setEditingDelivery] = useState<DeliveryOption | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (isAddingMode) {
        setProducts([...products, { ...editingProduct, id: Date.now() }]);
      } else {
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      }
      setEditingProduct(null);
      setIsAddingMode(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (parseInt(o.price.replace(/[^\d]/g, '')) * o.quantity), 0);

  const totalWishlist = users.reduce((sum, u) => sum + u.wishlistItems, 0);

  return (
    <div className="admin-v2-overlay">
      <div className="admin-v2-container">
        {/* Sidebar */}
        <div className="admin-v2-sidebar">
          <div className="admin-v2-brand">
            <LayoutDashboard size={24} />
            <span>AKSHIMA ADMIN</span>
          </div>

          <nav className="admin-v2-nav">
            <button
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
              title="Dashboard"
            >
              <TrendingUp size={20} />
              <span>Dashboard</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
              title="Products"
            >
              <Package size={20} />
              <span>Products</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
              title="Users"
            >
              <Users size={20} />
              <span>Users ({users.length})</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
              title="Orders"
            >
              <ShoppingCart size={20} />
              <span>Orders ({orders.length})</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
              title="Categories"
            >
              <Tag size={20} />
              <span>Categories</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'coupons' ? 'active' : ''}`}
              onClick={() => setActiveTab('coupons')}
              title="Coupons"
            >
              <Zap size={20} />
              <span>Coupons</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
              title="Payment Methods"
            >
              <CreditCard size={20} />
              <span>Payments</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivery')}
              title="Delivery Options"
            >
              <Truck size={20} />
              <span>Delivery</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
              title="Settings"
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </nav>

          <div className="admin-v2-footer-sidebar">
            <div className="admin-info">
              <div className="admin-avatar-v2">A</div>
              <div className="admin-details">
                <p className="admin-name">Admin</p>
                <p className="admin-email-small">{adminEmail}</p>
              </div>
            </div>
            <button className="btn-logout" onClick={onLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="admin-v2-main">
          <header className="admin-v2-header">
            <h2 className="page-title">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'users' && 'Customer Management'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'categories' && 'Categories & Subcategories'}
              {activeTab === 'coupons' && 'Coupon Management'}
              {activeTab === 'payment' && 'Payment Methods'}
              {activeTab === 'delivery' && 'Delivery Options'}
              {activeTab === 'settings' && 'Website Settings'}
            </h2>
          </header>

          <div className="admin-v2-content">
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="dashboard-grid"
                >
                  <div className="stat-card-v2 purple">
                    <div className="stat-icon"><Package size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Total Products</p>
                      <h3>{products.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card-v2 green">
                    <div className="stat-icon"><DollarSign size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Total Revenue</p>
                      <h3>₹ {(totalRevenue / 100000).toFixed(1)}L</h3>
                    </div>
                  </div>

                  <div className="stat-card-v2 blue">
                    <div className="stat-icon"><Users size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Total Customers</p>
                      <h3>{users.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card-v2 orange">
                    <div className="stat-icon"><ShoppingCart size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Total Orders</p>
                      <h3>{orders.length}</h3>
                    </div>
                  </div>

                  <div className="stat-card-v2 gold">
                    <div className="stat-icon"><Heart size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Wishlist Items</p>
                      <h3>{totalWishlist}</h3>
                    </div>
                  </div>

                  <div className="stat-card-v2 red">
                    <div className="stat-icon"><BarChart3 size={32} /></div>
                    <div className="stat-info-v2">
                      <p>Conversion Rate</p>
                      <h3>{users.length > 0 ? ((orders.length / users.length) * 100).toFixed(1) : 0}%</h3>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <button className="btn-admin-add" onClick={() => {
                      setEditingProduct({ id: 0, name: '', price: '₹ ', img: '' });
                      setIsAddingMode(true);
                    }}>
                      <Plus size={18} /> Add Product
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Material</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td><img src={product.img} alt={product.name} className="thumb" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/50'; }} /></td>
                            <td className="bold">{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.material || '-'}</td>
                            <td>{product.stock || 'In Stock'}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-action edit" onClick={() => { setEditingProduct(product); setIsAddingMode(false); }} title="Edit"><Edit size={16} /></button>
                                <button className="btn-action delete" onClick={() => handleDeleteProduct(product.id)} title="Delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <div className="search-box">
                      <Search size={18} />
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Join Date</th>
                          <th>Orders</th>
                          <th>Wishlist</th>
                          <th>Total Spent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(user => (
                          <tr key={user.id}>
                            <td className="bold">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                            <td><span className="badge badge-blue">{user.totalOrders}</span></td>
                            <td><span className="badge badge-pink">{user.wishlistItems}</span></td>
                            <td className="bold">{user.totalSpent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <div className="search-box">
                      <Search size={18} />
                      <input
                        type="text"
                        placeholder="Search by customer or product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(order => (
                          <tr key={order.id}>
                            <td className="bold">#{order.id}</td>
                            <td>{order.userName}</td>
                            <td>{order.productName}</td>
                            <td>{order.price}</td>
                            <td>{order.quantity}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge badge-${order.status}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'categories' && (
                <motion.div
                  key="categories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <button className="btn-admin-add" onClick={() => {
                      setEditingCategory({ id: 0, name: '', subcategories: [''] });
                      setIsAddingMode(true);
                    }}>
                      <Plus size={18} /> Add Category
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Category Name</th>
                          <th>Subcategories</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(category => (
                          <tr key={category.id}>
                            <td className="bold">{category.name}</td>
                            <td>{category.subcategories.join(', ')}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-action edit" onClick={() => { setEditingCategory(category); setIsAddingMode(false); }} title="Edit"><Edit size={16} /></button>
                                <button className="btn-action delete" onClick={() => {
                                  if (window.confirm('Delete this category?')) {
                                    setCategories(categories.filter(c => c.id !== category.id));
                                  }
                                }} title="Delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'coupons' && (
                <motion.div
                  key="coupons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <button className="btn-admin-add" onClick={() => {
                      setEditingCoupon({ id: 0, code: '', discount: 0, discountType: 'percentage', expiryDate: '', usageLimit: 0 });
                      setIsAddingMode(true);
                    }}>
                      <Plus size={18} /> Add Coupon
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Discount</th>
                          <th>Type</th>
                          <th>Expiry Date</th>
                          <th>Usage Limit</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map(coupon => (
                          <tr key={coupon.id}>
                            <td className="bold">{coupon.code}</td>
                            <td>{coupon.discount}</td>
                            <td><span className="badge badge-blue">{coupon.discountType}</span></td>
                            <td>{coupon.expiryDate}</td>
                            <td>{coupon.usageLimit}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-action edit" onClick={() => { setEditingCoupon(coupon); setIsAddingMode(false); }} title="Edit"><Edit size={16} /></button>
                                <button className="btn-action delete" onClick={() => {
                                  if (window.confirm('Delete this coupon?')) {
                                    setCoupons(coupons.filter(c => c.id !== coupon.id));
                                  }
                                }} title="Delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <button className="btn-admin-add" onClick={() => {
                      setEditingPayment({ id: 0, name: '', enabled: true, charges: 0 });
                      setIsAddingMode(true);
                    }}>
                      <Plus size={18} /> Add Payment Method
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th>Charges (%)</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentMethods.map(method => (
                          <tr key={method.id}>
                            <td className="bold">{method.name}</td>
                            <td><span className={`badge badge-${method.enabled ? 'green' : 'red'}`}>{method.enabled ? 'Enabled' : 'Disabled'}</span></td>
                            <td>{method.charges}%</td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-action edit" onClick={() => { setEditingPayment(method); setIsAddingMode(false); }} title="Edit"><Edit size={16} /></button>
                                <button className="btn-action delete" onClick={() => {
                                  if (window.confirm('Delete this payment method?')) {
                                    setPaymentMethods(paymentMethods.filter(p => p.id !== method.id));
                                  }
                                }} title="Delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'delivery' && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="section-header">
                    <button className="btn-admin-add" onClick={() => {
                      setEditingDelivery({ id: 0, name: '', cost: '₹ 0', days: '5-7', enabled: true });
                      setIsAddingMode(true);
                    }}>
                      <Plus size={18} /> Add Delivery Option
                    </button>
                  </div>

                  <div className="table-wrapper">
                    <table className="admin-table-v2">
                      <thead>
                        <tr>
                          <th>Delivery Type</th>
                          <th>Cost</th>
                          <th>Days</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryOptions.map(option => (
                          <tr key={option.id}>
                            <td className="bold">{option.name}</td>
                            <td>{option.cost}</td>
                            <td>{option.days}</td>
                            <td><span className={`badge badge-${option.enabled ? 'green' : 'red'}`}>{option.enabled ? 'Enabled' : 'Disabled'}</span></td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn-action edit" onClick={() => { setEditingDelivery(option); setIsAddingMode(false); }} title="Edit"><Edit size={16} /></button>
                                <button className="btn-action delete" onClick={() => {
                                  if (window.confirm('Delete this delivery option?')) {
                                    setDeliveryOptions(deliveryOptions.filter(d => d.id !== option.id));
                                  }
                                }} title="Delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="settings-form-v2"
                >
                  <div className="settings-section">
                    <h3>Header Configuration</h3>
                    <div className="form-grid-v2">
                      <div className="form-group-v2">
                        <label>Site Name</label>
                        <input
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                          placeholder="Enter site name"
                        />
                      </div>
                      <div className="form-group-v2">
                        <label>Contact Number</label>
                        <input
                          value={settings.contactNumber}
                          onChange={(e) => setSettings({ ...settings, contactNumber: e.target.value })}
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3>Hero Section</h3>
                    <div className="form-grid-v2">
                      <div className="form-group-v2 full">
                        <label>Hero Title</label>
                        <input
                          value={settings.heroTitle}
                          onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                          placeholder="Enter hero title"
                        />
                      </div>
                      <div className="form-group-v2 full">
                        <label>Hero Subtitle</label>
                        <input
                          value={settings.heroSubtitle}
                          onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                          placeholder="Enter hero subtitle"
                        />
                      </div>
                      <div className="form-group-v2 full">
                        <label>Hero Image URL</label>
                        <input
                          value={settings.heroImage}
                          onChange={(e) => setSettings({ ...settings, heroImage: e.target.value })}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h3>Founder Information</h3>
                    <div className="form-grid-v2">
                      <div className="form-group-v2">
                        <label>Founder Name</label>
                        <input
                          value={settings.founderName}
                          onChange={(e) => setSettings({ ...settings, founderName: e.target.value })}
                          placeholder="Enter founder name"
                        />
                      </div>
                      <div className="form-group-v2">
                        <label>Purity Promise</label>
                        <input
                          value={settings.purityPromise}
                          onChange={(e) => setSettings({ ...settings, purityPromise: e.target.value })}
                          placeholder="Enter purity promise"
                        />
                      </div>
                    </div>
                  </div>

                  <button className="btn-save-settings">
                    <Save size={18} /> Save All Changes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="modal-overlay-v2">
            <motion.div
              className="admin-modal-v2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-v2">
                <h3>{isAddingMode ? 'Add New Product' : 'Edit Product'}</h3>
                <button className="close-btn" onClick={() => setEditingProduct(null)}><X size={24} /></button>
              </div>
              <form className="modal-form-v2" onSubmit={handleSaveProduct}>
                <div className="form-grid-v2">
                  <div className="form-group-v2 full">
                    <label>Product Name *</label>
                    <input
                      required
                      value={editingProduct.name}
                      onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Price *</label>
                    <input
                      required
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      placeholder="₹ 0"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Material</label>
                    <input
                      value={editingProduct.material || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, material: e.target.value })}
                      placeholder="e.g., 22K Gold"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Weight</label>
                    <input
                      value={editingProduct.weight || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, weight: e.target.value })}
                      placeholder="e.g., 50g"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Purity</label>
                    <input
                      value={editingProduct.purity || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, purity: e.target.value })}
                      placeholder="e.g., 916 (BIS)"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Stone</label>
                    <input
                      value={editingProduct.stone || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, stone: e.target.value })}
                      placeholder="e.g., Diamond"
                    />
                  </div>
                  <div className="form-group-v2 full">
                    <label>Image URL *</label>
                    <input
                      required
                      value={editingProduct.img}
                      onChange={e => setEditingProduct({ ...editingProduct, img: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                  <button type="submit" className="btn-save-modal"><Save size={18} /> Save Product</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingCategory && (
          <div className="modal-overlay-v2">
            <motion.div
              className="admin-modal-v2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-v2">
                <h3>{isAddingMode ? 'Add New Category' : 'Edit Category'}</h3>
                <button className="close-btn" onClick={() => setEditingCategory(null)}><X size={24} /></button>
              </div>
              <form className="modal-form-v2" onSubmit={(e) => {
                e.preventDefault();
                if (editingCategory) {
                  if (isAddingMode) {
                    setCategories([...categories, { ...editingCategory, id: Date.now() }]);
                  } else {
                    setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
                  }
                  setEditingCategory(null);
                  setIsAddingMode(false);
                }
              }}>
                <div className="form-grid-v2">
                  <div className="form-group-v2 full">
                    <label>Category Name *</label>
                    <input
                      required
                      value={editingCategory.name}
                      onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      placeholder="e.g., Gold"
                    />
                  </div>
                  <div className="form-group-v2 full">
                    <label>Subcategories (comma-separated)</label>
                    <input
                      value={editingCategory.subcategories.join(', ')}
                      onChange={e => setEditingCategory({ ...editingCategory, subcategories: e.target.value.split(',').map(s => s.trim()) })}
                      placeholder="e.g., Earrings, Rings, Necklaces"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setEditingCategory(null)}>Cancel</button>
                  <button type="submit" className="btn-save-modal"><Save size={18} /> Save Category</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingCoupon && (
          <div className="modal-overlay-v2">
            <motion.div
              className="admin-modal-v2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-v2">
                <h3>{isAddingMode ? 'Add New Coupon' : 'Edit Coupon'}</h3>
                <button className="close-btn" onClick={() => setEditingCoupon(null)}><X size={24} /></button>
              </div>
              <form className="modal-form-v2" onSubmit={(e) => {
                e.preventDefault();
                if (editingCoupon) {
                  if (isAddingMode) {
                    setCoupons([...coupons, { ...editingCoupon, id: Date.now() }]);
                  } else {
                    setCoupons(coupons.map(c => c.id === editingCoupon.id ? editingCoupon : c));
                  }
                  setEditingCoupon(null);
                  setIsAddingMode(false);
                }
              }}>
                <div className="form-grid-v2">
                  <div className="form-group-v2">
                    <label>Coupon Code *</label>
                    <input
                      required
                      value={editingCoupon.code}
                      onChange={e => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                      placeholder="e.g., WELCOME10"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Discount Value *</label>
                    <input
                      required
                      type="number"
                      value={editingCoupon.discount}
                      onChange={e => setEditingCoupon({ ...editingCoupon, discount: parseInt(e.target.value) })}
                      placeholder="10"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Discount Type</label>
                    <select value={editingCoupon.discountType} onChange={e => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as 'percentage' | 'fixed' })}>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed (₹)</option>
                    </select>
                  </div>
                  <div className="form-group-v2">
                    <label>Expiry Date *</label>
                    <input
                      required
                      type="date"
                      value={editingCoupon.expiryDate}
                      onChange={e => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group-v2 full">
                    <label>Usage Limit</label>
                    <input
                      type="number"
                      value={editingCoupon.usageLimit}
                      onChange={e => setEditingCoupon({ ...editingCoupon, usageLimit: parseInt(e.target.value) })}
                      placeholder="100"
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setEditingCoupon(null)}>Cancel</button>
                  <button type="submit" className="btn-save-modal"><Save size={18} /> Save Coupon</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingPayment && (
          <div className="modal-overlay-v2">
            <motion.div
              className="admin-modal-v2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-v2">
                <h3>{isAddingMode ? 'Add Payment Method' : 'Edit Payment Method'}</h3>
                <button className="close-btn" onClick={() => setEditingPayment(null)}><X size={24} /></button>
              </div>
              <form className="modal-form-v2" onSubmit={(e) => {
                e.preventDefault();
                if (editingPayment) {
                  if (isAddingMode) {
                    setPaymentMethods([...paymentMethods, { ...editingPayment, id: Date.now() }]);
                  } else {
                    setPaymentMethods(paymentMethods.map(p => p.id === editingPayment.id ? editingPayment : p));
                  }
                  setEditingPayment(null);
                  setIsAddingMode(false);
                }
              }}>
                <div className="form-grid-v2">
                  <div className="form-group-v2">
                    <label>Payment Method Name *</label>
                    <input
                      required
                      value={editingPayment.name}
                      onChange={e => setEditingPayment({ ...editingPayment, name: e.target.value })}
                      placeholder="e.g., Credit Card"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Charges (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editingPayment.charges}
                      onChange={e => setEditingPayment({ ...editingPayment, charges: parseFloat(e.target.value) })}
                      placeholder="1.5"
                    />
                  </div>
                  <div className="form-group-v2 full">
                    <label>
                      <input
                        type="checkbox"
                        checked={editingPayment.enabled}
                        onChange={e => setEditingPayment({ ...editingPayment, enabled: e.target.checked })}
                      />
                      {' '}Enable this payment method
                    </label>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setEditingPayment(null)}>Cancel</button>
                  <button type="submit" className="btn-save-modal"><Save size={18} /> Save Payment Method</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {editingDelivery && (
          <div className="modal-overlay-v2">
            <motion.div
              className="admin-modal-v2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="modal-header-v2">
                <h3>{isAddingMode ? 'Add Delivery Option' : 'Edit Delivery Option'}</h3>
                <button className="close-btn" onClick={() => setEditingDelivery(null)}><X size={24} /></button>
              </div>
              <form className="modal-form-v2" onSubmit={(e) => {
                e.preventDefault();
                if (editingDelivery) {
                  if (isAddingMode) {
                    setDeliveryOptions([...deliveryOptions, { ...editingDelivery, id: Date.now() }]);
                  } else {
                    setDeliveryOptions(deliveryOptions.map(d => d.id === editingDelivery.id ? editingDelivery : d));
                  }
                  setEditingDelivery(null);
                  setIsAddingMode(false);
                }
              }}>
                <div className="form-grid-v2">
                  <div className="form-group-v2">
                    <label>Delivery Type *</label>
                    <input
                      required
                      value={editingDelivery.name}
                      onChange={e => setEditingDelivery({ ...editingDelivery, name: e.target.value })}
                      placeholder="e.g., Standard Delivery"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Cost *</label>
                    <input
                      required
                      value={editingDelivery.cost}
                      onChange={e => setEditingDelivery({ ...editingDelivery, cost: e.target.value })}
                      placeholder="₹ 0"
                    />
                  </div>
                  <div className="form-group-v2">
                    <label>Days *</label>
                    <input
                      required
                      value={editingDelivery.days}
                      onChange={e => setEditingDelivery({ ...editingDelivery, days: e.target.value })}
                      placeholder="5-7 days"
                    />
                  </div>
                  <div className="form-group-v2 full">
                    <label>
                      <input
                        type="checkbox"
                        checked={editingDelivery.enabled}
                        onChange={e => setEditingDelivery({ ...editingDelivery, enabled: e.target.checked })}
                      />
                      {' '}Enable this delivery option
                    </label>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setEditingDelivery(null)}>Cancel</button>
                  <button type="submit" className="btn-save-modal"><Save size={18} /> Save Delivery Option</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanelV2;
