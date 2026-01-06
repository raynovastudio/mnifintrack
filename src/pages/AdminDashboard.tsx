import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import {
  getTotalIncome,
  getTotalExpenses,
  getNetProfit,
  formatCurrency,
} from '@/lib/mockData';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const netProfit = getNetProfit();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Enter transactions and manage income & expenditure</p>
        </div>
        <TransactionModal />
      </div>

      {/* Role Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Your Role:</span> Data Entry Manager - You can add and manage transactions for all businesses
        </p>
      </div>

      {/* Quick Stats - Simplified */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 animate-fade-in">
        <StatCard
          title="Total Income"
          value={formatCurrency(totalIncome)}
          subtitle="All transactions"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          subtitle="All transactions"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <StatCard
          title="Net Balance"
          value={formatCurrency(netProfit)}
          subtitle="Current balance"
          icon={<Wallet className="h-5 w-5" />}
          variant="balance"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <p className="text-sm text-muted-foreground">Your latest entries and activities</p>
            </div>
            <Link to="/transactions">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <RecentTransactions />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Link to="/transactions">
          <div className="p-4 bg-card rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
            <h3 className="font-semibold mb-2">View All Transactions</h3>
            <p className="text-sm text-muted-foreground">Manage and filter all your transactions</p>
          </div>
        </Link>
        <Link to="/businesses">
          <div className="p-4 bg-card rounded-lg border border-border hover:bg-muted transition-colors cursor-pointer">
            <h3 className="font-semibold mb-2">Manage Businesses</h3>
            <p className="text-sm text-muted-foreground">View and manage your business accounts</p>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
}
