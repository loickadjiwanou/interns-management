import React from 'react';

interface DepartmentData {
  department: string;
  count: number;
}

interface DepartmentChartProps {
  data: DepartmentData[];
}

export function DepartmentChart({ data }: DepartmentChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-yellow-500'
  ];

  let cumulativePercentage = 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Répartition par Département
      </h3>
      
      <div className="space-y-4">
        <div className="relative w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          {data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const style = {
              left: `${cumulativePercentage}%`,
              width: `${percentage}%`
            };
            cumulativePercentage += percentage;
            
            return (
              <div
                key={item.department}
                className={`absolute h-full ${colors[index]} transition-all duration-300`}
                style={style}
              />
            );
          })}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div key={item.department} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.department}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}