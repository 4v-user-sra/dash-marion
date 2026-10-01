import React, { useState } from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LOSS_REASONS_DATA } from '../data/stagesData';
import { formatCompactCurrency, formatCurrency } from '../utils/formatters';

interface LossReasonsChartProps {
  onSelectReason?: (reason: string) => void;
}

export const LossReasonsChart: React.FC<LossReasonsChartProps> = ({ onSelectReason }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(2); // Destaque em Concorrente (SQL)

  const activeData = activeIndex !== null ? LOSS_REASONS_DATA[activeIndex] : LOSS_REASONS_DATA[2];

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9E1] mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-black text-xs">
            <PieChartIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#181310] leading-none">
              Motivos de Perda
            </h3>
            <span className="text-[10px] text-[#5A483E] uppercase tracking-wider font-bold">565 registros nos 30 dias</span>
          </div>
        </div>

        <span className="text-[11px] font-extrabold text-[#8C6D38] bg-[#F4EDE4] px-2.5 py-0.5 rounded border border-[#DCD2C6]">
          R$ 2.5M perdido
        </span>
      </div>

      {/* Quadrante Dividido SEM SCROLL - Todos os 8 motivos visíveis */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 items-center">
        {/* Lado Esquerdo: Todos os 8 motivos */}
        <div className="md:col-span-7 space-y-1">
          {LOSS_REASONS_DATA.map((item, index) => {
            const isHovered = activeIndex === index;

            return (
              <div
                key={item.reason}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelectReason && onSelectReason(item.reason)}
                className={`p-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-between text-xs border ${
                  isHovered
                    ? 'bg-[#FAF5EE] border-[#B89358] font-bold shadow-2xs'
                    : 'hover:bg-[#FAF6F0] border-transparent text-[#4A3B32]'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-[11px] text-[#181310] font-bold">
                    {item.shortReason}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono tabular-nums text-[11px] shrink-0">
                  <span className="font-extrabold text-[#181310]">
                    {item.percent}%
                  </span>
                  <span className="text-[#7A6A5E] text-[10px] font-bold">
                    ({item.count} leads)
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lado Direito: Gráfico Donut */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-32 sm:h-36 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LOSS_REASONS_DATA}
                  dataKey="count"
                  nameKey="reason"
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={56}
                  paddingAngle={2}
                  onMouseEnter={onPieEnter}
                >
                  {LOSS_REASONS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#FFFFFF"
                      strokeWidth={index === activeIndex ? 2 : 1}
                      className="cursor-pointer transition-all duration-150"
                      style={{
                        transform: index === activeIndex ? 'scale(1.06)' : 'scale(1)',
                        transformOrigin: 'center center',
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centro do Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] uppercase font-bold text-[#5A483E] tracking-wider leading-none">
                Total
              </span>
              <span className="text-base font-black text-[#181310] leading-tight">
                565
              </span>
              <span className="text-[9px] text-[#7A6A5E] font-bold">perdas</span>
            </div>
          </div>

          {/* Destaque Expandido */}
          {activeData && (
            <div className="w-full mt-1 bg-[#FAF5EE] p-2 rounded-lg border border-[#DCD2C6] text-center shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#181310]">
                <span className="truncate max-w-[130px]">{activeData.reason}</span>
                <span className="text-[#8C6D38] font-mono font-extrabold">{formatCurrency(activeData.value)}</span>
              </div>
              <p className="text-[10px] text-[#5A483E] mt-0.5 line-clamp-1 font-medium">
                {activeData.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 mt-2 border-t border-[#F0E9E1] flex items-center justify-between text-[11px] text-[#5A483E] font-bold">
        <span>* Passe o cursor no gráfico para detalhar o valor</span>
        <span className="text-[#181310] font-extrabold">Sem retorno: 406 leads (R$ 1.08M)</span>
      </div>
    </div>
  );
};
