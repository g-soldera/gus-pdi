export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function calculateDaysRemaining(deadline: string): number {
  const today = new Date();
  const target = new Date(deadline);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function calculateTimeDifference(startDate: string): { years: number; months: number; days: number } {
  const start = new Date(startDate);
  const today = new Date();
  
  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
}

export function calculateMonthsElapsed(startDate: Date, totalMonths: number): number {
  const today = new Date();
  const monthsElapsed = (today.getFullYear() - startDate.getFullYear()) * 12 + 
                        (today.getMonth() - startDate.getMonth());
  return Math.min(monthsElapsed, totalMonths);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
}

export function getStatusColor(status: 'completed' | 'in-progress' | 'not-started'): string {
  const colors = {
    'completed': 'text-[var(--completed)]',
    'in-progress': 'text-[var(--in-progress)]',
    'not-started': 'text-[var(--not-started)]',
  };
  return colors[status];
}

export function getStatusBgColor(status: 'completed' | 'in-progress' | 'not-started'): string {
  const colors = {
    'completed': 'bg-success-light text-success',
    'in-progress': 'bg-info-light text-info',
    'not-started': 'bg-muted text-muted-foreground',
  };
  return colors[status];
}

export function getStatusLabel(status: 'completed' | 'in-progress' | 'not-started'): string {
  const labels = {
    'completed': 'Concluído',
    'in-progress': 'Em Progresso',
    'not-started': 'Não Iniciado',
  };
  return labels[status];
}

export function getProficiencyLabel(level: 1 | 2 | 3 | 4 | 5): string {
  const labels = {
    1: 'Iniciante',
    2: 'Básico',
    3: 'Intermediário',
    4: 'Avançado',
    5: 'Especialista',
  };
  return labels[level];
}
