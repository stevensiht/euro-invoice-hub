
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  isCreating?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  onCancel, 
  isSubmitting = false,
  isCreating = false 
}) => {
  return (
    <div className="flex justify-end gap-4">
      <Button 
        type="button" 
        variant="outline"
        size="sm"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        size="sm" 
        className="px-6"
        disabled={isSubmitting}
      >
        {isCreating ? 'Creating...' : 'Create'}
      </Button>
    </div>
  );
};

export default FormActions;
