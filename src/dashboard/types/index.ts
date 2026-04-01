// User Profile
export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  dateOfBirth?: string;
  addresses: Address[];
  createdAt: string;
}

// Orders
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount?: number;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: string;
}

// Wishlist
export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: string;
  material: string;
  addedAt: string;
}

// Cart
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

// Payment
export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'upi' | 'wallet';
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export interface PaymentHistory {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: 'completed' | 'failed' | 'pending';
  timestamp: string;
  transactionId: string;
}

// Notifications
export interface Notification {
  id: string;
  type: 'order' | 'offer' | 'delivery' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
}

// Rewards & Offers
export interface Coupon {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minAmount?: number;
  expiryDate: string;
  isApplied: boolean;
}

export interface LoyaltyPoints {
  totalPoints: number;
  pointsToRedeemAmount: number;
  redeemedPoints: number;
  expiryDate?: string;
}

// Recommendations
export interface RecommendedProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  reason: string;
  rating: number;
}

// Collection
export interface CollectionItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  purchaseDate: string;
  price: string;
  material: string;
  weight?: string;
}

// Analytics
export interface SpendingData {
  month: string;
  amount: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface AnalyticsData {
  totalSpent: number;
  averageOrderValue: number;
  totalOrders: number;
  loyaltyPoints: number;
  monthlySpending: SpendingData[];
  categorySpending: CategorySpending[];
}

// Settings
export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  theme: 'light' | 'dark';
  language: string;
  currency: string;
}
