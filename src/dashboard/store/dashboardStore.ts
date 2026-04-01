import { create } from 'zustand';
import {
  UserProfile,
  Order,
  WishlistItem,
  CartItem,
  PaymentMethod,
  Notification,
  Coupon,
  AnalyticsData,
  UserSettings,
  RecommendedProduct,
  CollectionItem,
} from '../types';

interface DashboardStore {
  // User Profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Orders
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;

  // Wishlist
  wishlist: WishlistItem[];
  setWishlist: (items: WishlistItem[]) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Payment Methods
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (methodId: string) => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getUnreadCount: () => number;

  // Coupons
  appliedCoupons: Coupon[];
  availableCoupons: Coupon[];
  setAvailableCoupons: (coupons: Coupon[]) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: (code: string) => void;

  // Recommendations
  recommendedProducts: RecommendedProduct[];
  setRecommendedProducts: (products: RecommendedProduct[]) => void;

  // Collection
  collection: CollectionItem[];
  setCollection: (items: CollectionItem[]) => void;

  // Analytics
  analyticsData: AnalyticsData | null;
  setAnalyticsData: (data: AnalyticsData) => void;

  // Settings
  userSettings: UserSettings;
  setUserSettings: (settings: Partial<UserSettings>) => void;

  // UI State
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const defaultUserSettings: UserSettings = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  marketingEmails: true,
  orderUpdates: true,
  theme: 'light',
  language: 'en',
  currency: 'INR',
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // User Profile
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  updateUserProfile: (profile) =>
    set((state) => ({
      userProfile: state.userProfile
        ? { ...state.userProfile, ...profile }
        : null,
    })),

  // Orders
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),
  updateOrder: (orderId, updates) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, ...updates } : order
      ),
    })),

  // Wishlist
  wishlist: [],
  setWishlist: (items) => set({ wishlist: items }),
  addToWishlist: (item) =>
    set((state) => ({
      wishlist: [item, ...state.wishlist],
    })),
  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.productId !== productId),
    })),
  isInWishlist: (productId) => {
    const state = get();
    return state.wishlist.some((item) => item.productId === productId);
  },

  // Cart
  cart: [],
  setCart: (items) => set({ cart: items }),
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.productId === item.productId);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.productId === item.productId
              ? {
                  ...c,
                  quantity: c.quantity + item.quantity,
                  total: (c.quantity + item.quantity) * c.price,
                }
              : c
          ),
        };
      }
      return { cart: [item, ...state.cart] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  updateCartItem: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
              total: item.price * quantity,
            }
          : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.total, 0);
  },

  // Payment Methods
  paymentMethods: [],
  setPaymentMethods: (methods) => set({ paymentMethods: methods }),
  addPaymentMethod: (method) =>
    set((state) => ({
      paymentMethods: [method, ...state.paymentMethods],
    })),
  removePaymentMethod: (methodId) =>
    set((state) => ({
      paymentMethods: state.paymentMethods.filter((m) => m.id !== methodId),
    })),

  // Notifications
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    })),
  getUnreadCount: () => {
    const state = get();
    return state.notifications.filter((n) => !n.read).length;
  },

  // Coupons
  appliedCoupons: [],
  availableCoupons: [],
  setAvailableCoupons: (coupons) => set({ availableCoupons: coupons }),
  applyCoupon: (coupon) =>
    set((state) => ({
      appliedCoupons: [coupon, ...state.appliedCoupons],
    })),
  removeCoupon: (code) =>
    set((state) => ({
      appliedCoupons: state.appliedCoupons.filter((c) => c.code !== code),
    })),

  // Recommendations
  recommendedProducts: [],
  setRecommendedProducts: (products) => set({ recommendedProducts: products }),

  // Collection
  collection: [],
  setCollection: (items) => set({ collection: items }),

  // Analytics
  analyticsData: null,
  setAnalyticsData: (data) => set({ analyticsData: data }),

  // Settings
  userSettings: defaultUserSettings,
  setUserSettings: (settings) =>
    set((state) => ({
      userSettings: { ...state.userSettings, ...settings },
    })),

  // UI State
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
