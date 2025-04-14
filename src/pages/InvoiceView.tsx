
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import InvoiceDetail from '@/components/invoices/InvoiceDetail';
import { mockInvoices } from '@/data/mockData';

const InvoiceView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const invoice = mockInvoices.find(inv => inv.id === id);
  
  if (!invoice) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div>
            <Button variant="outline" asChild className="mb-4">
              <Link to="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Invoice Not Found</h1>
            <p className="mt-2">The requested invoice could not be found.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <InvoiceDetail invoice={invoice} />
      </div>
    </div>
  );
};

export default InvoiceView;
