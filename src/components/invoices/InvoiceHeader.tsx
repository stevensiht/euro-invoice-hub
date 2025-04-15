
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface InvoiceHeaderProps {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  onInvoiceNumberChange: (value: string) => void;
  onIssueDateChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  logoUrl: string | null;
  onLogoChange: (url: string | null) => void;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  invoiceNumber,
  issueDate,
  dueDate,
  onInvoiceNumberChange,
  onIssueDateChange,
  onDueDateChange,
  logoUrl,
  onLogoChange
}) => {
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onLogoChange(fileUrl);
    }
  };

  const removeLogo = () => {
    onLogoChange(null);
  };

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Invoice</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-28 font-medium">Invoice No:</span>
            <Input 
              value={invoiceNumber}
              onChange={(e) => onInvoiceNumberChange(e.target.value)}
              className="h-8 p-0 border-0 bg-transparent focus-visible:ring-0 text-black" 
            />
          </div>
          <div className="flex items-center">
            <span className="w-28 font-medium">Issue Date:</span>
            <Input 
              value={issueDate}
              onChange={(e) => onIssueDateChange(e.target.value)}
              className="h-8 p-0 border-0 bg-transparent focus-visible:ring-0 text-black" 
            />
          </div>
          <div className="flex items-center">
            <span className="w-28 font-medium">Due Date:</span>
            <Input 
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
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
  );
};

export default InvoiceHeader;
