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
  Upload, 
  ChevronRight,
  TrendingUp,
  Users,
  ShoppingBag as BagIcon,
  DollarSign
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

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, settings, setSettings, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);

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

  return (
    <div className="admin-overlay">
      <div className="admin-container">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="admin-brand">
            <LayoutDashboard size={24} />
            <span>AKSHIMA ADMIN</span>
          </div>
          <nav className="admin-nav">
            <button 
              className={activeTab === 'overview' ? 'active' : ''} 
              onClick={() => setActiveTab('overview')}
            >
              <TrendingUp size={20} /> Overview
            </button>
            <button 
              className={activeTab === 'products' ? 'active' : ''} 
              onClick={() => setActiveTab('products')}
            >
              <Package size={20} /> Inventory
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} /> Site Settings
            </button>
          </nav>
          <button className="admin-exit" onClick={onClose}>
            Exit Panel
          </button>
        </div>

        {/* Main Content */}
        <div className="admin-main">
          <header className="admin-header">
            <h2>{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'products' ? 'Product Inventory' : 'General Settings'}</h2>
            <div className="admin-user">
              <span>Admin Account</span>
              <div className="admin-avatar">A</div>
            </div>
          </header>

          <div className="admin-content">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="overview-grid"
                >
                  <div className="admin-stat-card">
                    <div className="stat-info">
                      <p>Total Products</p>
                      <h3>{products.length}</h3>
                    </div>
                    <div className="stat-icon purple"><Package /></div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-info">
                      <p>Total Sales</p>
                      <h3>₹ 12,40,230</h3>
                    </div>
                    <div className="stat-icon green"><DollarSign /></div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-info">
                      <p>Site Visitors</p>
                      <h3>4,234</h3>
                    </div>
                    <div className="stat-icon blue"><Users /></div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="stat-info">
                      <p>Available Coupons</p>
                      <h3>2 Active</h3>
                    </div>
                    <div className="stat-icon gold"><BagIcon /></div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'products' && (
                <motion.div 
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inventory-view"
                >
                  <div className="inventory-actions">
                    <button className="btn-admin-add" onClick={() => {
                        setEditingProduct({ id: 0, name: '', price: '₹ ', img: '' });
                        setIsAddingMode(true);
                      }}>
                      <Plus size={18} /> Add New Product
                    </button>
                  </div>
                  <div className="admin-table-container">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Thumbnail</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td><img src={product.img} alt={product.name} className="table-thumb" /></td>
                            <td className="bold">{product.name}</td>
                            <td>{product.price}</td>
                            <td>Haram</td>
                            <td className="stock-in">{product.stock || 'In Stock'}</td>
                            <td>
                              <div className="table-btns">
                                <button className="edit-btn" onClick={() => {
                                    setEditingProduct(product);
                                    setIsAddingMode(false);
                                  }}><Edit size={16} /></button>
                                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}><Trash2 size={16} /></button>
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
                  className="settings-view"
                >
                  <div className="settings-form">
                    <div className="form-section">
                      <h3>Header Config</h3>
                      <div className="form-group">
                        <label>Site Name</label>
                        <input value={settings.siteName} onChange={(e) => setSettings({...settings, siteName: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Contact Number</label>
                        <input value={settings.contactNumber} onChange={(e) => setSettings({...settings, contactNumber: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="form-section">
                      <h3>Hero Content</h3>
                      <div className="form-group">
                        <label>Hero Title</label>
                        <input value={settings.heroTitle} onChange={(e) => setSettings({...settings, heroTitle: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Hero Subtitle</label>
                        <input value={settings.heroSubtitle} onChange={(e) => setSettings({...settings, heroSubtitle: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Hero Image URL</label>
                        <input value={settings.heroImage} onChange={(e) => setSettings({...settings, heroImage: e.target.value})} />
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Founder Info</h3>
                      <div className="form-group">
                        <label>Founder Name</label>
                        <input value={settings.founderName} onChange={(e) => setSettings({...settings, founderName: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>Purity Promise</label>
                        <input value={settings.purityPromise} onChange={(e) => setSettings({...settings, purityPromise: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {editingProduct && (
          <div className="modal-overlay">
            <motion.div 
              className="admin-modal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="modal-header">
                <h3>{isAddingMode ? 'Add Product' : 'Edit Product'}</h3>
                <button className="close-modal" onClick={() => setEditingProduct(null)}><X /></button>
              </div>
              <form className="modal-form" onSubmit={handleSaveProduct}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input required value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input required value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input required value={editingProduct.img} onChange={e => setEditingProduct({...editingProduct, img: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Material</label>
                    <input value={editingProduct.material || ''} onChange={e => setEditingProduct({...editingProduct, material: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>
                    <input value={editingProduct.weight || ''} onChange={e => setEditingProduct({...editingProduct, weight: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Purity</label>
                    <input value={editingProduct.purity || ''} onChange={e => setEditingProduct({...editingProduct, purity: e.target.value})} />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-save-admin"><Save size={18} /> Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
