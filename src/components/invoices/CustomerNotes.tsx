
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CustomerNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ notes, onNotesChange }) => {
  return (
    <div>
      <h2 className="text-sm text-gray-500 mb-2">Note</h2>
      <Textarea 
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="h-32 bg-gray-50 border-gray-200" 
        placeholder="Additional notes for the customer..."
      />
    </div>
  );
};

export default CustomerNotes;
