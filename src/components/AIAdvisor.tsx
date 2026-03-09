import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { PropertyData, CalculationResults } from '../types';
import { getAIRecommendation } from '../services/aiService';
import { Sparkles, Loader2, MessageSquare } from 'lucide-react';

interface Props {
  data: PropertyData;
  results: CalculationResults;
}

export default function AIAdvisor({ data, results }: Props) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const recommendation = await getAIRecommendation(data, results);
    setAdvice(recommendation);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full -ml-32 -mb-32 opacity-30 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/30 rounded-lg">
            <Sparkles className="w-6 h-6 text-indigo-200" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Conseiller IA Immo</h2>
            <p className="text-indigo-200 text-sm">Analyse personnalisée du marché français</p>
          </div>
        </div>

        {!advice && !loading && (
          <div className="space-y-4">
            <p className="text-indigo-100 max-w-xl">
              Obtenez une recommandation stratégique basée sur votre situation financière, 
              les tendances actuelles du marché à {data.location || 'votre ville'} et la fiscalité immobilière.
            </p>
            <button
              onClick={handleGetAdvice}
              className="px-6 py-3 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Générer mon analyse
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-300" />
            <p className="text-indigo-200 animate-pulse">Analyse des données et du marché en cours...</p>
          </div>
        )}

        {advice && !loading && (
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-indigo-100 prose-strong:text-white">
            <Markdown>{advice}</Markdown>
            <button
              onClick={() => setAdvice(null)}
              className="mt-8 text-sm text-indigo-300 hover:text-white transition-colors flex items-center gap-1"
            >
              Recommencer l'analyse
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
