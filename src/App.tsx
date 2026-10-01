import React, { useState, useRef } from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';
import { Lead, FunnelFilterState, StageId } from './types/funnel';
import { initialMockLeads } from './data/mockLeads';
import { 
  filterLeads, 
  calculateKpiSummary, 
  calculateSellerRankings, 
  calculateFunnelSteps, 
  exportLeadsToCsv 
} from './utils/funnelCalculations';
import { KpiCards } from './components/KpiCards';
import { FunnelVisual } from './components/FunnelVisual';
import { SellersRanking } from './components/SellersRanking';
import { VercelScreenCard } from './components/VercelScreenCard';
import { LossReasonsChart } from './components/LossReasonsChart';
import { LostSqlsCard } from './components/LostSqlsCard';
import { LeadsDrawerModal } from './components/LeadsDrawerModal';
import { LeadDetailModal } from './components/LeadDetailModal';
import { NewLeadModal } from './components/NewLeadModal';
import { VercelConfigModal } from './components/VercelConfigModal';

const LEADS_STORAGE_KEY = 'apex_bi_editorial_leads_v10';
const VERCEL_URL_STORAGE_KEY = 'apex_bi_vercel_screen_url_v10';
const DEFAULT_VERCEL_URL = 'https://mansao-marion-funil-leads.vercel.app/';

export default function App() {
  // Leads Store with LocalStorage Persistence
  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse leads from localStorage', e);
    }
    return initialMockLeads;
  });

  // Vercel Screen URL
  const [vercelUrl, setVercelUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(VERCEL_URL_STORAGE_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error('Failed to load vercel url', e);
    }
    return DEFAULT_VERCEL_URL;
  });

  // Filter State
  const [filters, setFilters] = useState<FunnelFilterState>({
    period: 'Últimos 30 dias',
    seller: 'Todos os Vendedores',
    stageFilter: 'all',
    source: 'Todas as Origens',
    search: '',
    viewMode: 'count',
  });

  // Modals state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isLeadsDrawerOpen, setIsLeadsDrawerOpen] = useState(false);
  const [isVercelConfigOpen, setIsVercelConfigOpen] = useState(false);
  const [initialDrawerStageFilter, setInitialDrawerStageFilter] = useState<string>('all');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync Leads to LocalStorage
  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const handleSaveVercelUrl = (newUrl: string) => {
    setVercelUrl(newUrl);
    try {
      localStorage.setItem(VERCEL_URL_STORAGE_KEY, newUrl);
    } catch (e) {
      console.error('Failed to save vercel url', e);
    }
    showToast('Link do Vercel Screen atualizado com sucesso!');
  };

  // Funnel stage selection
  const handleSelectStage = (stageId: StageId) => {
    if (filters.stageFilter === stageId) {
      setFilters((prev) => ({ ...prev, stageFilter: 'all' }));
      showToast('Filtro de etapa removido.');
    } else {
      setFilters((prev) => ({ ...prev, stageFilter: stageId }));
      showToast(`Filtrando painel pela etapa selecionada.`);
    }
  };

  // Seller selection
  const handleSelectSeller = (sellerName: string) => {
    if (filters.seller === sellerName) {
      setFilters((prev) => ({ ...prev, seller: 'Todos os Vendedores' }));
      showToast('Filtro de consultor removido.');
    } else {
      setFilters((prev) => ({ ...prev, seller: sellerName }));
      showToast(`Filtrando pelo consultor(a): ${sellerName}`);
    }
  };

  // Lead CRUD
  const handleUpdateLead = (updatedLead: Lead) => {
    const updated = leads.map((l) => (l.id === updatedLead.id ? updatedLead : l));
    saveLeads(updated);
    setSelectedLead(updatedLead);
    showToast(`Oportunidade "${updatedLead.company}" atualizada.`);
  };

  const handleAddLead = (newLead: Lead) => {
    const updated = [newLead, ...leads];
    saveLeads(updated);
    showToast(`Oportunidade "${newLead.company}" adicionada com sucesso!`);
  };

  const handleInspectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailModalOpen(true);
  };

  const handleOpenDrawerWithStage = (stageId: string) => {
    setInitialDrawerStageFilter(stageId);
    setIsLeadsDrawerOpen(true);
  };

  const handleExportCsv = () => {
    exportLeadsToCsv(filteredLeads, `dashboard-comercial-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Download do arquivo CSV iniciado.');
  };

  // Dynamic calculations
  const filteredLeads = filterLeads(leads, filters);
  const kpiSummary = calculateKpiSummary(filteredLeads);
  const sellerRankings = calculateSellerRankings(filteredLeads);
  const funnelSteps = calculateFunnelSteps(filteredLeads);
  const lostSqls = leads.filter(
    (l) => l.stageId === 'venda_perdida' && (l.isCompetitorLoss || l.lossReason?.toLowerCase().includes('concorrente'))
  );

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col text-[#181310] font-sans antialiased selection:bg-[#B89358] selection:text-[#FFFFFF]">
      {/* CORPO PRINCIPAL - CLEAN & COMPACTO */}
      <main className="flex-1 p-3 sm:p-4 max-w-[1720px] mx-auto w-full flex flex-col gap-3 sm:gap-4 justify-between">
        {/* INDICAÇÃO DE CONTEXTO DO PERÍODO ANALISADO */}
        <div className="flex items-center justify-between bg-[#FFFFFF] border border-[#DCD2C6] rounded-xl px-3.5 py-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#181310] text-[#C9A96E] flex items-center justify-center font-bold text-xs">
              <Calendar className="w-3 h-3" />
            </div>
            <span className="text-xs font-bold text-[#181310]">
              Período Analisado: <span className="text-[#8C6D38] font-extrabold">Últimos 30 Dias</span>
            </span>
          </div>

          <div className="text-[11px] text-[#5A483E] font-bold hidden sm:block">
            Dashboard Comercial · Mansão Marion · Consolidação de 454 leads & 13 contratos
          </div>
        </div>

        {/* TOPO: 4 CARDS DE INDICADORES (KPIs) */}
        <section aria-label="Indicadores Chave">
          <KpiCards
            kpi={kpiSummary}
            onFilterStage={handleSelectStage}
          />
        </section>

        {/* LINHA 1: FUNIL DE VENDAS E VERCEL SCREEN ALINHADOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* QUADRANTE 1: FUNIL DE VENDAS (5 colunas) */}
          <div className="lg:col-span-5 h-[480px]">
            <FunnelVisual
              steps={funnelSteps}
              selectedStage={filters.stageFilter}
              onSelectStage={handleSelectStage}
            />
          </div>

          {/* QUADRANTE 2: VERCEL SCREEN (7 colunas) */}
          <div className="lg:col-span-7 h-[480px]">
            <VercelScreenCard
              vercelUrl={vercelUrl}
              onOpenConfig={() => setIsVercelConfigOpen(true)}
            />
          </div>
        </div>

        {/* LINHA 2: RANKING VENDEDORES, MOTIVOS DE PERDA E SQLS PERDIDOS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-stretch">
          {/* QUADRANTE 3: RANKING DE VENDEDORES (5 colunas) */}
          <div className="lg:col-span-5 min-h-[320px]">
            <SellersRanking
              rankings={sellerRankings}
              selectedSeller={filters.seller}
              onSelectSeller={handleSelectSeller}
            />
          </div>

          {/* QUADRANTE 4 & 5: MOTIVOS DE PERDA (7 colunas) + SQLs PERDIDOS (5 colunas) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 min-h-[320px]">
            {/* MOTIVOS DE PERDA */}
            <div className="md:col-span-7 h-full">
              <LossReasonsChart
                onSelectReason={(reason) => {
                  setFilters((prev) => ({ ...prev, search: reason }));
                  showToast(`Filtrando pelo motivo: ${reason}`);
                }}
              />
            </div>

            {/* SQLs PERDIDOS */}
            <div className="md:col-span-5 h-full">
              <LostSqlsCard
                lostSqls={lostSqls}
                onInspectLead={handleInspectLead}
                onOpenWinbackList={() => handleOpenDrawerWithStage('venda_perdida')}
              />
            </div>
          </div>
        </div>
      </main>

      {/* MODAIS DE SUPORTE */}
      <LeadsDrawerModal
        isOpen={isLeadsDrawerOpen}
        onClose={() => setIsLeadsDrawerOpen(false)}
        leads={leads}
        onSelectLead={(lead) => {
          setSelectedLead(lead);
          setIsDetailModalOpen(true);
        }}
        onExportCsv={handleExportCsv}
        initialStageFilter={initialDrawerStageFilter}
      />

      <LeadDetailModal
        lead={selectedLead}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdateLead={handleUpdateLead}
      />

      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onAddLead={handleAddLead}
      />

      <VercelConfigModal
        isOpen={isVercelConfigOpen}
        onClose={() => setIsVercelConfigOpen(false)}
        currentUrl={vercelUrl}
        onSaveUrl={handleSaveVercelUrl}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-3 right-3 z-50 bg-[#181310] text-[#FFFFFF] px-3.5 py-2 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 border border-[#C9A96E]/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
