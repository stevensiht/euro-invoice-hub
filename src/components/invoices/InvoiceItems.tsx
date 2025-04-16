
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, X } from 'lucide-react';

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
    <div className="mb-8 text-sm">
      <div className="grid grid-cols-12 gap-4 mb-2 text-xs text-gray-500">
        <div className="col-span-5">Description</div>
        <div className="col-span-3 text-center">Quantity</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Total</div>
      </div>
      
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="grid grid-cols-12 gap-4 mb-4 items-center group relative"
        >
          <div className="col-span-5">
            <Input
              value={item.description}
              onChange={(e) => onChangeItem(item.id, 'description', e.target.value)}
              className="w-full border-none border-b border-gray-200 focus:border-b-gray-900 focus:ring-0 rounded-none bg-transparent px-0 text-gray-700 placeholder:text-gray-400 text-sm"
              placeholder="Item description"
            />
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full border-gray-300"
              onClick={() => decrementQuantity(item.id)}
            >
              <Minus className="h-3 w-3 text-gray-500" />
            </Button>
            <Input
              value={item.quantity === 0 ? '' : item.quantity.toString()}
              onChange={(e) => onQuantityChange(item.id, e.target.value)}
              className="w-14 text-center mx-2 border-none border-b border-gray-200 focus:border-b-gray-900 focus:ring-0 rounded-none bg-transparent px-0 text-sm"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 rounded-full border-gray-300"
              onClick={() => incrementQuantity(item.id)}
            >
              <Plus className="h-3 w-3 text-gray-500" />
            </Button>
          </div>
          <div className="col-span-2">
            <Input
              value={item.unitPrice === 0 ? '' : item.unitPrice}
              onChange={(e) => onPriceChange(item.id, e.target.value)}
              className="text-right border-none border-b border-gray-200 focus:border-b-gray-900 focus:ring-0 rounded-none bg-transparent px-0 text-sm"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
            />
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <span className="font-mono text-sm">{formatCurrency(calculateItemTotal(item))}</span>
            
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item.id)}
                className="h-6 w-6 p-0.5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100"
                aria-label="Remove item"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="ghost" 
        onClick={onAddItem}
        className="mt-2 text-gray-500 text-xs"
      >
        <Plus className="h-3 w-3 mr-1" /> Add item
      </Button>
    </div>
  );
};

export default InvoiceItems;
