import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Plus, Minus, Upload, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

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
  const [showRemoveButton, setShowRemoveButton] = useState(false);

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

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLogoUrl(fileUrl);
    }
  };

  const removeLogo = () => {
    setLogoUrl(null);
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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Invoice</h1>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-28 font-medium">Invoice No:</span>
              <Input 
                {...form.register('invoiceNumber')}
                className="h-8 p-0 border-0 bg-transparent focus-visible:ring-0 text-black" 
              />
            </div>
            <div className="flex items-center">
              <span className="w-28 font-medium">Issue Date:</span>
              <Input 
                {...form.register('issueDate')}
                className="h-8 p-0 border-0 bg-transparent focus-visible:ring-0 text-black" 
              />
            </div>
            <div className="flex items-center">
              <span className="w-28 font-medium">Due Date:</span>
              <Input 
                {...form.register('dueDate')}
                className="h-8 p-0 border-0 bg-transparent focus-visible:ring-0 text-black" 
              />
            </div>
          </div>
        </div>

        <div className="relative group">
          {logoUrl ? (
            <div 
              className="relative h-20 w-20 rounded-md overflow-hidden"
              onMouseEnter={() => setShowRemoveButton(true)}
              onMouseLeave={() => setShowRemoveButton(false)}
            >
              <img src={logoUrl} alt="Company logo" className="h-full w-full object-contain" />
              {showRemoveButton && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                  onClick={removeLogo}
                >
                  <X className="h-6 w-6 text-white" />
                  <span className="text-white text-xs">Remove</span>
                </div>
              )}
            </div>
          ) : (
            <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <Upload className="h-6 w-6 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500">Add logo</span>
            </label>
          )}
          <input 
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-sm text-gray-500 mb-2">From</h2>
          <Textarea 
            {...form.register('yourCompanyInfo')}
            className="min-h-[180px] resize-none border-0 p-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        <div>
          <h2 className="text-sm text-gray-500 mb-2">To</h2>
          <div className="p-3 border border-dashed border-gray-300 bg-gray-50 rounded-md flex items-center justify-center h-32 text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">
            Select customer
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-12 gap-4 mb-2 text-sm text-gray-500">
          <div className="col-span-5">Description</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Total</div>
        </div>
        
        {items.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
            <div className="col-span-5">
              <Input
                value={item.description}
                onChange={(e) => handleChangeItem(item.id, 'description', e.target.value)}
                className="w-full"
                placeholder="Item description"
              />
            </div>
            <div className="col-span-3 flex items-center justify-center">
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => decrementQuantity(item.id)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                value={item.quantity === 0 ? '' : item.quantity.toString()}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="w-16 text-center mx-2"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => incrementQuantity(item.id)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="col-span-2">
              <Input
                value={item.unitPrice}
                onChange={(e) => handlePriceChange(item.id, e.target.value)}
                className="text-right"
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
              />
            </div>
            <div className="col-span-2 text-right font-mono">
              {formatCurrency(calculateItemTotal(item))}
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="ghost" 
          onClick={handleAddItem}
          className="mt-2 text-gray-500"
        >
          <Plus className="h-4 w-4 mr-2" /> Add item
        </Button>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-8">
        <div className="flex justify-end mb-2">
          <span className="w-32 text-gray-500">Subtotal</span>
          <span className="w-32 text-right font-mono">{formatCurrency(calculateSubtotal())}</span>
        </div>
        <div className="flex justify-end mb-2">
          <span className="w-32 text-gray-500">VAT (0%)</span>
          <span className="w-32 text-right font-mono">{formatCurrency(calculateVat())}</span>
        </div>
        <div className="flex justify-end pt-2 border-t border-gray-200">
          <span className="w-32 text-gray-700 font-medium">Total</span>
          <span className="w-32 text-right font-mono text-xl font-bold">{formatCurrency(calculateTotal())}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-sm text-gray-500 mb-2">Payment Details</h2>
          <div className="space-y-1">
            <Input 
              {...form.register('yourBankAccount')}
              className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
            />
            <Input 
              {...form.register('yourIban')}
              className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
            />
            <Input 
              {...form.register('yourBic')}
              className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
            />
            <Input 
              {...form.register('yourBank')}
              className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
            />
          </div>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 mb-2">Note</h2>
          <Textarea 
            {...form.register('notes')}
            className="h-32 bg-gray-50 border-gray-200" 
            placeholder="Additional notes for the customer..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </Button>
        <Button type="submit" className="px-8">
          Create
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
