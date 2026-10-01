import React, { useState } from 'react';
import { ExternalLink, Globe, ChevronRight } from 'lucide-react';

interface VercelScreenCardProps {
  vercelUrl: string;
  onOpenConfig: () => void;
}

export const VercelScreenCard: React.FC<VercelScreenCardProps> = ({
  vercelUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = 'https://i.imgur.com/DfAvxN8.png';
  const destinationUrl = vercelUrl || 'https://mansao-marion-funil-leads.vercel.app/';

  return (
    <div className="bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl p-3 sm:p-3.5 flex flex-col justify-between h-full relative overflow-hidden group shadow-2xs">
      {/* Header do Card Vercel Screen */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F0E9E1] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-bold text-xs shrink-0">
            ▲
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#181310] leading-none">
              Vercel Screen <span className="text-[#8C6D38] font-bold">· Mansão Marion</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Preview Frame */}
      <div 
        className="relative flex-1 rounded-lg overflow-hidden border border-[#DCD2C6] bg-[#181310] flex items-center justify-center my-2 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(destinationUrl, '_blank')}
      >
        {/* Imagem de Preview */}
        <img
          src={imageUrl}
          alt="Mansão Marion Vercel Screen Preview"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.01]"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-[#181310]/70 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-[#FFFFFF] text-[#181310] px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 border border-[#DCD2C6] shadow-sm">
            <ExternalLink className="w-3.5 h-3.5 text-[#8C6D38]" />
            <span>Abrir tela no Vercel (Mansão Marion)</span>
          </div>
          <span className="text-[11px] text-[#FFFFFF] mt-1 font-semibold truncate max-w-xs">
            {destinationUrl}
          </span>
        </div>

        {/* Floating Tag */}
        <div className="absolute bottom-2 left-2 bg-[#181310]/90 text-[#FFFFFF] text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1.5 border border-white/10">
          <Globe className="w-3 h-3 text-[#C9A96E]" />
          <span className="truncate max-w-[240px]">{destinationUrl.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-[#F0E9E1] flex items-center justify-end text-[11px] text-[#5A483E] font-semibold shrink-0">
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8C6D38] font-bold hover:underline flex items-center gap-0.5"
        >
          <span>mansao-marion-funil-leads.vercel.app</span>
          <ChevronRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
