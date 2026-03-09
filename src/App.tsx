import React, { useState, useMemo } from 'react';
import { PropertyData } from './types';
import { calculateResults } from './utils/calculations';
import PropertyForm from './components/PropertyForm';
import ResultsDisplay from './components/ResultsDisplay';
import AIAdvisor from './components/AIAdvisor';
import ChatBot from './components/ChatBot';
import { Building2, Info } from 'lucide-react';

const INITIAL_DATA: PropertyData = {
  type: 'apartment',
  location: 'Paris',
  purchasePrice: 300000,
  currentValue: 450000,
  purchaseYear: 2015,
  surface: 45,
  condition: 'good',
  estimatedMonthlyRent: 1500,
  monthlyCharges: 150,
  annualTaxeFonciere: 800,
  remainingLoan: 120000,
  monthlyMortgage: 950,
  isPrimaryResidence: true,
};

export default function App() {
  const [propertyData, setPropertyData] = useState<PropertyData>(INITIAL_DATA);

  const results = useMemo(() => calculateResults(propertyData), [propertyData]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-bottom border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Immo<span className="text-indigo-600">Conseil</span> France
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>Vendre vs Louer</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Analyse IA</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Fiscalité 2024</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <PropertyForm data={propertyData} onChange={setPropertyData} />
            
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800 leading-relaxed">
                <p className="font-semibold mb-1">Note sur la fiscalité</p>
                Les calculs incluent une estimation de la plus-value immobilière et de l'impôt sur les revenus locatifs (régime micro). Pour une étude précise, consultez un notaire ou un expert-comptable.
              </div>
            </div>
          </div>

          {/* Right Column: Results & AI */}
          <div className="lg:col-span-8 space-y-8">
            <ResultsDisplay results={results} />
            <AIAdvisor data={propertyData} results={results} />
          </div>
        </div>
      </main>

      {/* ChatBot */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ImmoConseil France. Outil d'aide à la décision immobilière.
          </p>
        </div>
      </footer>
    </div>
  );
}
