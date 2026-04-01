import { Order, OrderStatus } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'returned':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getOrderStatusLabel = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'shipped':
      return 'Shipped';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    case 'returned':
      return 'Returned';
    default:
      return 'Unknown';
  }
};

export const calculateOrderProgress = (status: OrderStatus): number => {
  switch (status) {
    case 'pending':
      return 25;
    case 'confirmed':
      return 50;
    case 'shipped':
      return 75;
    case 'delivered':
      return 100;
    case 'cancelled':
      return 0;
    case 'returned':
      return 50;
    default:
      return 0;
  }
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp.slice(-8)}-${random}`;
};

export const calculateMonthlySpending = (orders: Order[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return orders
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear &&
        order.paymentStatus === 'completed'
      );
    })
    .reduce((sum, order) => sum + order.total, 0);
};

export const calculateTotalSpending = (orders: Order[]): number => {
  return orders
    .filter((order) => order.paymentStatus === 'completed')
    .reduce((sum, order) => sum + order.total, 0);
};

export const calculateAverageOrderValue = (orders: Order[]): number => {
  const completedOrders = orders.filter(
    (order) => order.paymentStatus === 'completed'
  );
  if (completedOrders.length === 0) return 0;
  return completedOrders.reduce((sum, order) => sum + order.total, 0) / completedOrders.length;
};

export const getMonthName = (monthIndex: number): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[monthIndex];
};

export const generateMockOrders = (): Order[] => {
  return [
    {
      id: '1',
      orderNumber: 'ORD-20240115-A7K2',
      status: 'delivered',
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Exquisite Gold Gheroo Haram',
          productImage:
            'https://www.tanishq.co.in/dw/image/v2/BKCH_PRD/on/demandware.static/-/Sites-tan-ak-master/default/dw15b5e7ef/product/images/50/511518NFAAAB2_1.jpg?sw=640&sh=640',
          quantity: 1,
          price: 706345,
          total: 706345,
        },
      ],
      subtotal: 706345,
      tax: 42380,
      shipping: 0,
      total: 748725,
      paymentMethod: 'Credit Card',
      paymentStatus: 'completed',
      shippingAddress: {
        id: '1',
        type: 'home',
        fullName: 'John Doe',
        phone: '9876543210',
        street: '123 Main St',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
      billingAddress: {
        id: '1',
        type: 'home',
        fullName: 'John Doe',
        phone: '9876543210',
        street: '123 Main St',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: 'TRACK20240115001',
      timeline: [
        {
          id: '1',
          status: 'confirmed',
          timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Order confirmed',
        },
        {
          id: '2',
          status: 'shipped',
          timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Shipped from warehouse',
          location: 'Delhi',
        },
        {
          id: '3',
          status: 'delivered',
          timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Delivered',
          location: 'Delhi',
        },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-20240110-B3M5',
      status: 'shipped',
      items: [
        {
          id: '2',
          productId: '2',
          productName: 'Spectacular Leaf Pattern Gold Haram',
          productImage:
            'https://www.tanishq.co.in/dw/image/v2/BKCH_PRD/on/demandware.static/-/Sites-tan-ak-master/default/dw86a7d25e/product/images/51/511518NMAAAB2_1.jpg?sw=640&sh=640',
          quantity: 1,
          price: 1496571,
          total: 1496571,
        },
      ],
      subtotal: 1496571,
      tax: 89794,
      shipping: 0,
      total: 1586365,
      paymentMethod: 'Debit Card',
      paymentStatus: 'completed',
      shippingAddress: {
        id: '1',
        type: 'home',
        fullName: 'John Doe',
        phone: '9876543210',
        street: '123 Main St',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
      billingAddress: {
        id: '1',
        type: 'home',
        fullName: 'John Doe',
        phone: '9876543210',
        street: '123 Main St',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        isDefault: true,
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumber: 'TRACK20240110001',
      timeline: [
        {
          id: '4',
          status: 'confirmed',
          timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Order confirmed',
        },
        {
          id: '5',
          status: 'shipped',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          description: 'Shipped from warehouse',
          location: 'Delhi',
        },
      ],
    },
  ];
};

export const generateMockAnalytics = () => {
  const orders = generateMockOrders();
  const monthlyData = [];
  const currentDate = new Date();

  for (let i = 5; i >= 0; i--) {
    const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthName = getMonthName(month.getMonth());
    monthlyData.push({
      month: monthName,
      amount: Math.floor(Math.random() * 150000) + 50000,
    });
  }

  return {
    totalSpent: calculateTotalSpending(orders),
    averageOrderValue: calculateAverageOrderValue(orders),
    totalOrders: orders.length,
    loyaltyPoints: 12500,
    monthlySpending: monthlyData,
    categorySpending: [
      { category: 'Necklaces', amount: 400000, percentage: 30 },
      { category: 'Earrings', amount: 300000, percentage: 22 },
      { category: 'Rings', amount: 250000, percentage: 18 },
      { category: 'Bracelets', amount: 200000, percentage: 15 },
      { category: 'Others', amount: 250000, percentage: 15 },
    ],
  };
};
