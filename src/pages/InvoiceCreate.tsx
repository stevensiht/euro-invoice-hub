
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import InvoiceForm from '@/components/invoices/InvoiceForm';

const InvoiceCreate: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" asChild className="mb-4">
              <Link to="/dashboard">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Create New Invoice</h1>
            <p className="text-muted-foreground">
              Complete the form below to create a new invoice
            </p>
          </div>
        </div>
        
        <InvoiceForm />
      </div>
    </div>
  );
};

export default InvoiceCreate;
