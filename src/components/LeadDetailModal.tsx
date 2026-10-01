import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Save
} from 'lucide-react';
import { Lead, StageId, LossReason } from '../types/funnel';
import { STAGE_DEFINITIONS, STAGES_LIST, LOSS_REASONS_DATA } from '../data/stagesData';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLead: (updatedLead: Lead) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdateLead,
}) => {
  if (!isOpen || !lead) return null;

  const [currentStageId, setCurrentStageId] = useState<StageId>(lead.stageId);
  const [currentSubstatus, setCurrentSubstatus] = useState(lead.substatus || '');
  const [currentValue, setCurrentValue] = useState(lead.value);
  const [lossReason, setLossReason] = useState<LossReason | undefined>(lead.lossReason);
  const [competitorName, setCompetitorName] = useState<string>(lead.competitorName || '');
  const [isCompetitorLoss, setIsCompetitorLoss] = useState<boolean>(lead.isCompetitorLoss || false);
  const [newNote, setNewNote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStageChange = (newStage: StageId) => {
    setCurrentStageId(newStage);
    if (newStage !== 'venda_perdida') {
      setLossReason(undefined);
      setIsCompetitorLoss(false);
    } else {
      setLossReason('Fechou com concorrente (SQL Perdido)');
      setIsCompetitorLoss(true);
      if (!competitorName) setCompetitorName('Totvs');
    }
  };

  const handleSave = () => {
    const updatedHistory = lead.history ? [...lead.history] : [];
    if (newNote.trim()) {
      updatedHistory.unshift({
        date: new Date().toISOString().split('T')[0],
        channel: 'WhatsApp',
        note: newNote.trim(),
        user: lead.seller || 'Consultor Comercial',
      });
    }

    const updatedLead: Lead = {
      ...lead,
      stageId: currentStageId,
      substatus: currentSubstatus,
      value: Number(currentValue) || 0,
      lossReason: currentStageId === 'venda_perdida' ? lossReason : undefined,
      isCompetitorLoss: currentStageId === 'venda_perdida' && (isCompetitorLoss || lossReason?.toLowerCase().includes('concorrente')),
      competitorName: currentStageId === 'venda_perdida' ? competitorName : undefined,
      history: updatedHistory,
    };

    onUpdateLead(updatedLead);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1410]/80 flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#C9A96E]/30 overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#C9A96E]/20 flex items-center justify-between bg-[#FDFCFA]">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-widest text-[#7A6A5A]">
              Ficha Editorial · {lead.id}
            </span>
            <h2 className="text-xl font-normal font-serif-editorial text-[#1A1410] leading-tight">
              {lead.company}
            </h2>
            <p className="text-xs text-[#7A6A5A] font-light">Contato: {lead.name} · Consultor: {lead.seller}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5A] hover:text-[#1A1410] rounded-full hover:bg-[#FAF7F2] transition-colors border border-[#C9A96E]/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-[#FAF7F2]">
          {/* Quick info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#FDFCFA] p-3 rounded-2xl border border-[rgba(201,169,110,0.25)] text-xs">
            <div>
              <span className="text-[10px] text-[#7A6A5A] block uppercase font-medium tracking-wider">Telefone</span>
              <span className="font-light text-[#2C2018]">{lead.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7A6A5A] block uppercase font-medium tracking-wider">E-mail</span>
              <span className="font-light text-[#2C2018] truncate block">{lead.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7A6A5A] block uppercase font-medium tracking-wider">Origem</span>
              <span className="font-light text-[#2C2018]">{lead.source}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#7A6A5A] block uppercase font-medium tracking-wider">Permanência</span>
              <span className="font-light text-[#2C2018]">{lead.daysInStage} dias</span>
            </div>
          </div>

          {/* Edit Stage & Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Etapa no Funil
              </label>
              <select
                value={currentStageId}
                onChange={(e) => handleStageChange(e.target.value as StageId)}
                className="w-full text-xs font-light p-2.5 border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] bg-[#FDFCFA] text-[#2C2018]"
              >
                {STAGES_LIST.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.count})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Valor do Contrato (R$)
              </label>
              <input
                type="number"
                value={currentValue}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className="w-full text-xs font-light p-2.5 border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-mono bg-[#FDFCFA] text-[#2C2018]"
              />
            </div>
          </div>

          {/* Conditional Loss Reason section */}
          {currentStageId === 'venda_perdida' && (
            <div className="p-3 bg-[#FDFCFA] border border-[#C9A96E]/40 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#C9A96E] font-serif-editorial text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>Informações de Perda / SQL Perdido</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-light text-[#2C2018] mb-1">
                    Motivo da Perda
                  </label>
                  <select
                    value={lossReason || ''}
                    onChange={(e) => {
                      setLossReason(e.target.value);
                      setIsCompetitorLoss(e.target.value.toLowerCase().includes('concorrente'));
                    }}
                    className="w-full text-xs p-2 border border-[#C9A96E]/25 rounded-xl focus:outline-none bg-[#FDFCFA] font-light text-[#2C2018]"
                  >
                    {LOSS_REASONS_DATA.map((r) => (
                      <option key={r.reason} value={r.reason}>
                        {r.reason} ({r.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-light text-[#2C2018] mb-1">
                    Concorrente Escolhido
                  </label>
                  <input
                    type="text"
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="Ex: Totvs, Sankhya, Senior..."
                    className="w-full text-xs p-2 border border-[#C9A96E]/25 rounded-xl focus:outline-none bg-[#FDFCFA] font-light text-[#2C2018]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notes and new annotation */}
          <div>
            <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
              Nova Interação / Observação Editorial
            </label>
            <textarea
              rows={2}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Descreva os detalhes e alinhamentos deste contato..."
              className="w-full p-2.5 text-xs bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#C9A96E]/20 bg-[#FDFCFA] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-light text-[#7A6A5A] hover:bg-[#FAF7F2] rounded-full transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-medium text-[#1A1410] bg-[#C9A96E] hover:bg-[#E8D5B0] rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveSuccess ? 'Salvo!' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
