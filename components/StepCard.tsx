import React from 'react';
import { InfographicStep } from '../types';
import { Icon } from './Icon';

interface StepCardProps {
    step: InfographicStep;
    isActive: boolean;
    onClick: (id: InfographicStep['id']) => void;
    index: number;
}

export const StepCard: React.FC<StepCardProps> = ({ step, isActive, onClick, index }) => {
    return (
        <div 
            onClick={() => onClick(step.id)}
            className={`
                relative flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all duration-500 border-2
                ${isActive 
                    ? `border-transparent shadow-2xl scale-105 bg-white` 
                    : `border-slate-200 bg-white/50 hover:bg-white hover:shadow-lg hover:border-${step.color}-300 hover:scale-102`
                }
            `}
            style={{
                zIndex: isActive ? 20 : 10
            }}
        >
            {/* Number Indicator */}
            <div className={`
                absolute -top-4 -left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md
                transition-colors duration-300
                ${isActive ? step.gradient : 'bg-slate-400'}
            `}>
                {index + 1}
            </div>

            {/* Icon Container */}
            <div className={`
                w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300
                ${isActive ? `${step.gradient} text-white shadow-lg rotate-3` : 'bg-slate-100 text-slate-400'}
            `}>
                <Icon name={step.icon} size={36} />
            </div>

            <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                {step.title}
            </h3>
            
            <p className="text-center text-sm text-slate-500 leading-relaxed">
                {step.shortDescription}
            </p>

            {/* Active Indicator Line */}
            {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 rounded-b-2xl ${step.gradient}`} />
            )}
        </div>
    );
};