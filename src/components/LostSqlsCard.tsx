import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Lead } from '../types/funnel';
import { formatCompactCurrency, formatCurrency } from '../utils/formatters';

interface LostSqlsCardProps {
  lostSqls: Lead[];
  onInspectLead: (lead: Lead) => void;
  onOpenWinbackList?: () => void;
}

export const LostSqlsCard: React.FC<LostSqlsCardProps> = ({
  lostSqls,
  onInspectLead,
}) => {
  const totalCount = 30;
  const totalValue = 464325;
  const avgTicket = Math.round(totalValue / totalCount);

  return (
    <div className="bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-2xs">
      {/* Header do Card SQLs Perdidos */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9E1] mb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-bold text-xs">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#181310] leading-none">
              SQLs Perdidos <span className="text-[#8C6D38] font-bold">· Concorrência</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-[#FAF5EE] p-2.5 rounded-lg border border-[#DCD2C6]">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A483E] block">
            Qtd. Perdida
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black text-[#181310] tabular-nums">
              30
            </span>
            <span className="text-xs text-[#7A6A5E] font-bold">leads</span>
          </div>
        </div>

        <div className="bg-[#FAF5EE] p-2.5 rounded-lg border border-[#DCD2C6]">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A483E] block">
            Valor Perdido
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black text-[#8C6D38] tabular-nums">
              R$ 464.3k
            </span>
          </div>
        </div>
      </div>

      {/* Lista de SQLs Perdidos */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-around">
        {lostSqls.slice(0, 5).map((lead) => (
          <div
            key={lead.id}
            onClick={() => onInspectLead(lead)}
            className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#FAF5EE] border border-[#EAE2D8] hover:border-[#B89358]/50 transition-all cursor-pointer flex items-center justify-between text-xs"
          >
            <div className="truncate pr-2">
              <div className="font-extrabold text-[#181310] text-[11px] truncate">
                {lead.company}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#5A483E] mt-0.5 font-semibold">
                <span>{lead.seller}</span>
                <span>·</span>
                <span className="text-[#8C6D38] font-bold">vs {lead.competitorName || 'Concorrente'}</span>
              </div>
            </div>

            <div className="text-right shrink-0 font-mono tabular-nums">
              <span className="text-xs font-black text-[#181310]">
                {formatCurrency(lead.value)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 mt-2 border-t border-[#F0E9E1] flex items-center justify-between text-[11px] text-[#5A483E] font-bold">
        <span>Ticket Médio Perdido</span>
        <span className="text-[#181310] font-extrabold">{formatCompactCurrency(avgTicket)}</span>
      </div>
    </div>
  );
};
