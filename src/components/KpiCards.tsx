import React from 'react';
import { KpiSummary } from '../types/funnel';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface KpiCardsProps {
  kpi: KpiSummary;
  onFilterStage?: (stageId: string) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpi, onFilterStage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {/* CARD 1: VALOR EM ORÇAMENTOS */}
      <div 
        onClick={() => onFilterStage && onFilterStage('orcamento')}
        className="group relative bg-[#FFFFFF] border border-[#DCD2C6] hover:border-[#B89358] rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A483E]">
            Valor em Orçamentos
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F4EDE4] text-[#8C6D38] border border-[#DCD2C6]">
            30 dias
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#181310] tracking-tight tabular-nums">
            R$ 5.6M
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-xs text-[#5A483E] pt-1.5 border-t border-[#F0E9E1]">
          <span className="truncate text-[11px] font-semibold">{formatCurrency(kpi.orcamentosEnviadosValor)}</span>
        </div>
      </div>

      {/* CARD 2: LEADS QUALIFICADOS */}
      <div 
        onClick={() => onFilterStage && onFilterStage('recontato_1')}
        className="group relative bg-[#FFFFFF] border border-[#DCD2C6] hover:border-[#B89358] rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A483E]">
            Leads Qualificados
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F4EDE4] text-[#46664B] border border-[#DCD2C6]">
            Orç. + Recontatos
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#181310] tracking-tight tabular-nums">
            {formatNumber(kpi.leadsQualificadosCount)}
          </span>
          <span className="text-xs text-[#7A6A5E] font-bold">leads</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-xs text-[#5A483E] pt-1.5 border-t border-[#F0E9E1]">
          <span className="truncate text-[11px] font-semibold">59 orçamentos · 298 recontatos</span>
        </div>
      </div>

      {/* CARD 3: TICKET MÉDIO */}
      <div 
        onClick={() => onFilterStage && onFilterStage('venda_ganha')}
        className="group relative bg-[#FFFFFF] border border-[#DCD2C6] hover:border-[#B89358] rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A483E]">
            Ticket Médio (TM)
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F4EDE4] text-[#3D1F14] border border-[#DCD2C6]">
            Últimos 30D
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#181310] tracking-tight tabular-nums">
            R$ 22.830
          </span>
          <span className="text-xs text-[#7A6A5E] font-bold">,23</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-xs text-[#5A483E] pt-1.5 border-t border-[#F0E9E1]">
          <span className="truncate text-[11px] font-semibold">13 vendas · R$ 296.793</span>
        </div>
      </div>

      {/* CARD 4: TAXA DE FECHAMENTO */}
      <div 
        onClick={() => onFilterStage && onFilterStage('venda_ganha')}
        className="group relative bg-[#FFFFFF] border border-[#DCD2C6] hover:border-[#B89358] rounded-xl p-3 sm:p-3.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#5A483E]">
            Tx. Fechamento · Hit Rate
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#B89358] text-[#FFFFFF]">
            Conversão
          </span>
        </div>

        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-[#8C6D38] tracking-tight tabular-nums">
            1,4%
          </span>
          <span className="text-xs text-[#7A6A5E] font-bold">lead → ganho</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-xs text-[#5A483E] pt-1.5 border-t border-[#F0E9E1]">
          <span className="truncate text-[11px] font-semibold">454 entrada → 13 ganhos</span>
        </div>
      </div>
    </div>
  );
};
