import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { TransactionFilters, FilterState } from '@/components/transactions/TransactionFilters';
import { TransactionsTable } from '@/components/transactions/TransactionsTable';
import { transactions, formatCurrency } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function Transactions() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    businessId: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: '',
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      // Search filter
      if (
        filters.search &&
        !t.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Business filter
      if (filters.businessId !== 'all' && t.businessId !== filters.businessId) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && t.type !== filters.type) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && t.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && t.date > filters.dateTo) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Calculate summary stats for filtered transactions
  const stats = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, net: income - expenses };
  }, [filteredTransactions]);

  const handleExport = (format: 'excel' | 'pdf') => {
    toast.success(`Exporting ${filteredTransactions.length} transactions to ${format.toUpperCase()}...`);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">View and manage all transactions</p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2">
                <FileText className="w-4 h-4" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TransactionModal />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Filtered Income</p>
          <p className="text-2xl font-bold text-income">{formatCurrency(stats.income)}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Filtered Expenses</p>
          <p className="text-2xl font-bold text-expense">{formatCurrency(stats.expenses)}</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
          <p className={`text-2xl font-bold ${stats.net >= 0 ? 'text-income' : 'text-expense'}`}>
            {formatCurrency(stats.net)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <TransactionFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </p>
      </div>

      {/* Transactions Table */}
      <TransactionsTable transactions={filteredTransactions} />
    </DashboardLayout>
  );
}
