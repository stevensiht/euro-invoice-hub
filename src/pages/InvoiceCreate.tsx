
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
      <div className="flex-1 p-6 pt-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" asChild size="sm">
            <Link to="/dashboard">
              <ChevronLeft className="mr-2 h-3 w-3" />
              Back
            </Link>
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <InvoiceForm />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreate;
