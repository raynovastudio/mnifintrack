import { businesses, formatCurrency } from '@/lib/mockData';
import { Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function BusinessesOverview() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Business Performance</h3>
          <p className="text-sm text-muted-foreground">Profit/loss by business</p>
        </div>
        <Link to="/businesses">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {businesses.slice(0, 4).map((business) => {
          const profit = business.totalIncome - business.totalExpenses;
          const profitPercentage = ((profit / business.totalIncome) * 100).toFixed(1);

          return (
            <Link
              key={business.id}
              to={`/businesses/${business.id}`}
              className="block p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                    <Building2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{business.name}</p>
                    <Badge
                      variant={business.status === 'active' ? 'default' : 'secondary'}
                      className={cn(
                        'mt-1 text-xs',
                        business.status === 'active' && 'bg-income/10 text-income hover:bg-income/20'
                      )}
                    >
                      {business.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    {profit >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-income" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-expense" />
                    )}
                    <span
                      className={cn(
                        'text-lg font-bold',
                        profit >= 0 ? 'text-income' : 'text-expense'
                      )}
                    >
                      {formatCurrency(Math.abs(profit))}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {profitPercentage}% margin
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Income</p>
                  <p className="text-sm font-medium text-income">
                    {formatCurrency(business.totalIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Expenses</p>
                  <p className="text-sm font-medium text-expense">
                    {formatCurrency(business.totalExpenses)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
