import React from 'react';

interface HiringData {
  month: string;
  hires: number;
}

interface HiringChartProps {
  data: HiringData[];
}

export function HiringChart({ data }: HiringChartProps) {
  const maxHires = Math.max(...data.map(d => d.hires));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Évolution des Embauches
      </h3>
      
      <div className="flex items-end space-x-2 h-40">
        {data.map((item, index) => {
          const height = (item.hires / maxHires) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center mb-2">
                <div
                  className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-t w-full max-w-8 cursor-pointer"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`${item.month}: ${item.hires} embauches`}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {item.month.split(' ')[0]}
              </span>
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {item.hires}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Nombre d'embauches par mois
        </p>
      </div>
    </div>
  );
}