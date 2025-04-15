
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus } from 'lucide-react';

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

interface InvoiceItemsProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onChangeItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onQuantityChange: (id: string, value: string) => void;
  onPriceChange: (id: string, value: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  calculateItemTotal: (item: InvoiceItem) => number;
  formatCurrency: (amount: number) => string;
}

const InvoiceItems: React.FC<InvoiceItemsProps> = ({
  items,
  onAddItem,
  onRemoveItem,
  onChangeItem,
  onQuantityChange,
  onPriceChange,
  incrementQuantity,
  decrementQuantity,
  calculateItemTotal,
  formatCurrency
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-12 gap-4 mb-2 text-sm text-gray-500">
        <div className="col-span-5">Description</div>
        <div className="col-span-3 text-center">Quantity</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Total</div>
      </div>
      
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
          <div className="col-span-5">
            <Input
              value={item.description}
              onChange={(e) => onChangeItem(item.id, 'description', e.target.value)}
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
              onChange={(e) => onQuantityChange(item.id, e.target.value)}
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
              value={item.unitPrice === 0 ? '' : item.unitPrice}
              onChange={(e) => onPriceChange(item.id, e.target.value)}
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
        onClick={onAddItem}
        className="mt-2 text-gray-500"
      >
        <Plus className="h-4 w-4 mr-2" /> Add item
      </Button>
    </div>
  );
};

export default InvoiceItems;
