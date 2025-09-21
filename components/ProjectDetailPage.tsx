import React, { useState, useMemo } from 'react';
import type { Project, TimelineEvent } from '../types';
import Modal from './Modal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CHART_COLORS } from '../constants';

// Make jsPDF and its plugin available in the scope
declare const jspdf: any;

interface ProjectDetailPageProps {
    project: Project;
    onBack: () => void;
}

interface UploadedContractInfo {
    name: string;
    type: string;
    size: number;
    dataUrl: string;
}

// --- Sub-components defined within the detail page for cohesion ---

const TimelineNode: React.FC<{ event: TimelineEvent, isLast: boolean }> = ({ event, isLast }) => {
    const isCompleted = event.status === 'Completado';
    return (
        <div className="relative pl-8">
            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ${isCompleted ? 'bg-highlight' : 'bg-gray-600 border-2 border-gray-400'}`}>
                {isCompleted && <div className="absolute inset-0.5 bg-secondary rounded-full"></div>}
            </div>
            {!isLast && <div className="absolute left-[7px] top-5 h-full w-px bg-gray-600"></div>}
            <p className={`font-semibold ${isCompleted ? 'text-white' : 'text-gray-400'}`}>{event.event}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
        </div>
    );
};

const PaymentChart: React.FC<{ project: Project }> = ({ project }) => {
    const totalPaid = useMemo(() => 
        project.payments
            .filter(p => p.status === 'Pagado')
            .reduce((sum, p) => sum + p.amount, 0),
        [project.payments]
    );

    const data = [
        { name: 'Finanzas', Presupuesto: project.budget, Gastado: project.spent, Pagado: totalPaid }
    ];

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" tick={{ fill: '#a0aec0' }} />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                        borderColor: '#374151',
                    }} 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ color: '#a0aec0' }} />
                <Bar dataKey="Pagado" stackId="a" fill="#34D399" name="Pagado" />
                <Bar dataKey="Gastado" stackId="a" fill="#F87171" name="Gastado (no pagado)" transform="stack" />
                <Bar dataKey="Presupuesto" stackId="b" fill="rgba(107, 114, 128, 0.3)" name="Presupuesto restante" transform="stack"/>
            </BarChart>
        </ResponsiveContainer>
    );
};


// --- Main Detail Page Component ---

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
    const [isContractModalOpen, setContractModalOpen] = useState(false);
    const [uploadedContract, setUploadedContract] = useState<UploadedContractInfo | null>(() => {
        try {
            const stored = localStorage.getItem(`contract_${project.id}`);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Error al leer contrato de localStorage", error);
            return null;
        }
    });
    const [dates, setDates] = useState({
        start: project.startDate,
        rescheduled: project.rescheduledDate || ''
    });
    const [approvalStatus, setApprovalStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [fundRequestStatus, setFundRequestStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const progressPercentage = project.budget > 0 ? (project.spent / project.budget) * 100 : 0;
    const isBudgetAlert = progressPercentage > 85;

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDates(prev => ({ ...prev, [name]: value }));
    };

    const handleContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const dataUrl = event.target?.result as string;
                    const contractInfo: UploadedContractInfo = {
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        dataUrl: dataUrl,
                    };
                    setUploadedContract(contractInfo);
                    try {
                        localStorage.setItem(`contract_${project.id}`, JSON.stringify(contractInfo));
                    } catch (error) {
                        console.error("Error al guardar contrato en localStorage", error);
                        alert("No se pudo guardar el contrato. El almacenamiento puede estar lleno.");
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert("Por favor, sube solo archivos PDF.");
                e.target.value = ''; // Reset file input
            }
        }
    };

    const handleRemoveContract = () => {
        setUploadedContract(null);
        try {
            localStorage.removeItem(`contract_${project.id}`);
        } catch (error) {
            console.error("Error al eliminar contrato de localStorage", error);
        }
    };
    
    const canReviewContract = !!project.contract || !!uploadedContract;

    const handleDownloadPdf = () => {
        const doc = new jspdf.jsPDF();
        
        doc.setFontSize(22);
        doc.text(project.name, 14, 22);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Resumen del Proyecto - ${new Date().toLocaleDateString()}`, 14, 30);

        doc.autoTable({
            startY: 40,
            head: [['Campo', 'Valor']],
            body: [
                ['Status', project.status],
                ['Fecha de Inicio', project.startDate],
                ['Fecha Reprogramada', project.rescheduledDate || 'N/A'],
                ['Presupuesto Total', `$${project.budget.toLocaleString()}`],
                ['Total Gastado', `$${project.spent.toLocaleString()}`],
            ],
            theme: 'grid'
        });

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Miembros del Equipo']],
            body: project.team.map(member => [member.name]),
            theme: 'striped'
        });

        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Fecha', 'Hito', 'Estado']],
            body: project.timeline.map(e => [e.date, e.event, e.status]),
            theme: 'grid'
        });
        
        doc.autoTable({
            startY: doc.lastAutoTable.finalY + 10,
            head: [['Fecha', 'Descripción', 'Monto', 'Estado']],
            body: project.payments.map(p => [p.date, p.description, `$${p.amount.toLocaleString()}`, p.status]),
            theme: 'grid'
        });

        doc.save(`${project.name}-resumen.pdf`);
    };

    const handleApproveProgress = () => {
        setApprovalStatus('loading');
        setTimeout(() => {
            setApprovalStatus('success');
            setTimeout(() => setApprovalStatus('idle'), 2500);
        }, 1500);
    };

    const handleRequestFunds = () => {
        setFundRequestStatus('loading');
        setTimeout(() => {
            setFundRequestStatus('success');
            setTimeout(() => setFundRequestStatus('idle'), 2500);
        }, 1500);
    };

    return (
        <main className="animate-fade-in">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <button onClick={onBack} className="flex items-center text-sm text-highlight hover:text-cyan-300 transition-colors mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver a Proyectos
                    </button>
                    <h2 className="text-3xl font-bold text-white">{project.name}</h2>
                    <p className="text-gray-400 mt-1">{project.description}</p>
                </div>
                <button onClick={handleDownloadPdf} className="bg-highlight text-primary font-bold py-2 px-5 rounded-lg hover:bg-emerald-300 transition-colors flex-shrink-0">
                    Descargar Resumen (PDF)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-secondary/50 p-6 rounded-xl border border-gray-700">
                         <h3 className="font-bold text-lg mb-3">Presupuesto</h3>
                         <div className="flex justify-between text-sm mb-1 text-gray-300">
                            <span>Gastado: <span className="font-bold text-white">${project.spent.toLocaleString()}</span></span>
                            <span>Total: <span className="font-bold text-white">${project.budget.toLocaleString()}</span></span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                                className={`h-3 rounded-full ${isBudgetAlert ? 'bg-yellow-500' : 'bg-gradient-to-r from-accent to-highlight'}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        {isBudgetAlert && <p className="text-yellow-400 text-xs mt-2 animate-pulse">Alerta: El gasto ha superado el 85% del presupuesto.</p>}
                         <div className="mt-4 flex gap-3">
                            <button
                                onClick={handleApproveProgress}
                                disabled={approvalStatus !== 'idle'}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg w-full transition-all duration-300
                                    ${approvalStatus === 'idle' ? 'bg-highlight/20 text-highlight hover:bg-highlight/40' : ''}
                                    ${approvalStatus === 'loading' ? 'bg-gray-600/50 text-gray-400 cursor-wait' : ''}
                                    ${approvalStatus === 'success' ? 'bg-green-500/30 text-green-300' : ''}
                                `}
                            >
                                {approvalStatus === 'idle' && 'Aprobar Avance'}
                                {approvalStatus === 'loading' && (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Aprobando...
                                    </span>
                                )}
                                {approvalStatus === 'success' && 'Aprobado ✓'}
                            </button>
                            <button
                                onClick={handleRequestFunds}
                                disabled={fundRequestStatus !== 'idle'}
                                className={`text-sm font-semibold py-2 px-4 rounded-lg w-full transition-all duration-300
                                    ${fundRequestStatus === 'idle' ? 'bg-accent/20 text-accent hover:bg-accent/40' : ''}
                                    ${fundRequestStatus === 'loading' ? 'bg-gray-600/50 text-gray-400 cursor-wait' : ''}
                                    ${fundRequestStatus === 'success' ? 'bg-blue-500/30 text-blue-300' : ''}
                                `}
                            >
                                {fundRequestStatus === 'idle' && 'Solicitar Fondos'}
                                {fundRequestStatus === 'loading' && (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Solicitando...
                                    </span>
                                )}
                                {fundRequestStatus === 'success' && 'Solicitud Enviada ✓'}
                            </button>
                         </div>
                    </div>
                    
                    <div className="bg-secondary/50 p-6 rounded-xl border border-gray-700">
                        <div className="mb-4">
                            <label htmlFor="start" className="block text-sm font-medium text-gray-400 mb-1">Fecha de Inicio</label>
                            <input type="date" name="start" value={dates.start} onChange={handleDateChange} className="bg-gray-700 w-full p-2 rounded-md border border-gray-600 focus:ring-highlight focus:border-highlight"/>
                        </div>
                         <div className="mb-4">
                            <label htmlFor="rescheduled" className="block text-sm font-medium text-gray-400 mb-1">Fecha Reprogramada</label>
                            <input type="date" name="rescheduled" value={dates.rescheduled} onChange={handleDateChange} className="bg-gray-700 w-full p-2 rounded-md border border-gray-600 focus:ring-highlight focus:border-highlight"/>
                        </div>
                        <div>
                            <label htmlFor="contract-upload" className="w-full text-center block cursor-pointer bg-accent/20 text-accent text-sm font-semibold py-2 px-4 rounded-lg hover:bg-accent/40 transition-colors">
                                Subir Contrato (PDF)
                            </label>
                            <input id="contract-upload" type="file" className="hidden" accept=".pdf" onChange={handleContractUpload} />
                             {uploadedContract ? (
                                <div className="text-xs text-gray-400 mt-2 text-center flex items-center justify-center gap-2">
                                    <span className="truncate" title={uploadedContract.name}>{uploadedContract.name}</span>
                                    <button onClick={handleRemoveContract} className="text-red-400 hover:text-red-300 flex-shrink-0" title="Eliminar contrato subido">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500 mt-2 text-center truncate px-2">
                                    {project.contract ? 'Contrato original adjunto' : 'No hay contrato'}
                                </p>
                            )}
                        </div>
                         <button onClick={() => setContractModalOpen(true)} className="mt-4 bg-secondary hover:bg-gray-700 text-white w-full py-2 px-4 rounded-lg border border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={!canReviewContract}>
                            Revisar Contrato
                        </button>
                    </div>
                    
                    <div className="bg-secondary/50 p-6 rounded-xl border border-gray-700">
                         <h3 className="font-bold text-lg mb-3">Gráfico de Pagos</h3>
                         <PaymentChart project={project} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 bg-secondary/50 p-6 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-lg mb-4">Línea de Tiempo de Estimaciones</h3>
                    <div className="space-y-6">
                        {project.timeline.map((event, index) => (
                           <TimelineNode key={index} event={event} isLast={index === project.timeline.length - 1} />
                        ))}
                    </div>
                </div>

            </div>

             {isContractModalOpen && (
                <Modal isOpen={isContractModalOpen} onClose={() => setContractModalOpen(false)} title="Detalles del Contrato">
                   {uploadedContract ? (
                        <div className="text-gray-300">
                            <iframe
                                src={uploadedContract.dataUrl}
                                className="w-full h-[70vh] rounded border border-gray-600 bg-white"
                                title={`Contrato - ${uploadedContract.name}`}
                            >
                                <p>Tu navegador no soporta la previsualización de PDF.</p>
                            </iframe>
                        </div>
                    ) : (
                        <div className="text-gray-300 max-h-[60vh] overflow-y-auto pr-2">
                            <p className="whitespace-pre-wrap font-mono text-sm">{project.contract}</p>
                        </div>
                    )}
                </Modal>
            )}
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </main>
    );
};

export default ProjectDetailPage;