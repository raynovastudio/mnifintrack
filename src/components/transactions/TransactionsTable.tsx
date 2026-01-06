import { Transaction, businesses, formatCurrency, formatDate } from '@/lib/mockData';
import { ArrowDownLeft, ArrowUpRight, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const getBusinessName = (businessId: string) => {
    return businesses.find((b) => b.id === businessId)?.name || 'Unknown';
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-xl border border-border">
        <p className="text-muted-foreground">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th className="rounded-tl-xl">Date</th>
              <th>Business</th>
              <th>Type</th>
              <th>Description</th>
              <th className="text-right">Amount</th>
              <th className="rounded-tr-xl w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="group">
                <td className="whitespace-nowrap">
                  <span className="text-sm text-foreground">
                    {formatDate(transaction.date)}
                  </span>
                </td>
                <td>
                  <span className="text-sm text-foreground font-medium">
                    {getBusinessName(transaction.businessId)}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex items-center justify-center w-7 h-7 rounded-full shrink-0',
                        transaction.type === 'income' ? 'bg-income-muted' : 'bg-expense-muted'
                      )}
                    >
                      {transaction.type === 'income' ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-income" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-expense" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium capitalize',
                        transaction.type === 'income' ? 'text-income' : 'text-expense'
                      )}
                    >
                      {transaction.type}
                    </span>
                  </div>
                </td>
                <td className="max-w-[300px]">
                  <span className="text-sm text-foreground truncate block">
                    {transaction.description}
                  </span>
                </td>
                <td className="text-right whitespace-nowrap">
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    )}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
