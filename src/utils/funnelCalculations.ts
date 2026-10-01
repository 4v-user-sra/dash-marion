import { Lead, FunnelFilterState, KpiSummary, SellerPerformance, FunnelStepData, StageId } from '../types/funnel';
import { STAGE_DEFINITIONS, LOSS_REASONS_DATA } from '../data/stagesData';

export function filterLeads(leads: Lead[], filters: FunnelFilterState): Lead[] {
  return leads.filter((lead) => {
    // Seller filter
    if (filters.seller !== 'Todos os Vendedores' && lead.seller !== filters.seller) {
      return false;
    }

    // Stage filter
    if (filters.stageFilter !== 'all' && lead.stageId !== filters.stageFilter) {
      return false;
    }

    // Source filter
    if (filters.source !== 'Todas as Origens' && lead.source !== filters.source) {
      return false;
    }

    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.seller.toLowerCase().includes(q) ||
        (lead.lossReason && lead.lossReason.toLowerCase().includes(q)) ||
        (lead.competitorName && lead.competitorName.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });
}

export function calculateKpiSummary(leads: Lead[]): KpiSummary {
  // Valores consolidados oficiais dos últimos 30 dias informados:
  const orcamentosEnviadosValor = 5603400;
  const leadsQualificadosCount = 357; // 59 + 229 + 69

  // Venda Ganha: 13 leads, R$ 296.793
  const totalFechamentosCount = 13;
  const totalFechamentosValor = 296793;
  const ticketMedio30d = Math.round(totalFechamentosValor / totalFechamentosCount); // R$ 22.830,00

  // Taxa de fechamento (Hit Rate): 1,4%
  const hitRatePercent = 1.4;

  // SQLs Perdidos: 30 leads, R$ 464.325
  const sqlsPerdidosCount = 30;
  const sqlsPerdidosValor = 464325;

  // Perdas Totais: 565 leads, R$ 2.500.325
  const totalPerdasCount = 565;
  const totalPerdasValor = 2500325;

  return {
    orcamentosEnviadosValor,
    leadsQualificadosCount,
    ticketMedio30d,
    hitRatePercent,
    totalLeadsAtendimento: 454,
    totalFechamentosCount,
    totalFechamentosValor,
    totalPerdasCount,
    totalPerdasValor,
    sqlsPerdidosCount,
    sqlsPerdidosValor,
  };
}

export function calculateSellerRankings(leads: Lead[]): SellerPerformance[] {
  // Distribuição das 13 vendas da equipe somando R$ 296.793
  const targetSellers = [
    { name: 'Gabriella', nickname: 'Gabriella', dealsCount: 5, totalValue: 121793, avatarColor: '#C9A96E' },
    { name: 'Mariana', nickname: 'Mari', dealsCount: 5, totalValue: 120600, avatarColor: '#6B7B6E' },
    { name: 'Vitor', nickname: 'Vitor', dealsCount: 3, totalValue: 54400, avatarColor: '#3D1F14' },
  ];

  return targetSellers.map((seller, index) => {
    const avgTicket = Math.round(seller.totalValue / seller.dealsCount);
    const conversionRate = Number(((seller.dealsCount / 150) * 100).toFixed(1));

    return {
      name: seller.name,
      nickname: seller.nickname,
      dealsCount: seller.dealsCount,
      totalValue: seller.totalValue,
      avgTicket,
      conversionRate,
      avatarColor: seller.avatarColor,
      rank: index + 1,
    };
  });
}

export function calculateFunnelSteps(leads: Lead[]): FunnelStepData[] {
  const stepsConfig: Array<{ id: StageId; count: number; value: number }> = [
    { id: 'em_atendimento', count: 454, value: 33960 },
    { id: 'tentativa_1', count: 73, value: 101880 },
    { id: 'orcamento', count: 59, value: 984840 },
    { id: 'recontato_1', count: 229, value: 3582780 },
    { id: 'recontato_2', count: 69, value: 1035780 },
    { id: 'agendamento_presencial', count: 13, value: 203760 },
    { id: 'show_presencial', count: 11, value: 293037 },
    { id: 'no_show_presencial', count: 10, value: 135840 },
    { id: 'negociacao', count: 3, value: 65680 },
    { id: 'contato_interno', count: 0, value: 0 },
    { id: 'prestadores', count: 0, value: 0 },
    { id: 'fornecedores', count: 0, value: 0 },
    { id: 'venda_ganha', count: 13, value: 296793 },
  ];

  const totalBase = 454;

  return stepsConfig.map((cfg, idx) => {
    const stageDef = STAGE_DEFINITIONS[cfg.id];
    let prevCount = totalBase;
    if (idx > 0) {
      prevCount = stepsConfig[idx - 1].count || totalBase;
    }

    const conversionFromPrev = prevCount > 0 ? Number(((cfg.count / prevCount) * 100).toFixed(1)) : 0;
    const conversionFromLead = totalBase > 0 ? Number(((cfg.count / totalBase) * 100).toFixed(1)) : 0;

    return {
      id: cfg.id,
      name: stageDef ? stageDef.name : cfg.id,
      shortName: stageDef ? stageDef.shortName : cfg.id,
      count: cfg.count,
      value: cfg.value,
      conversionFromPrev,
      conversionFromLead,
      color: stageDef ? stageDef.color : '#C9A96E',
      textColor: stageDef ? stageDef.textColor : 'text-[#C9A96E]',
    };
  });
}

export function exportLeadsToCsv(leads: Lead[], filename = 'dashboard-comercial-30d.csv') {
  const headers = ['ID', 'Nome', 'Empresa', 'E-mail', 'Telefone', 'Vendedor', 'Etapa', 'Substatus', 'Valor (R$)', 'Dias na Etapa', 'Origem', 'Motivo de Perda', 'Concorrente'];
  
  const rows = leads.map((l) => [
    l.id,
    `"${l.name}"`,
    `"${l.company}"`,
    l.email,
    l.phone,
    l.seller,
    STAGE_DEFINITIONS[l.stageId]?.name || l.stageId,
    `"${l.substatus}"`,
    l.value,
    l.daysInStage,
    l.source,
    `"${l.lossReason || ''}"`,
    `"${l.competitorName || ''}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
