
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to dashboard by default
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl text-center">
        <div className="flex items-center justify-center mb-6">
          <FileText className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold ml-2">EuroInvoice Hub</h1>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Invoice Management for European Companies</h2>
        <p className="text-lg text-gray-600 mb-8">
          Create, manage, and track invoices with our sleek and modern dashboard.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
