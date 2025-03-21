=# Budget Bruh Frontend

The React frontend for **Budget Bruh** – a finance tracker that roasts your spending habits with humor and attitude.

> ⚠️ **Note:** This project is currently under active development. Features may change and improvements are ongoing.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **React** – For building the user interface
- **Tailwind CSS** – For responsive styling with custom design elements
- **LocalStorage** – For client-side data persistence

## 📊 Current Features

- **Expense Tracking** – Log expenses with categories, amounts, and dates
- **Dashboard** – View your spending summary with humorous commentary
- **Spending Stats** – Analyze your spending patterns with detailed breakdowns
- **Roast System** – Get "roasted" based on your spending habits with varying intensity levels
- **Bruh Moments** – Special notifications when you make large purchases
- **Responsive Design** – Works on both desktop and mobile devices

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   │    ├── BruhMoment.js       # Handles special "Bruh" notifications
│   │    ├── Dashboard.js        # Main spending overview
│   │    ├── ExpenseForm.js      # Form for logging expenses
│   │    ├── ExpenseList.js      # Displays logged expenses
│   │    ├── Footer.js           # Application footer
│   │    ├── Header.js           # Header with navigation
│   │    ├── LoadingSpinner.js   # Loading indicator
│   │    ├── Navigation.js       # App navigation
│   │    ├── RoastSystem.js      # Logic for generating spending roasts
│   │    ├── SpendingChart.js    # Visual representation of spending
│   │    └── SpendingStats.js    # Detailed spending analysis
│   ├── utils/           # Utility functions
│   │    ├── expenseUtils.js     # Helpers for managing expense data
│   │    └── roastGenerator.js   # Functions to create personalized roasts
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   ├── index.js         # Application entry point
│   ├── index.css        # Global CSS styling
│   ├── logo.svg         # Application logo
│   ├── reportWebVitals.js # Performance measurement
│   └── setupTests.js    # Setup for testing environment
├── .gitignore          # Files and directories to ignore in Git
├── package.json        # Project metadata and scripts
├── package-lock.json   # Locked dependency versions
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # Project documentation
```

## 📝 Available Scripts

- `npm start` – Run the development server
- `npm test` – Execute tests
- `npm run build` – Build for production

## 🔮 Upcoming Features

- **Budget Setting** – Set monthly budgets for different categories
- **Expense Categories Customization** – Create and customize your own expense categories
- **Data Visualization** – Enhanced charts and graphs for better spending insights
- **Export/Import** – Export your data to CSV or import from banking apps
- **Dark Mode** – For late-night financial regret sessions
- **Achievement System** – Unlock achievements for financial milestones (both good and bad)
- **Progressive Web App** – Install as a standalone app on your device

## 🤝 Contributing

This project is in development, but contributions are welcome! Feel free to submit issues or pull requests.


## ⚖️ License

This project is licensed under the MIT License - see the LICENSE file for details.