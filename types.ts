export interface BarData {
  name: string;
  ventas: number;
}

export interface PieData {
  name: string;
  value: number;
}

export interface KpiData {
    title: string;
    value: string;
    icon: JSX.Element;
    change: string;
    changeType: 'increase' | 'decrease';
}

export interface ModalContent {
    title: string;
    description: string;
}

// Tipos para la página de Proyectos
export type ProjectStatus = 'En Progreso' | 'Completado' | 'En Pausa';

export interface TeamMember {
  name: string;
  avatarUrl: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  // FIX: Added 'En Progreso' to the status type to allow for more granular timeline event tracking, matching the data in constants.tsx.
  status: 'Completado' | 'Pendiente' | 'En Progreso';
}

export interface Payment {
  id: number;
  description: string;
  amount: number;
  date: string;
  status: 'Pagado' | 'Pendiente';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  spent: number;
  status: ProjectStatus;
  team: TeamMember[];
  startDate: string;
  rescheduledDate?: string;
  timeline: TimelineEvent[];
  payments: Payment[];
  contract: string;
}