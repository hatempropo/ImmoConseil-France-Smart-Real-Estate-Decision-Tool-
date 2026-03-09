import { GoogleGenAI } from "@google/genai";
import { PropertyData, CalculationResults } from "../types";

export async function getAIRecommendation(data: PropertyData, results: CalculationResults) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const prompt = `
    En tant qu'expert immobilier en France, analyse les données suivantes pour conseiller le propriétaire :
    
    PROPRIÉTÉ :
    - Type : ${data.type === 'house' ? 'Maison' : 'Appartement'}
    - Localisation : ${data.location}
    - Valeur actuelle : ${data.currentValue.toLocaleString()} €
    - Prix d'achat : ${data.purchasePrice.toLocaleString()} € (${data.purchaseYear})
    - Surface : ${data.surface} m²
    - État : ${data.condition}
    - Résidence principale : ${data.isPrimaryResidence ? 'Oui' : 'Non'}
    
    RÉSULTATS CALCULÉS :
    - VENTE : Profit net estimé de ${results.sell.netProfit.toLocaleString()} € (après impôts : ${results.sell.estimatedCapitalGainsTax.toLocaleString()} €)
    - LOCATION : Rendement net de ${results.rent.netYield.toFixed(2)}%, Cash-flow mensuel de ${results.rent.monthlyCashFlow.toFixed(2)} €
    
    CONSIGNE :
    1. Analyse si le marché local (${data.location}) est plutôt porteur pour la vente ou la location.
    2. Compare la rentabilité à long terme vs le gain immédiat.
    3. Prends en compte la fiscalité française (plus-value, prélèvements sociaux).
    4. Donne une recommandation claire : Vendre ou Louer ?
    5. Ajoute des conseils sur d'éventuels travaux ou optimisations fiscales (LMNP, Pinel, etc. si applicable).
    
    Réponds en Markdown, de manière professionnelle et structurée.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Désolé, je n'ai pas pu générer de recommandation pour le moment.";
  }
}
