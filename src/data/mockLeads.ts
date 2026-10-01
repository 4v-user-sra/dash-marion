import { Lead } from '../types/funnel';

export const initialMockLeads: Lead[] = [
  // =========================================================================
  // 1. VENDA GANHA (13 contratos fechados nos últimos 30 dias - R$ 296.793)
  // =========================================================================
  {
    id: 'lead-win-1',
    name: 'Carolina Mendes',
    company: 'Nexus Logística Global',
    email: 'carolina@nexuslog.com.br',
    phone: '(11) 98765-4321',
    seller: 'Gabriella',
    source: 'Indicação',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 38500,
    stageEntryDate: '2026-09-26',
    daysInStage: 5,
    lastInteractionDate: '2026-09-26',
    lastInteractionChannel: 'Reunião Presencial',
    notes: 'Fechamento de contrato corporativo anual.',
    createdAt: '2026-09-02'
  },
  {
    id: 'lead-win-2',
    name: 'Rodrigo Guimarães',
    company: 'Alpha Engenharia & Obras',
    email: 'rodrigo@alphaeng.com.br',
    phone: '(11) 97654-3210',
    seller: 'Gabriella',
    source: 'Google Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 34000,
    stageEntryDate: '2026-09-20',
    daysInStage: 11,
    lastInteractionDate: '2026-09-20',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Proposta aceita com pagamento à vista via PIX.',
    createdAt: '2026-09-05'
  },
  {
    id: 'lead-win-3',
    name: 'Camila Peixoto',
    company: 'Prime Odonto Clínicas',
    email: 'camila@primeodonto.com.br',
    phone: '(11) 96543-2109',
    seller: 'Gabriella',
    source: 'Inbound Orgânico',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 27500,
    stageEntryDate: '2026-09-28',
    daysInStage: 3,
    lastInteractionDate: '2026-09-28',
    lastInteractionChannel: 'E-mail',
    notes: 'Plano premium de expansão regional.',
    createdAt: '2026-09-10'
  },
  {
    id: 'lead-win-4',
    name: 'Lucas Brandão',
    company: 'Solaris Energia Renovável',
    email: 'lucas@solarisenergia.com.br',
    phone: '(21) 98432-1098',
    seller: 'Mariana',
    source: 'Outbound',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 32000,
    stageEntryDate: '2026-09-22',
    daysInStage: 9,
    lastInteractionDate: '2026-09-22',
    lastInteractionChannel: 'Reunião Presencial',
    notes: 'Implementação de projeto solar industrial.',
    createdAt: '2026-09-04'
  },
  {
    id: 'lead-win-5',
    name: 'Vanessa Silveira',
    company: 'BioNutri Alimentos Funcionais',
    email: 'vanessa@bionutri.com.br',
    phone: '(41) 99123-4567',
    seller: 'Mariana',
    source: 'Google Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 28500,
    stageEntryDate: '2026-09-25',
    daysInStage: 6,
    lastInteractionDate: '2026-09-25',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Contrato fechado com sucesso para 12 meses.',
    createdAt: '2026-09-08'
  },
  {
    id: 'lead-win-6',
    name: 'Eduardo Farias',
    company: 'Aliança Contabilidade Digital',
    email: 'eduardo@aliancacontabil.com.br',
    phone: '(31) 98877-6655',
    seller: 'Mariana',
    source: 'Indicação',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 29500,
    stageEntryDate: '2026-09-29',
    daysInStage: 2,
    lastInteractionDate: '2026-09-29',
    lastInteractionChannel: 'E-mail',
    notes: 'Fechamento rápido após validação técnica.',
    createdAt: '2026-09-15'
  },
  {
    id: 'lead-win-7',
    name: 'Felipe Alencar',
    company: 'MaxiFrete Transportes',
    email: 'felipe@maxifrete.com.br',
    phone: '(19) 97766-5544',
    seller: 'Vitor',
    source: 'Meta Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 21500,
    stageEntryDate: '2026-09-18',
    daysInStage: 13,
    lastInteractionDate: '2026-09-18',
    lastInteractionChannel: 'Telefone',
    notes: 'Fechamento no modelo semestral.',
    createdAt: '2026-09-01'
  },
  {
    id: 'lead-win-8',
    name: 'Tatiana Rezende',
    company: 'Vértice Corretora de Seguros',
    email: 'tatiana@verticeseguros.com.br',
    phone: '(11) 99887-1122',
    seller: 'Vitor',
    source: 'Google Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 18500,
    stageEntryDate: '2026-09-27',
    daysInStage: 4,
    lastInteractionDate: '2026-09-27',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Assinatura e ativação imediata.',
    createdAt: '2026-09-12'
  },
  {
    id: 'lead-win-9',
    name: 'Otávio Dantas',
    company: 'Horizonte Agropecuária S/A',
    email: 'otavio@horizonteagro.com.br',
    phone: '(62) 99111-2233',
    seller: 'Gabriella',
    source: 'Indicação',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 19793,
    stageEntryDate: '2026-09-29',
    daysInStage: 2,
    lastInteractionDate: '2026-09-29',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Expansão de plano contratada.',
    createdAt: '2026-09-16'
  },
  {
    id: 'lead-win-10',
    name: 'Paula Vasconcelos',
    company: 'Target Educação Executiva',
    email: 'paula@targetedu.com.br',
    phone: '(11) 98222-3344',
    seller: 'Mariana',
    source: 'Google Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 15500,
    stageEntryDate: '2026-09-24',
    daysInStage: 7,
    lastInteractionDate: '2026-09-24',
    lastInteractionChannel: 'E-mail',
    notes: 'Parceria anual firmada.',
    createdAt: '2026-09-14'
  },
  {
    id: 'lead-win-11',
    name: 'Henrique Morais',
    company: 'Delta Express Logística',
    email: 'henrique@deltaexpress.com.br',
    phone: '(19) 98333-4455',
    seller: 'Vitor',
    source: 'Meta Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 14500,
    stageEntryDate: '2026-09-26',
    daysInStage: 5,
    lastInteractionDate: '2026-09-26',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Contrato aprovado pela diretoria financeira.',
    createdAt: '2026-09-18'
  },
  {
    id: 'lead-win-12',
    name: 'Patrícia Lima',
    company: 'Inovare Saúde Digital',
    email: 'patricia@inovaresaude.com.br',
    phone: '(11) 98444-5566',
    seller: 'Gabriella',
    source: 'Outbound',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 16000,
    stageEntryDate: '2026-09-28',
    daysInStage: 3,
    lastInteractionDate: '2026-09-28',
    lastInteractionChannel: 'Reunião Presencial',
    notes: 'Fechamento concluído.',
    createdAt: '2026-09-17'
  },
  {
    id: 'lead-win-13',
    name: 'Bruno Castro',
    company: 'Ponto Certo Automação',
    email: 'bruno@pontocerto.com.br',
    phone: '(11) 98555-6677',
    seller: 'Mariana',
    source: 'Google Ads',
    stageId: 'venda_ganha',
    substatus: 'Contrato Assinado',
    value: 15100,
    stageEntryDate: '2026-09-30',
    daysInStage: 1,
    lastInteractionDate: '2026-09-30',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Assinatura eletrônica concluída.',
    createdAt: '2026-09-20'
  },

  // =========================================================================
  // 2. VENDA PERDIDA (SQLs Perdidos para Concorrente: 30 leads - R$ 464.325)
  // =========================================================================
  ...Array.from({ length: 30 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    const competitors = ['Totvs', 'Sankhya', 'Senior Sistemas', 'Omie', 'RD Station'];
    const companies = [
      'Grupo Vanguarda Varejo', 'MetaDigital Softwares', 'Fortis Segurança', 'Sul América Embalagens',
      'Planalto Distribuição', 'Titan Máquinas Industriais', 'Bella Casa Móveis', 'Inovaprint Gráfica',
      'Harmonia Clínicas', 'Vip Rent a Car', 'Nova Era Cosméticos', 'Belo Grão Cafés',
      'QualiMed Diagnósticos', 'Pilar Estruturas', 'União Distribuição', 'AeroJet Cargas',
      'MasterPeças Auto', 'Lumina Iluminação', 'Sinergia RH', 'Porto Real Hotelaria',
      'Dínamo Engenharia', 'Apex Capital Invest', 'Valle Fertilizantes', 'Soberana Carnes',
      'Solutec Softwares', 'Krona Tubos', 'Plena Saúde', 'Metrópole Obras', 'Serra Azul Transportes', 'Áquila Drones'
    ];
    const names = [
      'Marcos Vinícius', 'Juliana Prado', 'Alexandre Moreira', 'Sabrina Queiroz',
      'Fábio Dornelles', 'Danilo Barros', 'Larissa Toledo', 'Renata Alencar',
      'Diego Martins', 'Vanessa Dias', 'Gabriel Monteiro', 'Amanda Borges',
      'Leandro Correia', 'Carolina Prado', 'Tatiana Meireles', 'Vinícius Sampaio',
      'Natália Gusmão', 'César Albuquerque', 'Paula Vasconcelos', 'Samuel Brandão',
      'Aline Figueiredo', 'Henrique Morais', 'Bianca Peixoto', 'Marcelo Antunes',
      'Cláudia Neves', 'Débora Fontes', 'Guilherme Macedo', 'Lívia Carmo', 'Rogério Chaves', 'Talita Sanches'
    ];
    const baseValue = Math.round(464325 / 30);

    return {
      id: `lead-lost-sql-${i + 1}`,
      name: names[i] || `Contato SQL ${i + 1}`,
      company: companies[i] || `Empresa Qualificada ${i + 1}`,
      email: `contato@empresa${i + 1}.com.br`,
      phone: `(11) 97${100 + i * 13}-${1000 + i * 29}`,
      seller: sellers[i % sellers.length],
      source: i % 2 === 0 ? 'Google Ads' : 'Indicação',
      stageId: 'venda_perdida' as const,
      substatus: 'Perdido para Concorrente',
      value: baseValue + (i % 5) * 1000 - 2000,
      stageEntryDate: '2026-09-20',
      daysInStage: (i % 12) + 2,
      lastInteractionDate: '2026-09-25',
      lastInteractionChannel: 'Reunião Presencial',
      lossReason: 'Fechou com concorrente (SQL Perdido)',
      isCompetitorLoss: true,
      competitorName: competitors[i % competitors.length],
      notes: `SQL qualificado de alto valor perdido para a concorrente ${competitors[i % competitors.length]}.`,
      createdAt: '2026-09-01'
    };
  }),

  // =========================================================================
  // 3. OUTRAS PERDAS REPRESENTATIVAS (Sem Retorno: 406 leads / R$ 1.082.000, etc.)
  // =========================================================================
  ...Array.from({ length: 40 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    return {
      id: `lead-lost-noreturn-${i + 1}`,
      name: `Lead Sem Retorno ${i + 1}`,
      company: `Empresa Inativa ${i + 1} Ltda`,
      email: `lead${i + 1}@inativo.com.br`,
      phone: `(11) 96${200 + i * 11}-${3000 + i * 17}`,
      seller: sellers[i % sellers.length],
      source: 'Google Ads',
      stageId: 'venda_perdida' as const,
      substatus: 'Sem Retorno de Follow-up',
      value: 2665,
      stageEntryDate: '2026-09-18',
      daysInStage: 15,
      lastInteractionDate: '2026-09-20',
      lastInteractionChannel: 'WhatsApp',
      lossReason: 'Sem retorno',
      isCompetitorLoss: false,
      notes: 'Não respondeu às mensagens de follow-up.',
      createdAt: '2026-09-02'
    };
  }),

  // =========================================================================
  // 4. NEGOCIAÇÃO (3 leads - R$ 65.680)
  // =========================================================================
  {
    id: 'lead-neg-1',
    name: 'Juliana Rocha',
    company: 'Serrana Madeiras Nobres S/A',
    email: 'juliana@serranamadeiras.com.br',
    phone: '(11) 98111-2233',
    seller: 'Gabriella',
    source: 'Indicação',
    stageId: 'negociacao',
    substatus: 'Minuta Contratual em Análise',
    value: 25680,
    stageEntryDate: '2026-09-26',
    daysInStage: 5,
    lastInteractionDate: '2026-09-29',
    lastInteractionChannel: 'Reunião Presencial',
    notes: 'Ajuste de cláusula de garantia e forma de pagamento.',
    createdAt: '2026-09-10'
  },
  {
    id: 'lead-neg-2',
    name: 'Leandro Ramos',
    company: 'Nova Era Cosméticos Industriais',
    email: 'leandro@novaeracosmeticos.com.br',
    phone: '(19) 98222-3344',
    seller: 'Mariana',
    source: 'Google Ads',
    stageId: 'negociacao',
    substatus: 'Proposta Final em Validação',
    value: 22000,
    stageEntryDate: '2026-09-27',
    daysInStage: 4,
    lastInteractionDate: '2026-09-30',
    lastInteractionChannel: 'WhatsApp',
    notes: 'Aguardando parecer da diretoria executiva.',
    createdAt: '2026-09-12'
  },
  {
    id: 'lead-neg-3',
    name: 'Carla Nogueira',
    company: 'Pilar Estruturas Metálicas',
    email: 'carla@pilarestruturas.com.br',
    phone: '(11) 98333-4455',
    seller: 'Vitor',
    source: 'Meta Ads',
    stageId: 'negociacao',
    substatus: 'Alinhamento Jurídico',
    value: 18000,
    stageEntryDate: '2026-09-28',
    daysInStage: 3,
    lastInteractionDate: '2026-09-30',
    lastInteractionChannel: 'E-mail',
    notes: 'Proposta aceita verbalmente, formalizando contrato.',
    createdAt: '2026-09-15'
  },

  // =========================================================================
  // 5. SHOW PRESENCIAL (11 leads - R$ 293.037)
  // =========================================================================
  ...Array.from({ length: 11 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    return {
      id: `lead-show-${i + 1}`,
      name: `Cliente Show ${i + 1}`,
      company: `Empresa Presencial ${i + 1} Ltda`,
      email: `show${i + 1}@empresa.com.br`,
      phone: `(11) 97400-${1000 + i * 37}`,
      seller: sellers[i % sellers.length],
      source: i % 2 === 0 ? 'Google Ads' : 'Indicação',
      stageId: 'show_presencial' as const,
      substatus: 'Reunião Realizada',
      value: Math.round(293037 / 11),
      stageEntryDate: '2026-09-25',
      daysInStage: (i % 6) + 1,
      lastInteractionDate: '2026-09-29',
      lastInteractionChannel: 'Reunião Presencial',
      notes: 'Demonstração de valor realizada presencialmente.',
      createdAt: '2026-09-12'
    };
  }),

  // =========================================================================
  // 6. AGENDAMENTO PRESENCIAL (13 leads - R$ 203.760)
  // =========================================================================
  ...Array.from({ length: 13 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    return {
      id: `lead-agend-${i + 1}`,
      name: `Agendamento ${i + 1}`,
      company: `Corporativo ${i + 1} S/A`,
      email: `agendamento${i + 1}@corp.com.br`,
      phone: `(11) 97500-${2000 + i * 41}`,
      seller: sellers[i % sellers.length],
      source: 'Google Ads',
      stageId: 'agendamento_presencial' as const,
      substatus: 'Data Agendada',
      value: Math.round(203760 / 13),
      stageEntryDate: '2026-09-27',
      daysInStage: (i % 4) + 1,
      lastInteractionDate: '2026-09-29',
      lastInteractionChannel: 'WhatsApp',
      notes: 'Reunião confirmada no calendário.',
      createdAt: '2026-09-15'
    };
  }),

  // =========================================================================
  // 7. ORÇAMENTOS E RECONTATOS (Orçamento 59 leads R$ 984k, Recontato 1 229 leads R$ 3.58M, Recontato 2 69 leads R$ 1.03M)
  // =========================================================================
  ...Array.from({ length: 50 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    return {
      id: `lead-orc-${i + 1}`,
      name: `Contato Orçamento ${i + 1}`,
      company: `Proposta ${i + 1} Comercial`,
      email: `proposta${i + 1}@lead.com.br`,
      phone: `(11) 97600-${3000 + i * 23}`,
      seller: sellers[i % sellers.length],
      source: i % 2 === 0 ? 'Meta Ads' : 'Google Ads',
      stageId: 'recontato_1' as const,
      substatus: 'Recontato 1',
      value: 15645,
      stageEntryDate: '2026-09-22',
      daysInStage: 8,
      lastInteractionDate: '2026-09-28',
      lastInteractionChannel: 'WhatsApp',
      notes: 'Orçamento enviado, em acompanhamento de recontato.',
      createdAt: '2026-09-05'
    };
  }),

  // =========================================================================
  // 8. EM ATENDIMENTO (454 leads - R$ 33.960)
  // =========================================================================
  ...Array.from({ length: 45 }, (_, i) => {
    const sellers = ['Gabriella', 'Mariana', 'Vitor'];
    return {
      id: `lead-atend-${i + 1}`,
      name: `Lead Atendimento ${i + 1}`,
      company: `Inbound Lead ${i + 1}`,
      email: `inbound${i + 1}@contato.com.br`,
      phone: `(11) 97700-${4000 + i * 19}`,
      seller: sellers[i % sellers.length],
      source: 'Google Ads',
      stageId: 'em_atendimento' as const,
      substatus: 'Primeiro Contato',
      value: 75,
      stageEntryDate: '2026-09-29',
      daysInStage: 1,
      lastInteractionDate: '2026-09-30',
      lastInteractionChannel: 'WhatsApp',
      notes: 'Lead recebido no fluxo inicial.',
      createdAt: '2026-09-29'
    };
  }),
];
