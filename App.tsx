import React, { useState } from 'react';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import ChartCard from './components/ChartCard';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import Modal from './components/Modal';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import { BAR_CHART_DATA, PIE_CHART_DATA, KPI_DATA, PROJECTS_DATA } from './constants';
import type { ModalContent } from './types';

const App: React.FC = () => {
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const [activeView, setActiveView] = useState<'dashboard' | 'projects'>('dashboard');
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

    const handleShowDescription = (title: string, description: string) => {
        setModalContent({ title, description });
    };

    const handleCloseModal = () => {
        setModalContent(null);
    };
    
    const handleProjectSelect = (id: number) => {
        setSelectedProjectId(id);
    };

    const handleReturnToProjects = () => {
        setSelectedProjectId(null);
    };

    const selectedProject = PROJECTS_DATA.find(p => p.id === selectedProjectId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-gray-900 p-4 sm:p-6 lg:p-8">
            <Header activeView={activeView} onNavigate={(view) => {
                setActiveView(view);
                setSelectedProjectId(null); // Reset project selection when changing main view
            }} />
            
            {activeView === 'dashboard' && (
                <main>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {KPI_DATA.map((kpi, index) => (
                            <KpiCard key={index} title={kpi.title} value={kpi.value} icon={kpi.icon} change={kpi.change} changeType={kpi.changeType} />
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3">
                            <ChartCard 
                                title="Ventas Mensuales" 
                                description="Este gráfico de barras muestra el rendimiento de las ventas mes a mes durante el último semestre. Permite identificar tendencias y picos de ventas."
                                onShowDescription={handleShowDescription}
                            >
                                <BarChartComponent data={BAR_CHART_DATA} />
                            </ChartCard>
                        </div>
                        <div className="lg:col-span-2">
                            <ChartCard 
                                title="Distribución de Tráfico" 
                                description="Este gráfico de pastel ilustra la proporción de visitantes según la fuente de tráfico. Es útil para entender qué canales están generando más visitas."
                                onShowDescription={handleShowDescription}
                            >
                                <PieChartComponent data={PIE_CHART_DATA} />
                            </ChartCard>
                        </div>
                    </div>
                </main>
            )}

            {activeView === 'projects' && (
                 !selectedProject ? (
                    <ProjectsPage onProjectSelect={handleProjectSelect} />
                ) : (
                    <ProjectDetailPage project={selectedProject} onBack={handleReturnToProjects} />
                )
            )}
            
            {modalContent && (
                <Modal 
                    isOpen={!!modalContent} 
                    onClose={handleCloseModal} 
                    title={modalContent.title}
                >
                    <p className="text-gray-300">{modalContent.description}</p>
                </Modal>
            )}
        </div>
    );
};

export default App;