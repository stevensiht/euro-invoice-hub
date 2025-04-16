
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import InvoiceForm from '@/components/invoices/InvoiceForm';
import { generateInvoicePDF } from '@/lib/pdfGenerator';
import { useToast } from '@/hooks/use-toast';
import { InvoiceItem } from '@/components/invoices/InvoiceItems';

interface InvoiceFormData {
  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerRegNumber: string;
  customerVat: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  notes: string;
  yourCompanyInfo: string;
  yourBankAccount: string;
  yourIban: string;
  yourBic: string;
  yourBank: string;
  items: InvoiceItem[];
  logoUrl: string | null;
}

const InvoiceCreate: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const handleFormSubmit = async (data: InvoiceFormData) => {
    setIsGeneratingPDF(true);
    
    try {
      // Calculate invoice totals
      const subtotal = data.items.reduce(
        (sum, item) => sum + (item.quantity * item.unitPrice), 
        0
      );
      
      // Generate the PDF
      const pdfBlob = await generateInvoicePDF({
        invoiceNumber: data.invoiceNumber,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        companyInfo: data.yourCompanyInfo,
        customerInfo: {
          name: data.customerName || 'No customer selected',
          address: data.customerAddress || '',
        },
        items: data.items,
        subtotal: subtotal,
        vat: 0, // Currently hard-coded to 0
        total: subtotal, // Same as subtotal since VAT is 0
        notes: data.notes,
        bankAccount: data.yourBankAccount,
        iban: data.yourIban,
        bic: data.yourBic,
        bank: data.yourBank,
        logoUrl: data.logoUrl
      });
      
      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${data.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success toast
      toast({
        title: "Invoice created successfully",
        description: `Invoice ${data.invoiceNumber} has been downloaded.`,
      });
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error creating invoice",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
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
          <InvoiceForm onFormSubmit={handleFormSubmit} isGeneratingPDF={isGeneratingPDF} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreate;
