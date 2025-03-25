
import React from 'react';

type DisplayProps = {
  value: string;
  expression?: string;
};

const Display = ({ value, expression }: DisplayProps) => {
  return (
    <div className="calculator-display flex flex-col h-[30%] justify-end mb-2">
      {expression && (
        <div className="text-neutext-muted text-base text-right mb-1 overflow-x-auto font-light">
          {expression}
        </div>
      )}
      <div className="text-5xl text-right overflow-x-auto text-white font-medium py-3 pr-2">
        {value}
      </div>
    </div>
  );
};

export default Display;
