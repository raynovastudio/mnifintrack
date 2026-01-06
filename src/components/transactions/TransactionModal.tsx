import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { businesses } from '@/lib/mockData';
import { Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TransactionModalProps {
  trigger?: React.ReactNode;
  defaultBusinessId?: string;
}

export function TransactionModal({ trigger, defaultBusinessId }: TransactionModalProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [formData, setFormData] = useState({
    businessId: defaultBusinessId || '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    paymentMethod: '',
  });

  const activeBusinesses = businesses.filter((b) => b.status === 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to the database
    toast.success(`${type === 'income' ? 'Income' : 'Expense'} transaction added successfully!`);
    setOpen(false);
    setFormData({
      businessId: defaultBusinessId || '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      description: '',
      paymentMethod: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Transaction Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => setType('income')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
                type === 'income'
                  ? 'bg-card text-income shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ArrowDownLeft className="w-4 h-4" />
              Income
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all',
                type === 'expense'
                  ? 'bg-card text-expense shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ArrowUpRight className="w-4 h-4" />
              Expense
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Business Select */}
            <div className="col-span-2">
              <Label htmlFor="business">Business</Label>
              <Select
                value={formData.businessId}
                onValueChange={(value) => setFormData({ ...formData, businessId: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select business" />
                </SelectTrigger>
                <SelectContent>
                  {activeBusinesses.map((business) => (
                    <SelectItem key={business.id} value={business.id}>
                      {business.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1.5"
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₦
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-7"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="col-span-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add notes about this transaction..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5 resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className={cn(
                'flex-1',
                type === 'income'
                  ? 'bg-income hover:bg-income/90'
                  : 'bg-expense hover:bg-expense/90'
              )}
            >
              Add {type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
