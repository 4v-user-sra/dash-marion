export type StageId =
  | 'em_atendimento'
  | 'tentativa_1'
  | 'orcamento'
  | 'recontato_1'
  | 'recontato_2'
  | 'agendamento_presencial'
  | 'show_presencial'
  | 'no_show_presencial'
  | 'negociacao'
  | 'contato_interno'
  | 'prestadores'
  | 'fornecedores'
  | 'venda_ganha'
  | 'venda_perdida';

export interface StageDefinition {
  id: StageId;
  order: number;
  stepNumber: string;
  name: string;
  shortName: string;
  description: string;
  isOpen: boolean;
  color: string;
  textColor: string;
  bgLight: string;
  borderColor: string;
  count: number;
  value: number;
}

export type LossReason =
  | 'Sem retorno'
  | 'Localização'
  | 'Fechou com concorrente (SQL Perdido)'
  | 'Motivo indefinido'
  | 'Mudança de plano'
  | 'Orçamento insuficiente'
  | 'Queria apenas o espaço'
  | 'Condição de pagamento'
  | string;

export type InteractionChannel = 'WhatsApp' | 'E-mail' | 'Telefone' | 'Reunião Presencial' | string;

export interface LeadInteraction {
  date: string;
  channel: InteractionChannel;
  note: string;
  user: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  seller: string;
  source: string;
  stageId: StageId;
  substatus: string;
  value: number;
  stageEntryDate: string; // YYYY-MM-DD
  daysInStage: number;
  lastInteractionDate: string;
  lastInteractionChannel: InteractionChannel;
  lossReason?: LossReason;
  isCompetitorLoss?: boolean;
  competitorName?: string;
  notes?: string;
  history?: LeadInteraction[];
  createdAt: string;
}

export type PeriodFilterOption =
  | 'Últimos 30 dias'
  | 'Este mês'
  | 'Últimos 7 dias'
  | 'Hoje'
  | 'Mês anterior'
  | 'Todos os períodos';

export interface FunnelFilterState {
  period: PeriodFilterOption;
  seller: string;
  stageFilter: string;
  source: string;
  search: string;
  viewMode: 'count' | 'value';
}

export interface SellerPerformance {
  name: string;
  nickname: string;
  dealsCount: number;
  totalValue: number;
  avgTicket: number;
  conversionRate: number;
  avatarColor: string;
  rank: number;
}

export interface FunnelStepData {
  id: StageId;
  name: string;
  shortName: string;
  count: number;
  value: number;
  conversionFromPrev: number;
  conversionFromLead: number;
  color: string;
  textColor: string;
}

export interface LossReasonData {
  reason: string;
  shortReason: string;
  count: number;
  value: number;
  percent: number;
  color: string;
  isSqlLost: boolean;
  description: string;
}

export interface KpiSummary {
  orcamentosEnviadosValor: number; // R$ 5.603.400 (ou R$ 4.8M)
  leadsQualificadosCount: number; // 357 (Orçamentos + Recontatos)
  ticketMedio30d: number; // R$ 22.830 (R$ 296.793 / 13)
  hitRatePercent: number; // 1.4% (ou 1.2%)
  totalLeadsAtendimento: number; // 454
  totalFechamentosCount: number; // 13
  totalFechamentosValor: number; // R$ 296.793
  totalPerdasCount: number; // 565
  totalPerdasValor: number; // R$ 2.500.325
  sqlsPerdidosCount: number; // 30
  sqlsPerdidosValor: number; // R$ 464.325
}
