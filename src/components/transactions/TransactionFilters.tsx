import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { businesses } from '@/lib/mockData';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  search: string;
  businessId: string;
  type: string;
  dateFrom: string;
  dateTo: string;
}

interface TransactionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function TransactionFilters({ filters, onFiltersChange }: TransactionFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== '' && value !== 'all'
  );

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      businessId: 'all',
      type: 'all',
      dateFrom: '',
      dateTo: '',
    });
  };

  return (
    <div className="filter-bar">
      {/* Search and Toggle */}
      <div className="flex flex-1 gap-3 min-w-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(hasActiveFilters && 'border-primary text-primary')}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="w-full flex flex-wrap gap-3 pt-3 border-t border-border mt-3">
          {/* Business Filter */}
          <Select
            value={filters.businessId}
            onValueChange={(value) => onFiltersChange({ ...filters, businessId: value })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Businesses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Businesses</SelectItem>
              {businesses.map((business) => (
                <SelectItem key={business.id} value={business.id}>
                  {business.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={filters.type}
            onValueChange={(value) => onFiltersChange({ ...filters, type: value })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
              className="w-[140px]"
              placeholder="From"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
              className="w-[140px]"
              placeholder="To"
            />
          </div>
        </div>
      )}
    </div>
  );
}
