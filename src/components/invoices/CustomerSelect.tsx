
import React from 'react';

const CustomerSelect: React.FC = () => {
  return (
    <div>
      <h2 className="text-sm text-gray-500 mb-2">To</h2>
      <div className="p-3 border border-dashed border-gray-300 bg-gray-50 rounded-md flex items-center justify-center h-32 text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">
        Select customer
      </div>
    </div>
  );
};

export default CustomerSelect;
