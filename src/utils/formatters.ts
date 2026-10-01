// Formatters and calculations for Commercial Funnel BI

export function formatCurrency(val: number): string {
  const num = typeof val === 'number' && !isNaN(val) ? val : 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatCompactCurrency(val: number): string {
  const num = typeof val === 'number' && !isNaN(val) ? val : 0;
  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return `R$ ${formatted}M`;
  }
  if (num >= 1_000) {
    const formatted = (num / 1_000).toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    return `R$ ${formatted}k`;
  }
  return formatCurrency(num);
}

export function formatNumber(val: number): string {
  const num = typeof val === 'number' && !isNaN(val) ? val : 0;
  return new Intl.NumberFormat('pt-BR').format(num);
}

export function formatPercent(val: number, decimals: number = 1): string {
  const num = typeof val === 'number' && !isNaN(val) ? val : 0;
  return `${num.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
}
