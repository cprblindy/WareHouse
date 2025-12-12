import { InfographicStep } from './types';

export const STEPS: InfographicStep[] = [
    {
        id: 'reception',
        title: 'Recepción y Almacenamiento',
        shortDescription: 'El punto de entrada. Verificación física y documental de los bienes.',
        icon: 'truck',
        color: 'emerald',
        gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
        concept: 'Proceso logístico que consiste en recibir las mercancías, verificar su cantidad y calidad frente a las órdenes de compra, y ubicarlas estratégicamente en el almacén para asegurar su preservación y fácil acceso.'
    },
    {
        id: 'kardex',
        title: 'Control Kardex',
        shortDescription: 'El corazón del inventario. Registro detallado de movimientos.',
        icon: 'clipboard',
        color: 'blue',
        gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
        concept: 'Sistema de registro organizado (físico o digital) que rastrea las entradas, salidas y saldos de existencias en tiempo real, permitiendo la valoración del inventario (PEPS, UEPS, Promedio) y el control contable.'
    },
    {
        id: 'purchase',
        title: 'Solicitud de Compras',
        shortDescription: 'Reposición estratégica. Activación del ciclo de abastecimiento.',
        icon: 'cart',
        color: 'amber',
        gradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
        concept: 'Documento formal o proceso digital generado cuando el stock alcanza su punto de reorden (mínimo), autorizando al departamento de compras a adquirir nuevos materiales para evitar roturas de stock.'
    }
];