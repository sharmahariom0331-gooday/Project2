# 🚀 Dashboard Quick Start Guide

## Accessing the Dashboard

### Step 1: Start the Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173` (or another port if 5173 is in use).

### Step 2: Access the Dashboard
Click the **👤 User Account Icon** in the header (top-right corner) to enter the dashboard.

## Dashboard Navigation

### Sidebar Menu Items

| Icon | Label | Purpose |
|------|-------|---------|
| 🏠 | Overview | Dashboard home with stats and recent orders |
| 👤 | Profile | View and edit user information and addresses |
| 📦 | Orders | View all orders, track shipments, download invoices |
| ❤️ | Wishlist | Manage saved favorite items |
| 🛍️ | Cart | View and manage shopping cart |
| 💳 | Payments | Manage payment methods and view history |
| 🔔 | Notifications | View order updates and offers |
| 🎁 | Rewards | Manage loyalty points and coupon codes |
| ✨ | Collection | View your purchased jewelry gallery |
| 📊 | Analytics | View spending trends and charts |
| ⚙️ | Settings | Configure preferences and security |

## Key Features Overview

### 📊 Dashboard Overview
- Quick stats on total orders, in-transit items, wishlist count, loyalty points
- Recent orders preview
- Quick action buttons
- Personalized recommendations
- Monthly spending overview

### 👤 Profile Management
**Edit Profile:**
1. Click the "Edit" button
2. Update first name, last name, email, phone
3. Click "Save Changes"

**Manage Addresses:**
1. Click "Add Address" button
2. Fill in address details
3. Select address type (Home/Work/Other)
4. Click "Add Address"
5. Edit or delete existing addresses using the buttons

### 📦 Orders
**View Orders:**
1. All orders displayed with status and date
2. Filter by status using buttons at the top
3. Click "View Details" to expand order information

**Track Order:**
- See timeline of order status updates
- View shipping address
- Check estimated delivery date
- Download invoice (when available)

### ❤️ Wishlist
**Add to Wishlist:**
- Click heart icon on products
- Items appear in Wishlist section

**Manage Wishlist:**
- View all saved items with price and material
- Remove items using trash icon
- Add items directly to cart

### 🛍️ Shopping Cart
**Manage Cart:**
1. Adjust quantities using +/- buttons
2. Remove items using trash icon
3. View real-time total with tax calculation
4. Proceed to checkout or clear cart

### 💳 Payment Methods
**Add Payment Method:**
1. Click "Add Payment Method"
2. Fill in card details
3. Save as default (optional)
4. Click "Add Card"

**View Payment History:**
- See all past transactions
- Check payment status
- View transaction IDs
- Link to associated orders

### 🔔 Notifications
**Manage Notifications:**
- All notifications listed by type
- Mark as read by clicking notification
- Delete using trash icon
- See unread count in sidebar badge

**Types of Notifications:**
- 📦 Order updates
- 🎯 Special offers
- 🚚 Delivery notifications
- 💬 System messages

### 🎁 Rewards & Offers
**Loyalty Points:**
- View total points balance
- See point value in rupees
- Track progress to next reward
- Redeem points for discounts

**Coupons:**
- Browse available coupon codes
- Copy code to clipboard
- View discount percentage/amount
- Check minimum order requirements
- Apply to current order

### ✨ Your Collection
**View Collection:**
- Gallery of all purchased jewelry items
- Item details (material, weight, purchase date)
- Download item image
- Share item with others

### 📊 Analytics
**Spending Insights:**
- Monthly spending trend line chart
- Category-wise spending pie chart
- Total spending overview
- Average order value
- Loyalty points summary
- Category breakdown with percentages

### ⚙️ Settings
**Notification Preferences:**
- Toggle Email/SMS/Push/Marketing notifications
- Control order update notifications

**Appearance:**
- Switch between Light/Dark mode
- Select language (English/Hindi/Spanish)
- Choose currency (INR/USD/EUR)

**Security:**
- Change password
- Confirm password match
- Save new password

## Sample Data

The dashboard comes with mock data for testing:

### Sample Orders
1. **Order ORD-20240115-A7K2** - Status: Delivered
   - Exquisite Gold Gheroo Haram (₹706,345)
   - Delivered 15 days ago

2. **Order ORD-20240110-B3M5** - Status: Shipped
   - Spectacular Leaf Pattern Gold Haram (₹1,496,571)
   - In transit, arriving in ~5 days

### Sample Analytics Data
- Last 6 months of spending data
- Category-wise breakdown:
  - Necklaces: 30%
  - Earrings: 22%
  - Rings: 18%
  - Bracelets: 15%
  - Others: 15%

### Sample Loyalty Points
- Balance: 12,500 points
- Worth: ~₹125
- Progress: 500 points to next reward

## Customization Tips

### Change Theme Colors
Edit `src/dashboard/styles/dashboard.css` root variables:
```css
:root {
  --primary: #D4AF37;  /* Gold color */
  --secondary: #C5A059; /* Darker gold */
  /* ... other colors ... */
}
```

### Modify Dashboard Layout
Components are modular and can be easily customized:
- Add/remove sidebar items in `Dashboard.tsx`
- Modify styling in `dashboard.css`
- Update state in `dashboardStore.ts`

### Add Mock Data
Update helpers in `src/dashboard/utils/helpers.ts`:
```typescript
export const generateMockOrders = (): Order[] => {
  // Add your custom orders here
}
```

## API Integration Steps

### 1. Replace Mock Data with API Calls

**In DashboardOverview.tsx:**
```typescript
useEffect(() => {
  const fetchData = async () => {
    const orders = await fetch('/api/orders').then(r => r.json());
    setOrders(orders);
  };
  fetchData();
}, []);
```

### 2. Add Environment Variables
Create/update `.env` file:
```
VITE_API_BASE_URL=https://your-api.com
VITE_API_KEY=your_api_key
```

### 3. Create API Service
```typescript
// src/services/api.ts
export const apiClient = async (endpoint: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
    {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
      }
    }
  );
  return response.json();
};
```

## Mobile Usage

The dashboard is fully responsive:
- **Tablet (768px-1200px)**: Sidebar collapses into a menu
- **Mobile (< 768px)**: Hamburger menu, single column layout

**Mobile Navigation:**
1. Click hamburger icon (☰) at top-left
2. Select section from menu
3. Click X or outside menu to close

## Performance Optimization

The dashboard is already optimized:
- Component-based code splitting
- Zustand for efficient state management
- Memoized components where needed
- CSS with CSS Grid and Flexbox

## Troubleshooting

### Dashboard not loading?
- Check browser console for errors
- Ensure all dependencies are installed: `npm install`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Dark mode not working?
- Check if dark class is being applied to root
- Verify CSS variables in root selector
- Check browser dev tools for style issues

### Charts not displaying?
- Ensure Recharts is installed
- Check data format in `AnalyticsSection.tsx`
- Verify container height and width

### State not persisting?
- Zustand stores data in memory only (not localStorage)
- To add persistence, use Zustand's persist middleware
- Update `useDashboardStore` with persist plugin

## Next Steps

1. **Connect to Backend**: Replace mock data with real API calls
2. **Add Authentication**: Implement user login/logout
3. **Enable Payments**: Integrate Razorpay or Stripe
4. **Real-time Updates**: Add Socket.io for live order tracking
5. **Email Notifications**: Send actual emails for orders
6. **Push Notifications**: Implement browser push notifications

## Useful Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check for type errors
npx tsc --noEmit

# Format code
npm run format

# Lint code
npm run lint
```

## File Locations Reference

| File | Purpose | Location |
|------|---------|----------|
| Dashboard Component | Main container | `src/dashboard/Dashboard.tsx` |
| State Store | Zustand store | `src/dashboard/store/dashboardStore.ts` |
| Type Definitions | TypeScript interfaces | `src/dashboard/types/index.ts` |
| Utilities | Helper functions | `src/dashboard/utils/helpers.ts` |
| Styling | Dashboard CSS | `src/dashboard/styles/dashboard.css` |
| Sub-components | Individual sections | `src/dashboard/components/*.tsx` |

## Support & Documentation

- Full documentation: See `DASHBOARD_README.md`
- Component documentation: Check comments in each component file
- Type definitions: See `src/dashboard/types/index.ts`
- Helper functions: See `src/dashboard/utils/helpers.ts`

---

**Happy Exploring! 🎉**

The dashboard is ready to use. Click the user icon to get started!
