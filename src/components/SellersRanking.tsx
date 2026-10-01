import React from 'react';
import { Trophy } from 'lucide-react';
import { SellerPerformance } from '../types/funnel';
import { formatCompactCurrency, formatCurrency } from '../utils/formatters';

interface SellersRankingProps {
  rankings: SellerPerformance[];
  onSelectSeller: (sellerName: string) => void;
  selectedSeller: string;
}

export const SellersRanking: React.FC<SellersRankingProps> = ({
  rankings,
  onSelectSeller,
  selectedSeller,
}) => {
  const maxValue = 121793;

  return (
    <div className="bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-2xs overflow-hidden">
      {/* Header do Ranking */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9E1] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-bold text-xs shrink-0">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#181310] leading-none">
              Ranking de Vendedores
            </h3>
            <span className="text-[10px] text-[#5A483E] uppercase tracking-wider font-bold">Fechamentos nos 30 dias</span>
          </div>
        </div>

        <span className="text-[11px] font-extrabold text-[#8C6D38] bg-[#F4EDE4] px-2.5 py-0.5 rounded border border-[#DCD2C6] shrink-0">
          Total: R$ 296.8k
        </span>
      </div>

      {/* Lista de Vendedores */}
      <div className="flex-1 flex flex-col justify-between py-2 gap-2 overflow-hidden">
        {rankings.map((seller) => {
          const isSelected = selectedSeller.toLowerCase().includes(seller.nickname.toLowerCase()) || selectedSeller === seller.name;
          const percentage = Math.round((seller.totalValue / maxValue) * 100);

          return (
            <div
              key={seller.name}
              onClick={() => onSelectSeller(seller.name)}
              className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#B89358] bg-[#FAF5EE] ring-1 ring-[#B89358]'
                  : 'border-[#EAE2D8] hover:border-[#B89358]/50 bg-[#FFFFFF] hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shadow-2xs shrink-0 ${
                      seller.rank === 1 ? 'bg-[#8C6D38]' : seller.rank === 2 ? 'bg-[#46664B]' : 'bg-[#3D1F14]'
                    }`}
                  >
                    {seller.rank}º
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#181310] leading-tight block">
                      {seller.nickname}
                    </span>
                    <span className="text-[10px] text-[#5A483E] font-bold">
                      {seller.dealsCount} vendas celebradas
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono tabular-nums">
                  <span className="text-sm font-extrabold text-[#181310] block">
                    {formatCurrency(seller.totalValue)}
                  </span>
                  <span className="text-[10px] text-[#5A483E] font-bold">
                    TM: {formatCompactCurrency(seller.avgTicket)}
                  </span>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full bg-[#EAE2D8] rounded-full h-1.5 overflow-hidden flex mt-2 mb-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    seller.rank === 1 ? 'bg-[#8C6D38]' : seller.rank === 2 ? 'bg-[#46664B]' : 'bg-[#3D1F14]'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#5A483E] font-bold">
                <span>Conversão: {seller.conversionRate}%</span>
                <span className="text-[#181310] font-extrabold">{percentage}% do líder</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#F0E9E1] flex items-center justify-end text-[11px] text-[#5A483E] font-bold shrink-0">
        <span className="text-[#2A5C34] font-extrabold">13 contratos</span>
      </div>
    </div>
  );
};
