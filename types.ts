export interface InfographicStep {
    id: 'reception' | 'kardex' | 'purchase';
    title: string;
    shortDescription: string;
    icon: string;
    color: string;
    gradient: string;
    concept: string; // The core concept requested
}

export interface AIResponse {
    text: string;
    loading: boolean;
    error: string | null;
}