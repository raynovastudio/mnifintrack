import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { businesses, formatCurrency, formatDate } from '@/lib/mockData';
import {
  Plus,
  Search,
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Businesses() {
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    currency: 'USD',
    status: 'active',
  });

  const filteredBusinesses = businesses.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Business created successfully!');
    setCreateOpen(false);
    setFormData({ name: '', currency: 'USD', status: 'active' });
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Businesses</h1>
          <p className="page-subtitle">Manage all your business entities</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Business
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Business</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateBusiness} className="space-y-4 pt-4">
              <div>
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter business name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => setFormData({ ...formData, currency: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Create Business
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search businesses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Businesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBusinesses.map((business, index) => {
          const profit = business.totalIncome - business.totalExpenses;
          const profitPercentage = ((profit / business.totalIncome) * 100).toFixed(1);

          return (
            <Link
              key={business.id}
              to={`/businesses/${business.id}`}
              className="block bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all animate-slide-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent">
                    <Building2 className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {business.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Created {formatDate(business.createdAt)}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant={business.status === 'active' ? 'default' : 'secondary'}
                  className={cn(
                    business.status === 'active' && 'bg-income/10 text-income hover:bg-income/20'
                  )}
                >
                  {business.status}
                </Badge>
                <Badge variant="outline">{business.currency}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Income</p>
                  <p className="text-lg font-semibold text-income">
                    {formatCurrency(business.totalIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expenses</p>
                  <p className="text-lg font-semibold text-expense">
                    {formatCurrency(business.totalExpenses)}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Net Profit</span>
                  <div className="flex items-center gap-1">
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
                </div>
                <p className="text-xs text-muted-foreground text-right mt-1">
                  {profitPercentage}% profit margin
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
