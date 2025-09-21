import React from 'react';
import type { BarData, PieData, KpiData, Project } from './types';

// Chart Colors
export const CHART_COLORS = ['#38BDF8', '#34D399', '#FBBF24', '#A78BFA', '#F87171', '#60A5FA'];

// Mock Data for Dashboard
export const BAR_CHART_DATA: BarData[] = [
  { name: 'Ene', ventas: 4200 },
  { name: 'Feb', ventas: 3100 },
  { name: 'Mar', ventas: 5000 },
  { name: 'Abr', ventas: 4500 },
  { name: 'May', ventas: 6200 },
  { name: 'Jun', ventas: 5800 },
];

export const PIE_CHART_DATA: PieData[] = [
  { name: 'Orgánico', value: 450 },
  { name: 'Directo', value: 320 },
  { name: 'Referido', value: 250 },
  { name: 'Social', value: 180 },
];

// Icons for KPI Cards
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const RevenueIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2V7a2 2 0 012-2h4z" />
    </svg>
);

const OrdersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

export const KPI_DATA: KpiData[] = [
    { title: "Usuarios Totales", value: "12,480", icon: <UsersIcon />, change: "+12.5%", changeType: 'increase' },
    { title: "Ingresos", value: "$89,345", icon: <RevenueIcon />, change: "+8.2%", changeType: 'increase' },
    { title: "Nuevos Pedidos", value: "2,150", icon: <OrdersIcon />, change: "-1.8%", changeType: 'decrease' },
    { title: "Crecimiento", value: "+15.3%", icon: <GrowthIcon />, change: "+3.1%", changeType: 'increase' }
];

// Mock Data for Projects Page
export const PROJECTS_DATA: Project[] = [
    {
        id: 1,
        name: "Lanzamiento App Móvil 'Nexus'",
        description: "Desarrollo y lanzamiento de la nueva aplicación móvil para iOS y Android, enfocada en la interacción social.",
        budget: 150000,
        spent: 130000,
        status: 'En Progreso',
        startDate: "2024-01-15",
        team: [
            { name: "Ana Torres", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
            { name: "Carlos Vega", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
            { name: "Sofia Reyes", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
        ],
        timeline: [
            { date: "2024-02-01", event: "Inicio del Desarrollo", status: "Completado" },
            { date: "2024-04-15", event: "Fase de Pruebas Alpha", status: "Completado" },
            { date: "2024-06-20", event: "Lanzamiento Beta", status: "En Progreso" },
            { date: "2024-08-01", event: "Lanzamiento Público", status: "Pendiente" }
        ],
        payments: [
            {id: 1, description: "Pago inicial", amount: 50000, date: "2024-01-20", status: "Pagado"},
            {id: 2, description: "Hito 1: Prototipo", amount: 40000, date: "2024-03-10", status: "Pagado"},
            {id: 3, description: "Hito 2: Beta", amount: 40000, date: "2024-06-25", status: "Pendiente"},
        ],
        contract: "Este Contrato de Servicios de Desarrollo de Software ('Contrato') se celebra el 15 de enero de 2024, entre 'Cliente Corp.' y 'Desarrollador LTD'. Objeto: Desarrollador LTD se compromete a diseñar, desarrollar y entregar la aplicación móvil 'Nexus' según las especificaciones acordadas. Pagos: El pago total será de $150,000, distribuido en hitos. Confidencialidad: Ambas partes acuerdan mantener la confidencialidad de la información compartida."
    },
    {
        id: 2,
        name: "Migración a Infraestructura Cloud",
        description: "Mover toda la infraestructura de servidores locales a una solución basada en la nube para mejorar la escalabilidad.",
        budget: 220000,
        spent: 215000,
        status: 'Completado',
        startDate: "2023-10-01",
        rescheduledDate: "2023-10-05",
        team: [
            { name: "Luis Fernandez", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705a" },
            { name: "Marta Peña", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705b" },
        ],
        timeline: [
            { date: "2023-10-05", event: "Planificación Aprobada", status: "Completado" },
            { date: "2023-11-20", event: "Infraestructura Creada", status: "Completado" },
            { date: "2024-01-15", event: "Migración de Datos", status: "Completado" },
            { date: "2024-02-01", event: "Proyecto Finalizado", status: "Completado" }
        ],
        payments: [
            {id: 1, description: "Pago inicial", amount: 100000, date: "2023-10-10", status: "Pagado"},
            {id: 2, description: "Pago final", amount: 120000, date: "2024-02-05", status: "Pagado"},
        ],
        contract: "Contrato de Servicios de Migración Cloud. Fecha: 01 de Octubre de 2023. Partes: 'Cliente Corp.' y 'Cloud Services Inc.'. Alcance: Migración completa de la infraestructura on-premise a la plataforma AWS. Presupuesto: $220,000. Plazo de entrega: 4 meses."
    },
    {
        id: 3,
        name: "Rediseño del Sitio Web Corporativo",
        description: "Actualización completa del diseño y la experiencia de usuario del sitio web principal de la empresa.",
        budget: 85000,
        spent: 35000,
        status: 'En Progreso',
        startDate: "2024-03-01",
        team: [
            { name: "Elena Ríos", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705c" },
            { name: "Pedro Gomez", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705d" },
            { name: "Julia Sanz", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705e" },
            { name: "David Marín", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705f" },
        ],
        timeline: [
            { date: "2024-03-10", event: "Investigación y UX", status: "Completado" },
            { date: "2024-04-22", event: "Diseño UI Aprobado", status: "Completado" },
            { date: "2024-07-01", event: "Desarrollo Frontend", status: "En Progreso" },
            { date: "2024-09-01", event: "Lanzamiento", status: "Pendiente" }
        ],
        payments: [
            {id: 1, description: "Fase 1: Diseño", amount: 30000, date: "2024-03-15", status: "Pagado"},
            {id: 2, description: "Fase 2: Desarrollo", amount: 55000, date: "2024-07-05", status: "Pendiente"},
        ],
        contract: "Contrato de Rediseño Web. Fecha: 01 de Marzo de 2024. Partes: 'Cliente Corp.' y 'Diseño Web Pro'. Objeto: Rediseño del sitio web corporativo. Costo: $85,000. Entrega final: 01 de Septiembre de 2024."
    },
    {
        id: 4,
        name: "Campaña de Marketing Q4",
        description: "Planificación y ejecución de la campaña de marketing digital para el último trimestre del año.",
        budget: 120000,
        spent: 105000,
        status: 'En Pausa',
        startDate: "2024-09-01",
        team: [
            { name: "Laura Méndez", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706a" },
            { name: "Ricardo Soto", avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706b" },
        ],
         timeline: [
            { date: "2024-09-05", event: "Estrategia Definida", status: "Completado" },
            { date: "2024-09-20", event: "Creatividades Aprobadas", status: "Completado" },
            { date: "2024-10-01", event: "Lanzamiento de Campaña", status: "Pendiente" }
        ],
        payments: [
            {id: 1, description: "Setup y Creatividades", amount: 50000, date: "2024-09-10", status: "Pagado"},
            {id: 2, description: "Inversión en Medios", amount: 70000, date: "2024-10-05", status: "Pendiente"},
        ],
        contract: "Contrato de Servicios de Marketing. Fecha: 01 de Septiembre de 2024. Partes: 'Cliente Corp.' y 'Marketing Digital Global'. Objeto: Campaña de marketing para el Q4. Presupuesto: $120,000."
    },
];