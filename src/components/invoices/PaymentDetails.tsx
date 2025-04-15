
import React from 'react';
import { Input } from '@/components/ui/input';

interface PaymentDetailsProps {
  bankAccount: string;
  iban: string;
  bic: string;
  bank: string;
  onBankAccountChange: (value: string) => void;
  onIbanChange: (value: string) => void;
  onBicChange: (value: string) => void;
  onBankChange: (value: string) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  bankAccount,
  iban,
  bic,
  bank,
  onBankAccountChange,
  onIbanChange,
  onBicChange,
  onBankChange
}) => {
  return (
    <div>
      <h2 className="text-sm text-gray-500 mb-2">Payment Details</h2>
      <div className="space-y-1">
        <Input 
          value={bankAccount}
          onChange={(e) => onBankAccountChange(e.target.value)}
          className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
        />
        <Input 
          value={iban}
          onChange={(e) => onIbanChange(e.target.value)}
          className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
        />
        <Input 
          value={bic}
          onChange={(e) => onBicChange(e.target.value)}
          className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
        />
        <Input 
          value={bank}
          onChange={(e) => onBankChange(e.target.value)}
          className="h-7 border-0 p-0 bg-transparent focus-visible:ring-0 text-left" 
        />
      </div>
    </div>
  );
};

export default PaymentDetails;
