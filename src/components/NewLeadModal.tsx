import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Lead, StageId } from '../types/funnel';
import { STAGES_LIST, SELLERS, SOURCES } from '../data/stagesData';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLead: (lead: Lead) => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({
  isOpen,
  onClose,
  onAddLead,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [seller, setSeller] = useState('Gabriella');
  const [source, setSource] = useState('Google Ads');
  const [stageId, setStageId] = useState<StageId>('orcamento');
  const [value, setValue] = useState(22830);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim()) return;

    const newLead: Lead = {
      id: `lead-new-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      email: email.trim() || `contato@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
      phone: phone.trim() || '(11) 98000-0000',
      seller,
      source,
      stageId,
      substatus: 'Novo Registro',
      value: Number(value) || 0,
      stageEntryDate: new Date().toISOString().split('T')[0],
      daysInStage: 0,
      lastInteractionDate: new Date().toISOString().split('T')[0],
      lastInteractionChannel: 'WhatsApp',
      notes: notes.trim(),
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          channel: 'WhatsApp',
          note: notes.trim() || 'Lead registrado no funil comercial.',
          user: seller,
        }
      ],
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1410]/80 flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full border border-[#C9A96E]/30 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-[#C9A96E]/20 flex items-center justify-between bg-[#FDFCFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1A1410] text-[#C9A96E] flex items-center justify-center font-serif-editorial text-xs border border-[#C9A96E]/30">
              ✦
            </div>
            <div>
              <h2 className="text-lg font-normal font-serif-editorial text-[#1A1410] leading-tight">
                Nova Oportunidade Comercial
              </h2>
              <p className="text-xs text-[#7A6A5A] font-light">Cadastro de celebração no funil de alto padrão</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5A] hover:text-[#1A1410] rounded-full hover:bg-[#FAF7F2] transition-colors border border-[#C9A96E]/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#FAF7F2]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Nome da Celebração / Empresa *
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex: Casamento Marina & Lucas"
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
              />
            </div>
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Nome do Responsável *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Marina Albuquerque"
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Telefone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 98765-4321"
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
              />
            </div>
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contato@cliente.com.br"
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Consultor
              </label>
              <select
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none font-light text-[#2C2018]"
              >
                {SELLERS.filter((s) => s !== 'Todos os Vendedores').map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Etapa do Funil
              </label>
              <select
                value={stageId}
                onChange={(e) => setStageId(e.target.value as StageId)}
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none font-light text-[#2C2018]"
              >
                {STAGES_LIST.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
                Investimento (R$)
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none font-mono font-light text-[#2C2018]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
              Observações Iniciais
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Descreva as preferências e expectativas do cliente..."
              className="w-full text-xs p-2.5 bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-xl focus:outline-none focus:border-[#C9A96E] font-light text-[#2C2018]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#C9A96E]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-light text-[#7A6A5A] hover:bg-[#FAF7F2] rounded-full transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-[#1A1410] bg-[#C9A96E] hover:bg-[#E8D5B0] rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar ao Funil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
