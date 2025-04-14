
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice } from '@/lib/types';
import { Euro, ArrowUpRight, ArrowDownRight, Clock, FileText } from 'lucide-react';

interface DashboardCardsProps {
  invoices: Invoice[];
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ invoices }) => {
  // Calculate statistics
  const totalInvoices = invoices.length;
  
  const totalAmount = invoices.reduce((acc, invoice) => acc + invoice.total, 0);
  
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const paidAmount = paidInvoices.reduce((acc, invoice) => acc + invoice.total, 0);
  
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
  const overdueAmount = overdueInvoices.reduce((acc, invoice) => acc + invoice.total, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <p className="text-xs text-muted-foreground">
            All created invoices
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          <Euro className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Sum of all invoices
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-invoice-paid" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{paidAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {paidInvoices.length} invoices paid
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <Clock className="h-4 w-4 text-invoice-overdue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{overdueAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {overdueInvoices.length} invoices overdue
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
