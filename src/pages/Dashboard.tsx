
import React from 'react';
import Header from '@/components/Header';
import DashboardCards from '@/components/dashboard/DashboardCards';
import InvoiceTable from '@/components/dashboard/InvoiceTable';
import { mockInvoices } from '@/data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="space-y-4">
          <DashboardCards invoices={mockInvoices} />
          <InvoiceTable invoices={mockInvoices} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
