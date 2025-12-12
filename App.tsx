import React, { useState } from 'react';
import { STEPS } from './constants';
import { InfographicStep } from './types';
import { StepCard } from './components/StepCard';
import { DetailPanel } from './components/DetailPanel';
import { Icon } from './components/Icon';

const App: React.FC = () => {
    const [activeStepId, setActiveStepId] = useState<InfographicStep['id'] | null>(null);

    const activeStep = STEPS.find(s => s.id === activeStepId);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-800">
            
            {/* Header / Hero */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Ciclo de Gestión de <span className="text-indigo-600">Inventarios</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-500">
                            Una infografía interactiva para visualizar el flujo de materiales. 
                            Haz clic en cada etapa para ver su concepto y detalles.
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Visual Flow Container */}
                <div className="relative mb-16">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full -z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                        {STEPS.map((step, index) => (
                            <div key={step.id} className="relative group">
                                <StepCard 
                                    step={step} 
                                    index={index}
                                    isActive={activeStepId === step.id}
                                    onClick={setActiveStepId}
                                />
                                
                                {/* Mobile connector arrows (between items, but not after last) */}
                                {index < STEPS.length - 1 && (
                                    <div className="md:hidden flex justify-center py-4 text-slate-300">
                                        <Icon name="arrow" size={24} className="rotate-90" />
                                    </div>
                                )}
                                
                                {/* Desktop Arrows on the line */}
                                {index < STEPS.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 -translate-y-1/2 text-slate-300 z-0">
                                        <Icon name="arrow" size={32} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail Panel Area */}
                <div className={`transition-all duration-700 ease-in-out ${activeStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                    {activeStep ? (
                        <DetailPanel 
                            step={activeStep} 
                            onClose={() => setActiveStepId(null)} 
                        />
                    ) : (
                        // Placeholder to keep layout consistent or empty space
                        <div className="h-0" />
                    )}
                </div>

                {/* Initial Call to Action if nothing selected */}
                {!activeStep && (
                    <div className="text-center mt-12 animate-pulse">
                        <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                            <Icon name="info" size={16} className="mr-2" />
                            Selecciona una tarjeta arriba para comenzar
                        </span>
                    </div>
                )}

            </main>

            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <p className="text-slate-400 text-sm">
                        &copy; {new Date().getFullYear()} Inventory Flow System
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>Powered by React & Gemini</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;