import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { Lead } from '../types/funnel';
import { STAGE_DEFINITIONS, SELLERS } from '../data/stagesData';
import { formatCurrency } from '../utils/formatters';

interface LeadsDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onExportCsv: () => void;
  initialStageFilter?: string;
}

export const LeadsDrawerModal: React.FC<LeadsDrawerModalProps> = ({
  isOpen,
  onClose,
  leads,
  onSelectLead,
  onExportCsv,
  initialStageFilter = 'all',
}) => {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>(initialStageFilter);
  const [selectedSeller, setSelectedSeller] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = leads.filter((l) => {
    if (selectedStage !== 'all' && l.stageId !== selectedStage) return false;
    if (selectedSeller !== 'all' && l.seller !== selectedSeller) return false;
    if (search) {
      const q = search.toLowerCase();
      const match =
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.seller.toLowerCase().includes(q) ||
        (l.competitorName && l.competitorName.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const totalValue = filtered.reduce((acc, l) => acc + l.value, 0);

  return (
    <div className="fixed inset-0 z-50 bg-[#181310]/80 flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-5xl w-full h-[85vh] border border-[#DCD2C6] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#F0E9E1] flex items-center justify-between bg-[#F8F5F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#181310] text-[#C9A96E] flex items-center justify-center font-extrabold text-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#181310] leading-tight">
                Gestão de Leads & Oportunidades
              </h2>
              <p className="text-xs text-[#5A483E] font-bold">
                {filtered.length} leads filtrados · Volume: {formatCurrency(totalValue)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCsv}
              className="px-3.5 py-1.5 text-xs font-bold text-[#181310] bg-[#FFFFFF] hover:bg-[#F4EDE4] border border-[#DCD2C6] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#8C6D38]" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A483E] hover:text-[#181310] rounded-lg hover:bg-[#F4EDE4] transition-colors border border-[#DCD2C6]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="px-5 py-2.5 border-b border-[#F0E9E1] bg-[#FAF6F0] flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6A5E]" />
            <input
              type="text"
              placeholder="Buscar por cliente, celebração ou concorrente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#DCD2C6] rounded-lg focus:outline-none focus:border-[#B89358] font-bold text-[#181310]"
            />
          </div>

          {/* Stage selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#181310]">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5A483E]">Etapa:</span>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              aria-label="Filtrar por etapa"
              className="border border-[#DCD2C6] rounded-lg px-2.5 py-1 bg-[#FFFFFF] text-xs font-bold focus:outline-none"
            >
              <option value="all">Todas as etapas</option>
              {Object.values(STAGE_DEFINITIONS).map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.count})
                </option>
              ))}
            </select>
          </div>

          {/* Seller selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#181310]">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#5A483E]">Vendedor:</span>
            <select
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              aria-label="Filtrar por vendedor"
              className="border border-[#DCD2C6] rounded-lg px-2.5 py-1 bg-[#FFFFFF] text-xs font-bold focus:outline-none"
            >
              <option value="all">Todos os vendedores</option>
              {SELLERS.filter((s) => s !== 'Todos os Vendedores').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table content */}
        <div className="flex-1 overflow-y-auto bg-[#FFFFFF]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8F5F0] sticky top-0 z-10 border-b border-[#DCD2C6] text-[#5A483E] font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-2.5 px-4">Celebração / Contato</th>
                <th className="py-2.5 px-4">Etapa</th>
                <th className="py-2.5 px-4">Vendedor</th>
                <th className="py-2.5 px-4">Valor</th>
                <th className="py-2.5 px-4">Origem</th>
                <th className="py-2.5 px-4">Status / Motivo</th>
                <th className="py-2.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E9E1]">
              {filtered.slice(0, 100).map((lead) => {
                const stageDef = STAGE_DEFINITIONS[lead.stageId];
                return (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="hover:bg-[#FAF6F0] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-4">
                      <div className="font-extrabold text-xs text-[#181310]">{lead.company}</div>
                      <div className="text-[11px] text-[#5A483E] font-semibold">{lead.name} · {lead.phone}</div>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${stageDef?.bgLight || 'bg-[#F4EDE4]'} ${stageDef?.textColor || 'text-[#181310]'} border border-[#DCD2C6]`}>
                        {stageDef?.name || lead.stageId}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 font-bold text-[#181310]">
                      {lead.seller}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-extrabold text-[#181310] tabular-nums">
                      {formatCurrency(lead.value)}
                    </td>
                    <td className="py-2.5 px-4 text-[#5A483E] font-semibold">
                      {lead.source}
                    </td>
                    <td className="py-2.5 px-4">
                      {lead.isCompetitorLoss ? (
                        <span className="text-[#8C6D38] font-extrabold text-[11px] bg-[#F4EDE4] px-2 py-0.5 rounded border border-[#DCD2C6]">
                          Perdido vs {lead.competitorName || 'Concorrente'}
                        </span>
                      ) : (
                        <span className="text-[#5A483E] text-[11px] font-bold">
                          {lead.substatus || lead.lossReason || 'Ativo'}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLead(lead);
                        }}
                        className="text-[#8C6D38] font-extrabold hover:underline text-xs inline-flex items-center gap-0.5"
                      >
                        <span>Detalhes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-[#DCD2C6] bg-[#F8F5F0] text-[11px] text-[#5A483E] font-bold flex items-center justify-between">
          <span>Mostrando {Math.min(100, filtered.length)} de {filtered.length} leads</span>
          <span className="text-[#181310]">Clique em uma linha para abrir a ficha completa</span>
        </div>
      </div>
    </div>
  );
};
