import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import {
  getBusinessById,
  getTransactionsByBusiness,
  formatCurrency,
  formatDate,
  monthlyData,
} from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  Building2,
  Pencil,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id || '');
  const transactions = getTransactionsByBusiness(id || '');

  if (!business) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Business not found</h2>
          <p className="text-muted-foreground mb-4">
            The business you're looking for doesn't exist.
          </p>
          <Link to="/businesses">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Businesses
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const profit = business.totalIncome - business.totalExpenses;
  const profitPercentage = ((profit / business.totalIncome) * 100).toFixed(1);

  // Today's transactions
  const today = new Date().toISOString().split('T')[0];
  const todayTransactions = transactions.filter((t) => t.date === today);
  const todayIncome = todayTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const todayExpenses = todayTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link to="/businesses" className="hover:text-foreground transition-colors">
          Businesses
        </Link>
        <span>/</span>
        <span className="text-foreground">{business.name}</span>
      </div>

      {/* Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent shrink-0">
            <Building2 className="w-7 h-7 text-accent-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="page-title">{business.name}</h1>
              <Badge
                variant={business.status === 'active' ? 'default' : 'secondary'}
                className={cn(
                  business.status === 'active' && 'bg-income/10 text-income hover:bg-income/20'
                )}
              >
                {business.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {formatDate(business.createdAt)}
              </span>
              <span>Currency: {business.currency}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <TransactionModal defaultBusinessId={business.id} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          title="Today's Income"
          value={formatCurrency(todayIncome)}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <StatCard
          title="Today's Expenses"
          value={formatCurrency(todayExpenses)}
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(business.totalIncome)}
          subtitle="All time"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="income"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(business.totalExpenses)}
          subtitle="All time"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="expense"
        />
        <StatCard
          title="Total Profit"
          value={formatCurrency(profit)}
          subtitle={`${profitPercentage}% margin`}
          icon={<Wallet className="h-5 w-5" />}
          variant="balance"
        />
      </div>

      {/* Chart */}
      <div className="chart-container mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Monthly Performance</h3>
            <p className="text-sm text-muted-foreground">Income vs Expenses breakdown</p>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 12 }}
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [`₦${value.toLocaleString()}`, '']}
              />
              <Legend wrapperStyle={{ paddingTop: 20 }} iconType="circle" iconSize={8} />
              <Bar
                dataKey="income"
                name="Income"
                fill="hsl(160, 84%, 39%)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="hsl(0, 72%, 51%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <Link to={`/transactions?business=${business.id}`}>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </Link>
        </div>
        <TransactionsTable transactions={transactions} />
      </div>
    </DashboardLayout>
  );
}
