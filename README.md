# Track Your Money - Personal Finance Manager

A modern, responsive web application to manage your personal finances. Track income, expenses, savings, investments, and loans with beautiful visual analytics.

## 🎯 Features

### 1. **Transaction Management**
- Add income, expenses, savings, and investment transactions
- Set transaction date (defaults to today)
- Categorize transactions with predefined categories and sub-categories
- Add optional descriptions for each transaction
- View all transactions in a clean list format

### 2. **Dashboard Analytics**
- **Summary Cards**: Display total income, expenses, and savings with percentages
- **Pie Charts**: Visual breakdown of expenses and income by category
- **Circular Progress Indicators**: 
  - Expense rate (percentage of income spent)
  - Savings rate (percentage of income saved)
  - Investment rate (percentage of income invested)
- **Recent Transactions**: Quick view of the last 10 transactions
- **Time Filters**: Filter by current month, year, or custom date range

### 3. **Loan Management**
- Add multiple loans with details:
  - Loan name and principal amount
  - Interest rate and tenure
  - Automatic EMI calculation
- Track EMI payments with dedicated modal
- View due amount after each payment
- Track loan repayment progress with visual progress bar
- Delete loans when fully paid

### 4. **Financial Reports**
- **Monthly Report**: Income, expenses, savings, and net savings by month
- **Yearly Report**: Aggregate data by year
- **Category Report**: Breakdown by transaction category
- **Export to CSV**: Download transaction data for external use
- **Google Sheets Sync**: Integration ready (requires backend setup)

### 5. **Modern UI**
- Gradient backgrounds and smooth animations
- Responsive design (mobile, tablet, desktop)
- Dark-friendly color scheme with proper contrast
- Interactive charts using Chart.js
- Smooth transitions and hover effects

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required for basic functionality
- (Optional) Node.js for backend Google Sheets integration

### Installation

1. **Clone/Download the files**
   ```bash
   git clone <repository-url>
   cd "Track Your Money"
   ```

2. **Open in Browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 📁 Project Structure

```
Track Your Money/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and responsive design
├── script.js           # JavaScript logic and functionality
├── README.md           # This file
└── (Optional) backend/ # For Google Sheets integration
```

## 💾 Data Storage

### Current Implementation
- **Local Storage**: All data is stored in browser's localStorage
- Data persists across browser sessions
- No server required for basic functionality

### Data Structure
```javascript
{
  transactions: [
    {
      id: timestamp,
      date: "YYYY-MM-DD",
      type: "income|expense|saving|investment",
      category: "Main Category",
      subCategory: "Sub Category",
      description: "Optional details",
      amount: number
    }
  ],
  loans: [
    {
      id: timestamp,
      name: "Loan Name",
      principal: number,
      rate: percentage,
      tenure: months,
      startDate: "YYYY-MM-DD",
      emi: calculated_emi,
      paidAmount: number
    }
  ],
  emiPayments: {
    loanId: [{ date, amount }, ...]
  }
}
```

## 🔧 Transaction Categories

### Income
- **Salary**: Monthly, Annual Bonus, Additional Income
- **Business**: Sales, Services, Freelance
- **Investments**: Dividends, Interest, Rental Income
- **Other**: Gifts, Reimbursement

### Expenses
- **Food & Dining**: Groceries, Restaurants, Cafes
- **Transportation**: Fuel, Public Transport, Maintenance
- **Utilities**: Electricity, Water, Internet, Phone
- **Entertainment**: Movies, Games, Hobbies
- **Shopping**: Clothes, Electronics, Home
- **Healthcare**: Medical, Medicines, Fitness
- **Education**: Courses, Books, Tuition
- **Other**: Miscellaneous

### Savings
- **Bank Account**: Savings, Current, Others
- **Fixed Deposit**: 1 Year, 3 Year, 5 Year FDs
- **Piggy Bank**: Cash Box, Digital Savings
- **Other**: Miscellaneous

### Investments
- **Stock Market**: Stocks, Mutual Funds, ETF
- **Real Estate**: Property, REIT
- **Crypto**: Bitcoin, Ethereum, Others
- **Gold**: Physical Gold, Digital Gold
- **Bonds**: Government Bonds, Corporate Bonds
- **Other**: Others

## 📊 Dashboard Metrics

### Summary Cards
- **Total Income**: Sum of all income transactions in selected period
- **Total Expenses**: Sum of all expense transactions
- **Total Savings & Investments**: Combined savings and investment amounts

### Circular Progress (Percentages)
- **Expense Rate**: (Total Expenses / Total Income) × 100
- **Savings Rate**: (Total Savings / Total Income) × 100
- **Investment Rate**: (Total Investments / Total Income) × 100

### Charts
- **Expense Breakdown**: Pie chart of expenses by category
- **Income Breakdown**: Pie chart of income sources

## 🏦 Loan Management

### EMI Calculation Formula
```
EMI = (P × r × (1 + r)^n) / ((1 + r)^n - 1)

Where:
P = Principal Amount
r = Monthly Interest Rate (Annual Rate / 12 / 100)
n = Number of Months (Tenure)
```

### Tracking
1. Add new loan with principal, rate, and tenure
2. EMI is automatically calculated
3. Record monthly EMI payments
4. Due amount = Principal - Paid Amount
5. Progress bar shows repayment percentage

## 🔐 Security & Privacy

- All data stored locally in browser (localStorage)
- No data sent to external servers (except optional Google Sheets)
- No cookies or trackers
- Data is private and under your control

## 🔗 Google Sheets Integration (Optional)

To integrate with Google Sheets for cloud backup:

### Backend Setup Required
1. Create Google Sheets API credentials
2. Set up OAuth2 authentication
3. Create backend endpoint `/api/sync-sheets`
4. Implement token refresh logic

### Example Backend (Node.js + Express)
```javascript
// server.js
const express = require('express');
const { google } = require('googleapis');

const app = express();
app.use(express.json());

// Configure OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

app.post('/api/sync-sheets', async (req, res) => {
  try {
    const { transactions, lastSync } = req.body;
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    
    // Append transactions to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: {
        values: transactions.map(t => [
          t.date, t.type, t.category, t.subCategory, t.description, t.amount
        ])
      }
    });
    
    res.json({ success: true, message: 'Data synced successfully' });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ error: 'Sync failed' });
  }
});
```

## 📱 Responsive Design

The app is fully responsive:
- **Desktop**: Full-width layout with multi-column grids
- **Tablet**: Adjusted grid with touch-friendly buttons
- **Mobile**: Single column layout with stacked elements

## 🎨 Customization

### Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --danger-color: #f56565;
    /* ... more colors ... */
}
```

### Currency
Change ₹ to your currency symbol in:
- `index.html` (search for ₹)
- `script.js` (update currency display)

### Categories
Modify category structure in `script.js`:
```javascript
const categories = {
    income: {
        'Your Category': ['Your SubCategory 1', 'Your SubCategory 2'],
        // ...
    },
    // ...
};
```

## 🐛 Troubleshooting

### Data not saving?
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for errors (F12)

### Charts not displaying?
- Ensure Chart.js CDN is accessible
- Check internet connection
- Try clearing browser cache

### Calculations seem wrong?
- Verify transaction amounts are correct
- Ensure correct transaction type is selected
- Check date filters are set correctly

## 📝 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- ES6 JavaScript support
- localStorage API
- CSS Grid & Flexbox

## 🚀 Future Enhancements

- [ ] Budget planning and alerts
- [ ] Advanced filtering and search
- [ ] Data visualization improvements
- [ ] Mobile app version
- [ ] Multi-user support
- [ ] Cloud synchronization
- [ ] Recurring transactions
- [ ] Receipt uploads
- [ ] Bill reminders
- [ ] Financial goals tracking

## 📄 License

This project is open source. Feel free to modify and use for personal purposes.

## 🤝 Contributing

Found a bug or want to add a feature? Feel free to contribute!

## 📧 Support

For questions or issues, please open an issue or contact the developer.

---

**Happy Tracking!** 💰📊✨

---

## Quick Reference

### Keyboard Shortcuts
- Can be added in future versions

### Excel Export
- Currently CSV export is available
- Google Sheets sync can be added with backend

### Data Backup
- Regularly export to CSV for backup
- Use browser's sync for cross-device access

### Tips for Best Results
1. Add transactions regularly
2. Use proper categories for better insights
3. Review reports monthly
4. Track loans carefully
5. Set financial goals based on data

