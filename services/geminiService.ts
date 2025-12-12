import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate errors, though usage will be guarded.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateDetailedExplanation = async (topic: string, concept: string): Promise<string> => {
    if (!ai) {
        throw new Error("API Key is missing. Please configure the environment.");
    }

    try {
        const model = ai.models;
        const prompt = `
            Actúa como un experto en logística y gestión de inventarios.
            
            El usuario está viendo una infografía sobre: "${topic}".
            El concepto base es: "${concept}".
            
            Por favor, genera una explicación breve pero enriquecida (máximo 150 palabras) que incluya:
            1. Por qué es crítico este paso.
            2. Un ejemplo práctico de la vida real.
            3. Un "tip" o mejor práctica.

            Usa formato Markdown simple (negritas, listas) para facilitar la lectura.
            Responde en Español.
        `;

        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "No se pudo generar la explicación.";
    } catch (error) {
        console.error("Error connecting to Gemini:", error);
        throw new Error("Hubo un error al consultar a la IA. Inténtalo de nuevo.");
    }
};