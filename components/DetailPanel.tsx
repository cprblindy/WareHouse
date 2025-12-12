import React, { useState, useEffect } from 'react';
import { InfographicStep, AIResponse } from '../types';
import { generateDetailedExplanation } from '../services/geminiService';
import { Icon } from './Icon';
import ReactMarkdown from 'react-markdown';

interface DetailPanelProps {
    step: InfographicStep;
    onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ step, onClose }) => {
    const [aiContent, setAiContent] = useState<AIResponse>({
        text: '',
        loading: false,
        error: null
    });

    // Reset AI content when step changes
    useEffect(() => {
        setAiContent({ text: '', loading: false, error: null });
    }, [step]);

    const handleAskAI = async () => {
        setAiContent(prev => ({ ...prev, loading: true, error: null }));
        try {
            const explanation = await generateDetailedExplanation(step.title, step.concept);
            setAiContent({ text: explanation, loading: false, error: null });
        } catch (err: any) {
            setAiContent({ 
                text: '', 
                loading: false, 
                error: err.message || 'Error desconocido' 
            });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row animate-fadeIn">
            {/* Left/Top: Static Concept */}
            <div className={`p-8 md:w-1/2 flex flex-col justify-center relative bg-gradient-to-br ${step.gradient.replace('bg-gradient-to-br', '')} from-opacity-10 to-opacity-5`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
                
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg bg-white shadow-sm text-${step.color}-600`}>
                        <Icon name={step.icon} size={24} className={`text-${step.color}-600`} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{step.title}</h2>
                </div>
                
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Concepto Principal</h4>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    {step.concept}
                </p>
            </div>

            {/* Right/Bottom: AI Expansion */}
            <div className="p-8 md:w-1/2 bg-slate-50 relative flex flex-col">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                    <Icon name="close" size={24} />
                </button>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-500 flex items-center gap-2">
                            <Icon name="sparkles" size={14} />
                            Análisis Inteligente (Gemini)
                        </h4>
                    </div>

                    {!aiContent.text && !aiContent.loading && (
                        <div className="h-full flex flex-col items-center justify-center text-center py-6">
                            <p className="text-slate-400 text-sm mb-4">
                                ¿Quieres profundizar más en {step.title}? <br/>
                                Descubre ejemplos prácticos y tips de expertos.
                            </p>
                            <button 
                                onClick={handleAskAI}
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg"
                            >
                                <Icon name="sparkles" className="mr-2" size={16} />
                                Generar Explicación
                            </button>
                        </div>
                    )}

                    {aiContent.loading && (
                        <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
                            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-slate-500 text-sm animate-pulse">Consultando a Gemini...</p>
                        </div>
                    )}

                    {aiContent.error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                            {aiContent.error}
                        </div>
                    )}

                    {aiContent.text && (
                        <div className="prose prose-sm prose-indigo text-slate-600 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                            <ReactMarkdown>{aiContent.text}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};