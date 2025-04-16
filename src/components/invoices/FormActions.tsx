
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormActionsProps {
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel }) => {
  return (
    <div className="flex justify-end gap-4">
      <Button 
        type="button" 
        variant="outline"
        size="sm"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" size="sm" className="px-6">
        Create
      </Button>
    </div>
  );
};

export default FormActions;
