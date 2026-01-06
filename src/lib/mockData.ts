// Mock data for the financial dashboard

export type ExpenseCategory = 'Repairs/Maintenance' | 'Salaries' | 'Purchases' | 'Gifts' | 'Refunds' | 'Transport' | 'Fuel' | 'Others';
export type IncomeCategory = 'Sales' | 'Returns' | 'Rentals' | 'Deposits' | 'Others';
export type TransactionCategory = ExpenseCategory | IncomeCategory;

export interface Business {
  id: string;
  name: string;
  currency: string;
  status: 'active' | 'inactive';
  createdAt: string;
  totalIncome: number;
  totalExpenses: number;
}

export interface Transaction {
  id: string;
  businessId: string;
  date: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: TransactionCategory;
  paymentMethod?: string;
}

// Category definitions
export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Repairs/Maintenance',
  'Salaries',
  'Purchases',
  'Gifts',
  'Refunds',
  'Transport',
  'Fuel',
  'Others',
];

export const INCOME_CATEGORIES: IncomeCategory[] = [
  'Sales',
  'Returns',
  'Rentals',
  'Deposits',
  'Others',
];

export const getCategoriesByType = (type: 'income' | 'expense'): TransactionCategory[] => {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
};

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Plantation - Palm Oil',
    currency: 'NGN',
    status: 'active',
    createdAt: '2024-01-15',
    totalIncome: 14580000,
    totalExpenses: 8920000,
  },
  {
    id: '2',
    name: 'Keke',
    currency: 'NGN',
    status: 'active',
    createdAt: '2024-03-22',
    totalIncome: 7850000,
    totalExpenses: 5230000,
  },
  {
    id: '3',
    name: 'Truck',
    currency: 'NGN',
    status: 'active',
    createdAt: '2024-02-10',
    totalIncome: 11200000,
    totalExpenses: 6780000,
  },
  {
    id: '4',
    name: 'PH Prop Management (Rental)',
    currency: 'NGN',
    status: 'active',
    createdAt: '2023-11-05',
    totalIncome: 9420000,
    totalExpenses: 2810000,
  },
  {
    id: '5',
    name: 'Umuahia (Umunze Prop) (Rental)',
    currency: 'NGN',
    status: 'active',
    createdAt: '2023-09-12',
    totalIncome: 4850000,
    totalExpenses: 1520000,
  },
  {
    id: '6',
    name: 'MNI Account',
    currency: 'NGN',
    status: 'active',
    createdAt: '2024-04-01',
    totalIncome: 25600000,
    totalExpenses: 18400000,
  },
  {
    id: '7',
    name: 'Sand Biz',
    currency: 'NGN',
    status: 'active',
    createdAt: '2024-05-15',
    totalIncome: 8750000,
    totalExpenses: 5120000,
  },
];


export const transactions: Transaction[] = [
  // Plantation - Palm Oil
  { id: 't1', businessId: '1', date: '2025-01-05', type: 'income', amount: 1250000, category: 'Sales', description: 'Palm oil bulk sale - 50 drums', paymentMethod: 'Bank Transfer' },
  { id: 't2', businessId: '1', date: '2025-01-04', type: 'expense', amount: 850000, category: 'Salaries', description: 'Monthly workers salaries', paymentMethod: 'Bank Transfer' },
  { id: 't3', businessId: '1', date: '2025-01-04', type: 'income', amount: 320000, category: 'Sales', description: 'Palm kernel sales', paymentMethod: 'Cash' },
  { id: 't4', businessId: '1', date: '2025-01-03', type: 'expense', amount: 150000, category: 'Purchases', description: 'Harvesting tools and cutlasses', paymentMethod: 'Cash' },

  // Keke
  { id: 't5', businessId: '2', date: '2025-01-05', type: 'income', amount: 185000, category: 'Sales', description: 'Daily Keke returns - 5 units', paymentMethod: 'Cash' },
  { id: 't6', businessId: '2', date: '2025-01-05', type: 'expense', amount: 68000, category: 'Repairs/Maintenance', description: 'Keke repairs and maintenance', paymentMethod: 'Cash' },
  { id: 't7', businessId: '2', date: '2025-01-04', type: 'income', amount: 210000, category: 'Sales', description: 'Daily Keke returns - weekend', paymentMethod: 'Cash' },
  { id: 't8', businessId: '2', date: '2025-01-04', type: 'expense', amount: 45000, category: 'Fuel', description: 'Fuel costs', paymentMethod: 'Cash' },

  // Truck
  { id: 't9', businessId: '3', date: '2025-01-05', type: 'income', amount: 890000, category: 'Sales', description: 'Haulage - Onitsha trip', paymentMethod: 'Bank Transfer' },
  { id: 't10', businessId: '3', date: '2025-01-05', type: 'expense', amount: 350000, category: 'Repairs/Maintenance', description: 'Engine repair and servicing', paymentMethod: 'Cash' },
  { id: 't11', businessId: '3', date: '2025-01-04', type: 'income', amount: 750000, category: 'Sales', description: 'Haulage - Lagos trip', paymentMethod: 'Bank Transfer' },
  { id: 't12', businessId: '3', date: '2025-01-03', type: 'expense', amount: 280000, category: 'Fuel', description: 'Diesel fuel', paymentMethod: 'Cash' },

  // PH Prop Management (Rental)
  { id: 't13', businessId: '4', date: '2025-01-05', type: 'income', amount: 1200000, category: 'Rentals', description: 'Monthly rent collection - Block A', paymentMethod: 'Bank Transfer' },
  { id: 't14', businessId: '4', date: '2025-01-04', type: 'expense', amount: 120000, category: 'Repairs/Maintenance', description: 'Plumbing repairs', paymentMethod: 'Cash' },
  { id: 't15', businessId: '4', date: '2025-01-03', type: 'income', amount: 850000, category: 'Rentals', description: 'Monthly rent - Block B', paymentMethod: 'Bank Transfer' },

  // Umuahia (Umunze Prop) (Rental)
  { id: 't16', businessId: '5', date: '2025-01-05', type: 'income', amount: 450000, category: 'Rentals', description: 'Quarterly rent payment', paymentMethod: 'Bank Transfer' },
  { id: 't17', businessId: '5', date: '2025-01-04', type: 'expense', amount: 85000, category: 'Repairs/Maintenance', description: 'Painting and renovation', paymentMethod: 'Cash' },

  // MNI Account
  { id: 't18', businessId: '6', date: '2025-01-05', type: 'income', amount: 2500000, category: 'Sales', description: 'Contract payment received', paymentMethod: 'Bank Transfer' },
  { id: 't19', businessId: '6', date: '2025-01-04', type: 'expense', amount: 1800000, category: 'Salaries', description: 'Staff salaries', paymentMethod: 'Bank Transfer' },
  { id: 't20', businessId: '6', date: '2025-01-03', type: 'income', amount: 1200000, category: 'Sales', description: 'Consulting fees', paymentMethod: 'Bank Transfer' },

  // Sand Biz
  { id: 't21', businessId: '7', date: '2025-01-05', type: 'income', amount: 650000, category: 'Sales', description: 'Sand delivery - 10 trips', paymentMethod: 'Cash' },
  { id: 't22', businessId: '7', date: '2025-01-04', type: 'expense', amount: 180000, category: 'Fuel', description: 'Tipper fuel and driver', paymentMethod: 'Cash' },
  { id: 't23', businessId: '7', date: '2025-01-03', type: 'income', amount: 520000, category: 'Sales', description: 'Sand delivery - 8 trips', paymentMethod: 'Cash' },
];

// Monthly summary data for charts
export const monthlyData = [
  { month: 'Jul', income: 8200000, expenses: 4800000 },
  { month: 'Aug', income: 9500000, expenses: 5200000 },
  { month: 'Sep', income: 10200000, expenses: 5800000 },
  { month: 'Oct', income: 11800000, expenses: 6400000 },
  { month: 'Nov', income: 12500000, expenses: 7100000 },
  { month: 'Dec', income: 14200000, expenses: 8200000 },
];

// Business breakdown for charts
export const getBusinessBreakdown = (type: 'income' | 'expense') => {
  const colors = [
    'hsl(160, 84%, 39%)',
    'hsl(200, 84%, 45%)',
    'hsl(240, 60%, 55%)',
    'hsl(280, 60%, 55%)',
    'hsl(320, 60%, 55%)',
    'hsl(40, 80%, 50%)',
    'hsl(80, 60%, 45%)',
  ];
  
  return businesses.map((business, index) => ({
    name: business.name,
    value: type === 'income' ? business.totalIncome : business.totalExpenses,
    color: colors[index % colors.length],
  }));
};

// Utility functions
export const formatCurrency = (amount: number, currency = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getBusinessById = (id: string): Business | undefined => {
  return businesses.find(b => b.id === id);
};

export const getTransactionsByBusiness = (businessId: string): Transaction[] => {
  return transactions.filter(t => t.businessId === businessId);
};

export const getTotalIncome = (): number => {
  return businesses.reduce((sum, b) => sum + b.totalIncome, 0);
};

export const getTotalExpenses = (): number => {
  return businesses.reduce((sum, b) => sum + b.totalExpenses, 0);
};

export const getNetProfit = (): number => {
  return getTotalIncome() - getTotalExpenses();
};

export const getActiveBusinessCount = (): number => {
  return businesses.filter(b => b.status === 'active').length;
};
