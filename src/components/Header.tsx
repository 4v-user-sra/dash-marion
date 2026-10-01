import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#181310] text-[#FFFFFF] border-b border-[#3D312A] sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#C9A96E] text-[#181310] flex items-center justify-center font-extrabold text-sm shadow-xs">
            BI
          </div>
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-[#FFFFFF] leading-none">
              Dashboard Comercial <span className="text-[#C9A96E] font-semibold">· Funil de Vendas</span>
            </h1>
            <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C9A96E]/20 text-[#E8D5B0] border border-[#C9A96E]/40">
              Últimos 30 Dias
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-xs text-[#C5B7AB] font-medium">
            Monitoramento de Conversão & Performance de Oportunidades
          </span>
        </div>
      </div>
    </header>
  );
};
