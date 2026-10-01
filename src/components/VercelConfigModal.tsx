import React, { useState } from 'react';
import { X, Globe, Check } from 'lucide-react';

interface VercelConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  onSaveUrl: (newUrl: string) => void;
}

export const VercelConfigModal: React.FC<VercelConfigModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  onSaveUrl,
}) => {
  const [url, setUrl] = useState(currentUrl);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSaveUrl(url.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1410]/80 flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full border border-[#C9A96E]/30 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-[#C9A96E]/20 flex items-center justify-between bg-[#FDFCFA]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1A1410] text-[#C9A96E] flex items-center justify-center font-serif-editorial text-xs border border-[#C9A96E]/30">
              ▲
            </div>
            <div>
              <h3 className="text-base font-normal font-serif-editorial text-[#1A1410] leading-none">
                Configurar Vercel Screen
              </h3>
              <span className="text-[10px] text-[#7A6A5A] uppercase tracking-wider font-light">Link da plataforma externa</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#7A6A5A] hover:text-[#1A1410] p-1.5 rounded-full hover:bg-[#FAF7F2] transition-colors border border-[#C9A96E]/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#FAF7F2]">
          <div>
            <label className="block text-xs font-serif-editorial text-[#1A1410] mb-1">
              URL do Vercel
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A96E]" />
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://meu-projeto.vercel.app"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FDFCFA] border border-[#C9A96E]/25 rounded-full focus:outline-none focus:border-[#C9A96E] font-mono font-light text-[#2C2018]"
              />
            </div>
            <p className="text-[11px] text-[#7A6A5A] mt-1.5 font-light">
              Ao clicar no card central ou no botão Vercel Screen, a equipe será direcionada para esta URL.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
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
              <Check className="w-3.5 h-3.5" />
              <span>Salvar Link</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
