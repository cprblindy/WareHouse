import React from 'react';
import { Truck, ClipboardList, ShoppingCart, Info, ArrowRight, Sparkles, X } from 'lucide-react';

interface IconProps {
    name: string;
    className?: string;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
    switch (name) {
        case 'truck': return <Truck className={className} size={size} />;
        case 'clipboard': return <ClipboardList className={className} size={size} />;
        case 'cart': return <ShoppingCart className={className} size={size} />;
        case 'info': return <Info className={className} size={size} />;
        case 'arrow': return <ArrowRight className={className} size={size} />;
        case 'sparkles': return <Sparkles className={className} size={size} />;
        case 'close': return <X className={className} size={size} />;
        default: return null;
    }
};