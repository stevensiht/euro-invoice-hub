
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CompanyInfoProps {
  yourCompanyInfo: string;
  onCompanyInfoChange: (value: string) => void;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ yourCompanyInfo, onCompanyInfoChange }) => {
  return (
    <div className="text-sm">
      <h2 className="text-xs text-gray-500 mb-2">From</h2>
      <Textarea 
        value={yourCompanyInfo}
        onChange={(e) => onCompanyInfoChange(e.target.value)}
        className="min-h-[160px] resize-none border-0 p-0 bg-transparent focus-visible:ring-0 text-sm"
      />
    </div>
  );
};

export default CompanyInfo;
