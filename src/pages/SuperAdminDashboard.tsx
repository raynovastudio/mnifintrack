import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { BusinessPieChart } from '@/components/dashboard/BusinessPieChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { BusinessesOverview } from '@/components/dashboard/BusinessesOverview';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import {
  getTotalIncome,
  getTotalExpenses,
  getNetProfit,
  getActiveBusinessCount,
  formatCurrency,
} from '@/lib/mockData';
import { TrendingUp, TrendingDown, Wallet, Building2 } from 'lucide-react';

export default function SuperAdminDashboard() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const netProfit = getNetProfit();
  const activeBusinesses = getActiveBusinessCount();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Complete overview of all business transactions, income, expenses, and profitability</p>
        </div>
        <TransactionModal />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in">
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          subtitle="All businesses"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 12.5, label: 'vs last month' }}
          variant="income"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          subtitle="All businesses"
          icon={<TrendingDown className="h-5 w-5" />}
          trend={{ value: 8.2, label: 'vs last month' }}
          variant="expense"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(netProfit)}
          subtitle="This period"
          icon={<Wallet className="h-5 w-5" />}
          trend={{ value: 18.3, label: 'vs last month' }}
          variant="balance"
        />
        <StatCard
          title="Active Businesses"
          value={activeBusinesses.toString()}
          subtitle="Out of 4 total"
          icon={<Building2 className="h-5 w-5" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <RevenueChart />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <BusinessPieChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <RecentTransactions />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <BusinessesOverview />
        </div>
      </div>
    </DashboardLayout>
  );
}
