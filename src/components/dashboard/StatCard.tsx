import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'income' | 'expense' | 'balance';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="h-3 w-3" />;
    if (trend.value < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (!trend) return '';
    if (variant === 'expense') {
      // For expenses, going up is bad
      return trend.value > 0 ? 'text-expense' : trend.value < 0 ? 'text-income' : 'text-muted-foreground';
    }
    // For income/balance, going up is good
    return trend.value > 0 ? 'text-income' : trend.value < 0 ? 'text-expense' : 'text-muted-foreground';
  };

  return (
    <div
      className={cn(
        'stat-card',
        variant === 'income' && 'stat-card-income',
        variant === 'expense' && 'stat-card-expense',
        variant === 'balance' && 'stat-card-balance',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'p-2.5 rounded-xl',
              variant === 'income' && 'bg-income-muted text-income',
              variant === 'expense' && 'bg-expense-muted text-expense',
              variant === 'balance' && 'bg-accent text-accent-foreground',
              variant === 'default' && 'bg-muted text-muted-foreground'
            )}
          >
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={cn('flex items-center gap-1 mt-3 text-xs font-medium', getTrendColor())}>
          {getTrendIcon()}
          <span>{Math.abs(trend.value)}%</span>
          <span className="text-muted-foreground font-normal">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
