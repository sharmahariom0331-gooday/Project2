import React, { useState } from 'react';
import { ShieldCheck, Lock, Truck, Package, Gift, Check, ChevronRight, ArrowLeft, Gem } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  img: string;
  material?: string;
  weight?: string;
  purity?: string;
}

interface CheckoutPageProps {
  product: Product;
  onBack: () => void;
  onContinueShopping: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ product, onBack, onContinueShopping }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(`AKS${Date.now().toString().slice(-8)}`);
  const [qty, setQty] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [giftMsg, setGiftMsg] = useState('');
  const [premiumPkg, setPremiumPkg] = useState(false);
  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [form, setForm] = useState({ name: '', phone: '', pincode: '', address: '', city: '', state: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const basePrice = parseInt(product.price.replace(/[^\d]/g, ''));
  const discount = couponApplied ? Math.round(basePrice * 0.1) : 0;
  const deliveryFee = deliveryType === 'express' ? 499 : 0;
  const pkgFee = premiumPkg ? 299 : 0;
  const total = (basePrice * qty) - discount + deliveryFee + pkgFee;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = 'Full name is required';
    if (!form.phone.trim() || form.phone.length < 10) errors.phone = 'Valid phone number required';
    if (!form.pincode.trim() || form.pincode.length < 6) errors.pincode = 'Valid pincode required';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.state.trim()) errors.state = 'State is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return;

    const options = {
      key: 'rzp_test_yourkeyhere',
      amount: total * 100,
      currency: 'INR',
      name: 'Akshima Jewellers',
      description: product.name,
      image: product.img,
      prefill: { name: form.name, contact: form.phone },
      theme: { color: '#6B1A1A' },
      handler: () => {
        setOrderPlaced(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      modal: {
        ondismiss: () => console.log('Payment dismissed'),
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Simulate success when Razorpay not loaded (dev mode)
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'WELCOME10' || coupon.toUpperCase() === 'BULK15') {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
    }
  };

  if (orderPlaced) {
    return (
      <motion.div className="checkout-success-page" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="success-card">
          <div className="success-icon-ring">
            <div className="success-icon"><Check size={40} strokeWidth={3} /></div>
          </div>
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">Thank you for your purchase, <strong>{form.name || 'Valued Customer'}</strong></p>
          <div className="success-order-id">
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="success-product-card">
            <img src={product.img} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.price} × {qty}</p>
              <p className="delivery-eta">Estimated Delivery: <strong>5–7 Business Days</strong></p>
            </div>
          </div>
          <div className="success-trust-row">
            <span><ShieldCheck size={16} /> Secure Payment</span>
            <span><Truck size={16} /> Insured Shipping</span>
            <span><Package size={16} /> Hallmarked Gold</span>
          </div>
          <div className="success-actions">
            <button className="btn-track-order">TRACK ORDER</button>
            <button className="btn-continue-shop" onClick={onContinueShopping}>CONTINUE SHOPPING</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Checkout Header */}
      <header className="checkout-header">
        <button className="checkout-back" onClick={onBack}><ArrowLeft size={18} /> Back</button>
        <div className="checkout-logo">AKSHIMA <span className="co-gold">Jewellers</span></div>
        <div className="checkout-secure"><Lock size={14} /> Secure Checkout</div>
      </header>

      {/* Step Indicator */}
      <div className="checkout-steps">
        {['Address', 'Payment', 'Review'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`checkout-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
              <div className="step-num">{step > i + 1 ? <Check size={14} /> : i + 1}</div>
              <span>{s}</span>
            </div>
            {i < 2 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-body">
        {/* LEFT */}
        <div className="checkout-left">

          {/* Step 1: Address */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-section">
                  <h2 className="co-section-title"><span className="co-num">1</span> Delivery Address</h2>
                  <div className="co-form-grid">
                    {[
                      { label: 'Full Name', key: 'name', type: 'text' },
                      { label: 'Phone Number', key: 'phone', type: 'tel' },
                      { label: 'Pincode', key: 'pincode', type: 'text' },
                      { label: 'City', key: 'city', type: 'text' },
                    ].map(f => (
                      <div className="co-field" key={f.key}>
                        <label className={form[f.key as keyof typeof form] ? 'float' : ''}>{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        />
                        {formErrors[f.key] && <span className="co-error">{formErrors[f.key]}</span>}
                      </div>
                    ))}
                    <div className="co-field co-full">
                      <label className={form.address ? 'float' : ''}>Full Address</label>
                      <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={3} />
                      {formErrors.address && <span className="co-error">{formErrors.address}</span>}
                    </div>
                    <div className="co-field">
                      <label className={form.state ? 'float' : ''}>State</label>
                      <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}>
                        <option value="">Select State</option>
                        {['Haryana', 'Delhi', 'Punjab', 'Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Karnataka', 'Tamil Nadu'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {formErrors.state && <span className="co-error">{formErrors.state}</span>}
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="co-section">
                  <h2 className="co-section-title"><span className="co-num">2</span> Delivery Options</h2>
                  <div className="delivery-options">
                    {[
                      { type: 'standard', label: 'Standard Delivery', sub: '5–7 Business Days', fee: 'FREE', icon: <Truck size={22} /> },
                      { type: 'express', label: 'Express Delivery', sub: '1–2 Business Days', fee: '₹499', icon: <Package size={22} /> },
                    ].map(opt => (
                      <div
                        key={opt.type}
                        className={`delivery-opt ${deliveryType === opt.type ? 'selected' : ''}`}
                        onClick={() => setDeliveryType(opt.type as any)}
                      >
                        {opt.icon}
                        <div className="delivery-opt-info">
                          <strong>{opt.label}</strong>
                          <span>{opt.sub}</span>
                        </div>
                        <div className={`delivery-fee ${opt.type === 'standard' ? 'free' : ''}`}>{opt.fee}</div>
                        <div className="radio-dot">{deliveryType === opt.type && <div />}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gift Options */}
                <div className="co-section">
                  <h2 className="co-section-title"><span className="co-num">3</span> Gift Options <span className="optional-tag">Optional</span></h2>
                  <div className="gift-opt-box">
                    <label className="gift-check">
                      <input type="checkbox" checked={premiumPkg} onChange={e => setPremiumPkg(e.target.checked)} />
                      <Gift size={18} />
                      Premium Gift Packaging <span className="add-cost">+₹299</span>
                    </label>
                    <div className="co-field co-full" style={{ marginTop: '20px' }}>
                      <label className={giftMsg ? 'float' : ''}>Gift Message (Optional)</label>
                      <textarea value={giftMsg} onChange={e => setGiftMsg(e.target.value)} rows={2} placeholder="Write a heartfelt message..." />
                    </div>
                  </div>
                </div>

                <button className="btn-co-next" onClick={() => { if (validateForm()) setStep(2); }}>
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-section">
                  <h2 className="co-section-title"><span className="co-num">2</span> Payment Method</h2>
                  <div className="pay-methods">
                    {[
                      { key: 'upi', label: 'UPI', sub: 'Google Pay, PhonePe, Paytm', emoji: '📱' },
                      { key: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', emoji: '💳' },
                      { key: 'netbanking', label: 'Net Banking', sub: 'All major banks supported', emoji: '🏦' },
                      { key: 'cod', label: 'Cash on Delivery', sub: 'Pay when delivered', emoji: '💵' },
                    ].map(pm => (
                      <div
                        key={pm.key}
                        className={`pay-opt ${payMethod === pm.key ? 'selected' : ''}`}
                        onClick={() => setPayMethod(pm.key as any)}
                      >
                        <span className="pay-emoji">{pm.emoji}</span>
                        <div className="pay-info">
                          <strong>{pm.label}</strong>
                          <span>{pm.sub}</span>
                        </div>
                        <div className="radio-dot">{payMethod === pm.key && <div />}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="co-nav-row">
                  <button className="btn-co-back" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
                  <button className="btn-co-next" onClick={() => setStep(3)}>Review Order <ChevronRight size={18} /></button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="co-section">
                  <h2 className="co-section-title"><span className="co-num">3</span> Review & Confirm</h2>
                  <div className="review-block">
                    <h4>Delivery Address</h4>
                    <p>{form.name} · {form.phone}</p>
                    <p>{form.address}, {form.city}, {form.state} – {form.pincode}</p>
                    <p className="delivery-type-tag">{deliveryType === 'express' ? '⚡ Express' : '📦 Standard'} Delivery</p>
                  </div>
                  <div className="review-block">
                    <h4>Payment Method</h4>
                    <p>{{ upi: '📱 UPI', card: '💳 Card', netbanking: '🏦 Net Banking', cod: '💵 Cash on Delivery' }[payMethod]}</p>
                  </div>
                  {(giftMsg || premiumPkg) && (
                    <div className="review-block">
                      <h4>Gift Options</h4>
                      {premiumPkg && <p>✅ Premium Gift Packaging (+₹299)</p>}
                      {giftMsg && <p>💌 "{giftMsg}"</p>}
                    </div>
                  )}
                </div>
                <div className="trust-badges-co">
                  <span><Gem size={14} /> 100% Hallmarked Gold</span>
                  <span><ShieldCheck size={14} /> Secure Payment</span>
                  <span><Package size={14} /> Insured Shipping</span>
                  <span><Truck size={14} /> Easy Returns</span>
                </div>
                <div className="co-nav-row">
                  <button className="btn-co-back" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
                  <button className="btn-place-order" onClick={handlePlaceOrder}>
                    <Lock size={16} /> PLACE ORDER · ₹{total.toLocaleString('en-IN')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="checkout-right">
          <div className="order-summary-card">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-product">
              <img src={product.img} alt={product.name} />
              <div className="summary-product-info">
                <h4>{product.name}</h4>
                <p>{product.material || '22K Gold'} · {product.weight || '90g'} · {product.purity || '916 BIS'}</p>
                <div className="qty-row-co">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="coupon-co">
              <input
                type="text"
                placeholder="Enter coupon (WELCOME10)"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <button onClick={applyCoupon} disabled={couponApplied}>
                {couponApplied ? '✓ Applied' : 'APPLY'}
              </button>
            </div>
            {couponApplied && <p className="coupon-success">🎉 10% discount applied!</p>}

            <div className="price-breakdown">
              <div className="price-row-co"><span>Product Price</span><span>₹{(basePrice * qty).toLocaleString('en-IN')}</span></div>
              {discount > 0 && <div className="price-row-co green"><span>Discount (WELCOME10)</span><span>−₹{discount.toLocaleString('en-IN')}</span></div>}
              <div className="price-row-co"><span>Delivery</span><span>{deliveryFee === 0 ? <span className="free-tag">FREE</span> : `₹${deliveryFee}`}</span></div>
              {premiumPkg && <div className="price-row-co"><span>Premium Packaging</span><span>₹299</span></div>}
              <div className="price-row-co total"><span>Total Amount</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>

            {discount > 0 && (
              <div className="savings-banner">
                You're saving ₹{discount.toLocaleString('en-IN')} on this order!
              </div>
            )}

            {step === 3 && (
              <button className="btn-place-order-sticky" onClick={handlePlaceOrder}>
                <Lock size={15} /> PLACE ORDER
              </button>
            )}

            <div className="summary-trust">
              <ShieldCheck size={14} /> 100% Secure & Encrypted
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      {step === 3 && (
        <div className="mobile-sticky-bar">
          <div>
            <span>Total</span>
            <strong>₹{total.toLocaleString('en-IN')}</strong>
          </div>
          <button className="btn-place-order" onClick={handlePlaceOrder}>
            <Lock size={15} /> PLACE ORDER
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
