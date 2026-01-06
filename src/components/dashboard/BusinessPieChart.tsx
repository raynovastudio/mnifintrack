import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getBusinessBreakdown, formatCurrency } from '@/lib/mockData';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function BusinessPieChart() {
  const [activeType, setActiveType] = useState<'income' | 'expense'>('income');
  const data = getBusinessBreakdown(activeType);

  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Business Breakdown</h3>
          <p className="text-sm text-muted-foreground">Distribution by business</p>
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveType('income')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeType === 'income'
                ? 'bg-card text-income shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Income
          </button>
          <button
            onClick={() => setActiveType('expense')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
              activeType === 'expense'
                ? 'bg-card text-expense shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Expense
          </button>
        </div>
      </div>
      <div className="h-[350px] sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="40%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 13%, 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => (
                <span className="text-xs sm:text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
