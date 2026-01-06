import { transactions, formatCurrency, formatDate, businesses } from '@/lib/mockData';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function RecentTransactions() {
  const recentTransactions = transactions.slice(0, 8);

  const getBusinessName = (businessId: string) => {
    return businesses.find(b => b.id === businessId)?.name || 'Unknown';
  };

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Latest activity across all businesses</p>
        </div>
        <Link to="/transactions">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-full shrink-0',
                transaction.type === 'income' ? 'bg-income-muted' : 'bg-expense-muted'
              )}
            >
              {transaction.type === 'income' ? (
                <ArrowDownLeft className="w-5 h-5 text-income" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-expense" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {transaction.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {getBusinessName(transaction.businessId)} · {formatDate(transaction.date)}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p
                className={cn(
                  'text-sm font-semibold',
                  transaction.type === 'income' ? 'text-income' : 'text-expense'
                )}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
