
import React from 'react';

interface InvoiceTotalsProps {
  subtotal: number;
  vat: number;
  total: number;
  formatCurrency: (amount: number) => string;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({ subtotal, vat, total, formatCurrency }) => {
  return (
    <div className="border-t border-gray-200 pt-4 mb-8">
      <div className="flex justify-end mb-2">
        <span className="w-32 text-gray-500">Subtotal</span>
        <span className="w-32 text-right font-mono">{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-end mb-2">
        <span className="w-32 text-gray-500">VAT (0%)</span>
        <span className="w-32 text-right font-mono">{formatCurrency(vat)}</span>
      </div>
      <div className="flex justify-end pt-2 border-t border-gray-200">
        <span className="w-32 text-gray-700 font-medium">Total</span>
        <span className="w-32 text-right font-mono text-xl font-bold">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default InvoiceTotals;
