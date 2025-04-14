
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import InvoiceForm from '@/components/invoices/InvoiceForm';

const InvoiceCreate: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 p-8 pt-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" asChild>
            <Link to="/dashboard">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="ghost" className="rounded-full p-2" size="icon">
            <MoreVertical className="h-5 w-5" />
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
