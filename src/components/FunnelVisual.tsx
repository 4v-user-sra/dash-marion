import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { FunnelStepData, StageId } from '../types/funnel';
import { formatCompactCurrency, formatNumber } from '../utils/formatters';

interface FunnelVisualProps {
  steps: FunnelStepData[];
  selectedStage: string;
  onSelectStage: (stageId: StageId) => void;
}

export const FunnelVisual: React.FC<FunnelVisualProps> = ({
  steps,
  selectedStage,
  onSelectStage,
}) => {
  const [displayMode, setDisplayMode] = useState<'both' | 'count' | 'value'>('both');

  // Cores fortes e com excelente contraste
  const stepColors: Record<string, string> = {
    em_atendimento: '#8C6D38',
    tentativa_1: '#6E5D4F',
    orcamento: '#3D1F14',
    recontato_1: '#B89358',
    recontato_2: '#181310',
    agendamento_presencial: '#46664B',
    show_presencial: '#8C6D38',
    no_show_presencial: '#8A7A6E',
    negociacao: '#3D1F14',
    contato_interno: '#7A6A5A',
    prestadores: '#7A6A5A',
    fornecedores: '#7A6A5A',
    venda_ganha: '#2A5C34',
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl p-3 sm:p-3.5 flex flex-col h-full shadow-2xs overflow-hidden">
      {/* Header do Funil */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9E1] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-bold text-xs shrink-0">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#181310] leading-none">
              Funil de Vendas <span className="text-[#8C6D38] font-bold">· 30 Dias</span>
            </h3>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-[#F4EDE4] border border-[#DCD2C6] p-0.5 rounded-lg text-[10px] font-bold text-[#5A483E] shrink-0">
          <button
            onClick={() => setDisplayMode('both')}
            className={`px-2 py-0.5 rounded transition-all ${displayMode === 'both' ? 'bg-[#181310] text-[#FFFFFF] shadow-2xs' : 'hover:text-[#181310]'}`}
          >
            Qtd + R$
          </button>
          <button
            onClick={() => setDisplayMode('count')}
            className={`px-2 py-0.5 rounded transition-all ${displayMode === 'count' ? 'bg-[#181310] text-[#FFFFFF] shadow-2xs' : 'hover:text-[#181310]'}`}
          >
            Qtd
          </button>
          <button
            onClick={() => setDisplayMode('value')}
            className={`px-2 py-0.5 rounded transition-all ${displayMode === 'value' ? 'bg-[#181310] text-[#FFFFFF] shadow-2xs' : 'hover:text-[#181310]'}`}
          >
            R$
          </button>
        </div>
      </div>

      {/* Lista de Etapas do Funil Perfeitamente Encaixadas */}
      <div className="flex-1 flex flex-col justify-between py-1.5 min-h-0 gap-1 overflow-hidden">
        {steps.map((step) => {
          const isSelected = selectedStage === step.id;
          const isGanha = step.id === 'venda_ganha';
          const barWidth = Math.max(4, Math.min(100, (step.count / 454) * 100));
          const color = stepColors[step.id] || '#8C6D38';

          return (
            <div
              key={step.id}
              onClick={() => onSelectStage(step.id)}
              className={`group rounded-lg cursor-pointer transition-all duration-150 py-1 px-2.5 border flex flex-col justify-center shrink-0 ${
                isSelected 
                  ? 'border-[#B89358] bg-[#FAF5EE] ring-1 ring-[#B89358]' 
                  : isGanha
                  ? 'border-[#2A5C34]/40 bg-[#EBF3ED] hover:bg-[#E2EFE5]'
                  : 'border-[#EAE2D8] hover:border-[#B89358]/50 bg-[#FFFFFF] hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-0.5">
                {/* Nome da Etapa */}
                <div className="flex items-center gap-1.5 truncate pr-2">
                  <span
                    className="w-2 h-2 rounded-xs shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className={`font-bold text-[11px] truncate leading-tight ${isGanha ? 'text-[#2A5C34] font-extrabold' : 'text-[#181310]'}`}>
                    {step.name}
                  </span>
                </div>

                {/* Métricas: Quantidade e Valor */}
                <div className="flex items-center gap-1.5 font-mono tabular-nums shrink-0 text-right">
                  {(displayMode === 'both' || displayMode === 'count') && (
                    <span className="font-extrabold text-[#181310] text-[11px] leading-tight">
                      {formatNumber(step.count)} <span className="text-[9px] font-bold text-[#7A6A5E]">leads</span>
                    </span>
                  )}
                  {(displayMode === 'both' || displayMode === 'value') && (
                    <span className="text-[#181310] font-extrabold text-[10px] bg-[#F4EDE4] px-1.5 py-0.2 rounded border border-[#DCD2C6] leading-tight">
                      {formatCompactCurrency(step.value)}
                    </span>
                  )}
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full bg-[#EAE2D8] rounded-full h-1 overflow-hidden flex">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer do Funil */}
      <div className="pt-2 border-t border-[#F0E9E1] flex items-center justify-end text-[11px] text-[#5A483E] font-bold shrink-0">
        <span className="text-[#2A5C34] font-extrabold">13 Vendas Ganhas (R$ 296.8k)</span>
      </div>
    </div>
  );
};
