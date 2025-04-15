
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

// Component Imports
import InvoiceHeader from './InvoiceHeader';
import CompanyInfo from './CompanyInfo';
import CustomerSelect from './CustomerSelect';
import InvoiceItems, { InvoiceItem } from './InvoiceItems';
import InvoiceTotals from './InvoiceTotals';
import PaymentDetails from './PaymentDetails';
import CustomerNotes from './CustomerNotes';
import FormActions from './FormActions';

type InvoiceFormData = {
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
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
};

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const today = format(new Date(), 'dd/MM/yyyy');
  const nextMonth = format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'dd/MM/yyyy');
  
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      unitPrice: 0,
    },
  ]);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const form = useForm<InvoiceFormData>({
    defaultValues: {
      invoiceNumber: 'INV-1016',
      issueDate: today,
      dueDate: nextMonth,
      yourCompanyInfo: 'Adfinea OÜ\nRannamõisa tee 5a\n13516 Tallinn\nEstonia\n\nReg: 14882759\nVAT #: EE102231175',
      yourBankAccount: 'Account holder: Adfinea OÜ',
      yourIban: 'IBAN: EE4977007710046243399',
      yourBic: 'BIC/SWIFT: LHVBEE22',
      yourBank: 'Bank: AS LHV Pank',
      notes: '',
    },
  });

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `${items.length + 1}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleChangeItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleQuantityChange = (id: string, value: string) => {
    const numericValue = value === '' ? 0 : parseInt(value) || 0;
    handleChangeItem(id, 'quantity', numericValue);
  };

  const incrementQuantity = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decrementQuantity = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    ));
  };

  const calculateItemTotal = (item: InvoiceItem): number => {
    return item.quantity * item.unitPrice;
  };

  const calculateSubtotal = (): number => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateVat = (): number => {
    return 0;
  };

  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateVat();
  };

  const handlePriceChange = (id: string, value: string) => {
    const numericValue = value === '' ? 0 : parseFloat(value) || 0;
    handleChangeItem(id, 'unitPrice', numericValue);
  };

  const onSubmit = (data: InvoiceFormData) => {
    console.log('Form data submitted:', { ...data, items, logoUrl });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 shadow-sm">
      <InvoiceHeader 
        invoiceNumber={form.watch('invoiceNumber')}
        issueDate={form.watch('issueDate')}
        dueDate={form.watch('dueDate')}
        onInvoiceNumberChange={(value) => form.setValue('invoiceNumber', value)}
        onIssueDateChange={(value) => form.setValue('issueDate', value)}
        onDueDateChange={(value) => form.setValue('dueDate', value)}
        logoUrl={logoUrl}
        onLogoChange={setLogoUrl}
      />

      <div className="grid grid-cols-2 gap-8 mb-10">
        <CompanyInfo 
          yourCompanyInfo={form.watch('yourCompanyInfo')}
          onCompanyInfoChange={(value) => form.setValue('yourCompanyInfo', value)}
        />
        <CustomerSelect />
      </div>

      <InvoiceItems 
        items={items}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onChangeItem={handleChangeItem}
        onQuantityChange={handleQuantityChange}
        onPriceChange={handlePriceChange}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        calculateItemTotal={calculateItemTotal}
        formatCurrency={formatCurrency}
      />
      
      <InvoiceTotals 
        subtotal={calculateSubtotal()}
        vat={calculateVat()}
        total={calculateTotal()}
        formatCurrency={formatCurrency}
      />

      <div className="grid grid-cols-2 gap-8 mb-10">
        <PaymentDetails 
          bankAccount={form.watch('yourBankAccount')}
          iban={form.watch('yourIban')}
          bic={form.watch('yourBic')}
          bank={form.watch('yourBank')}
          onBankAccountChange={(value) => form.setValue('yourBankAccount', value)}
          onIbanChange={(value) => form.setValue('yourIban', value)}
          onBicChange={(value) => form.setValue('yourBic', value)}
          onBankChange={(value) => form.setValue('yourBank', value)}
        />
        <CustomerNotes 
          notes={form.watch('notes')}
          onNotesChange={(value) => form.setValue('notes', value)}
        />
      </div>

      <FormActions onCancel={() => navigate('/dashboard')} />
    </form>
  );
};

export default InvoiceForm;
