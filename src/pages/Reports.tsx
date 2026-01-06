import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { businesses, formatCurrency, monthlyData, getBusinessBreakdown } from '@/lib/mockData';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  Building2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { toast } from 'sonner';

export default function Reports() {
  const [selectedBusiness, setSelectedBusiness] = useState('all');
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('01');

  const currentBusiness =
    selectedBusiness === 'all' ? null : businesses.find((b) => b.id === selectedBusiness);

  // Calculate totals
  const totalIncome = currentBusiness
    ? currentBusiness.totalIncome
    : businesses.reduce((sum, b) => sum + b.totalIncome, 0);
  const totalExpenses = currentBusiness
    ? currentBusiness.totalExpenses
    : businesses.reduce((sum, b) => sum + b.totalExpenses, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  const handleExport = (format: 'excel' | 'pdf') => {
    const businessName = currentBusiness ? currentBusiness.name : 'All Businesses';
    toast.success(`Generating ${reportPeriod} report for ${businessName} as ${format.toUpperCase()}...`);
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const businessBreakdown = getBusinessBreakdown('income');

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Financial reports and analytics by business</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
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
      </div>

      {/* Filters */}
      <div className="filter-bar mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Business
            </label>
            <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
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
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Report Type
            </label>
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {reportPeriod === 'monthly' && (
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
                Month
              </label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5 border-l-4 border-l-income">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-income-muted rounded-lg">
              <TrendingUp className="h-5 w-5 text-income" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 border-l-4 border-l-expense">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-expense-muted rounded-lg">
              <TrendingDown className="h-5 w-5 text-expense" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalExpenses)}</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent rounded-lg">
              <Calendar className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Net Profit</span>
          </div>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-income' : 'text-expense'}`}>
            {formatCurrency(netProfit)}
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-muted rounded-lg">
              <Building2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Profit Margin</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{profitMargin}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-foreground mb-4">Income vs Expenses</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
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
                  tickFormatter={(value) => `₦${value / 1000000}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(220, 13%, 91%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
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

        {/* Pie Chart - Business Income Breakdown */}
        <div className="chart-container">
          <h3 className="text-lg font-semibold text-foreground mb-4">Income by Business</h3>
          <div className="h-[350px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={businessBreakdown}
                  cx="50%"
                  cy="45%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {businessBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(220, 13%, 91%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatCurrency(value), '']} 
                />
                <Legend
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: 10 }}
                  formatter={(value) => (
                    <span className="text-xs sm:text-sm text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Business Summary Table */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold text-foreground mb-4">Business Summary</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Business</th>
                <th className="text-right">Income</th>
                <th className="text-right">Expenses</th>
                <th className="text-right">Profit</th>
                <th className="text-right">Margin</th>
              </tr>
            </thead>
            <tbody>
              {businesses
                .map((business) => {
                  const profit = business.totalIncome - business.totalExpenses;
                  const margin = ((profit / business.totalIncome) * 100).toFixed(1);

                  return (
                    <tr key={business.id}>
                      <td className="font-medium">{business.name}</td>
                      <td className="text-right text-income font-semibold">
                        {formatCurrency(business.totalIncome)}
                      </td>
                      <td className="text-right text-expense font-semibold">
                        {formatCurrency(business.totalExpenses)}
                      </td>
                      <td className={`text-right font-semibold ${profit >= 0 ? 'text-income' : 'text-expense'}`}>
                        {formatCurrency(profit)}
                      </td>
                      <td className="text-right text-muted-foreground">{margin}%</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
