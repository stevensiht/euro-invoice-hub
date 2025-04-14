
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-4">
          <FileText className="h-6 w-6" />
          <span className="text-lg font-semibold">EuroInvoice Hub</span>
        </div>
        <nav className="ml-8 flex items-center gap-4 lg:gap-6">
          <Link
            to="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/invoices"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Invoices
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/invoice/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
