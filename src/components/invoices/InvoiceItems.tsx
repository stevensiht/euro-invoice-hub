
import React, { useState } from 'react';
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
  // Create state to track which field is currently focused
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="mb-8 text-xs">
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
              className={`w-full border-none border-b border-gray-300 ${
                focusedField === `description-${item.id}` ? 'border-b-black' : 'border-b-gray-300'
              } focus:ring-0 focus:outline-none rounded-none bg-transparent px-0 text-gray-700 placeholder:text-gray-400 text-xs h-8`}
              placeholder="Item description"
              onFocus={() => setFocusedField(`description-${item.id}`)}
              onBlur={() => setFocusedField(null)}
              style={{ borderBottom: focusedField === `description-${item.id}` ? '1px solid black' : '1px solid #8E9196' }}
            />
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full border-gray-300"
              onClick={() => decrementQuantity(item.id)}
            >
              <Minus className="h-2.5 w-2.5 text-gray-500" />
            </Button>
            <Input
              value={item.quantity === 0 ? '' : item.quantity.toString()}
              onChange={(e) => onQuantityChange(item.id, e.target.value)}
              className={`w-12 text-center mx-2 border-none ${
                focusedField === `quantity-${item.id}` ? 'border-b-black' : 'border-b-gray-300'
              } focus:ring-0 focus:outline-none rounded-none bg-transparent px-0 text-xs h-8`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onFocus={() => setFocusedField(`quantity-${item.id}`)}
              onBlur={() => setFocusedField(null)}
              style={{ borderBottom: focusedField === `quantity-${item.id}` ? '1px solid black' : '1px solid #8E9196' }}
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full border-gray-300"
              onClick={() => incrementQuantity(item.id)}
            >
              <Plus className="h-2.5 w-2.5 text-gray-500" />
            </Button>
          </div>
          <div className="col-span-2">
            <Input
              value={item.unitPrice === 0 ? '' : item.unitPrice}
              onChange={(e) => onPriceChange(item.id, e.target.value)}
              className={`text-right border-none ${
                focusedField === `price-${item.id}` ? 'border-b-black' : 'border-b-gray-300'
              } focus:ring-0 focus:outline-none rounded-none bg-transparent px-0 text-xs h-8`}
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              onFocus={() => setFocusedField(`price-${item.id}`)}
              onBlur={() => setFocusedField(null)}
              style={{ borderBottom: focusedField === `price-${item.id}` ? '1px solid black' : '1px solid #8E9196' }}
            />
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <span className="font-mono text-xs flex-1 text-right">{formatCurrency(calculateItemTotal(item))}</span>
            
            {/* Position the remove button outside the grid flow to avoid affecting alignment */}
            {index > 0 && (
              <div className="ml-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-5 w-5 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100"
                  aria-label="Remove item"
                >
                  <X className="h-2.5 w-2.5" />
                </Button>
              </div>
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
        <Plus className="h-2.5 w-2.5 mr-1" /> Add item
      </Button>
    </div>
  );
};

export default InvoiceItems;
