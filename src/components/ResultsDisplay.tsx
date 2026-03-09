import React from 'react';
import { CalculationResults } from '../types';
import { TrendingUp, TrendingDown, Wallet, PieChart, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  results: CalculationResults;
}

export default function ResultsDisplay({ results }: Props) {
  const chartData = [
    { name: 'Vente (Net)', value: results.sell.netProfit, color: '#4f46e5' },
    { name: 'Location (Annuel Net)', value: results.rent.annualNetIncome, color: '#10b981' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sell Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-indigo-600" />
              Option : Vendre
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase">
              Gain Immédiat
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Profit Net Estimé</p>
              <p className="text-3xl font-bold text-slate-900">
                {results.sell.netProfit.toLocaleString()} €
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-xs text-slate-500">Plus-value brute</p>
                <p className="font-semibold text-slate-700">+{results.sell.grossProfit.toLocaleString()} €</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Impôts estimés</p>
                <p className="font-semibold text-red-500">-{results.sell.estimatedCapitalGainsTax.toLocaleString()} €</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rent Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              Option : Louer
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full uppercase">
              Revenu Passif
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Cash-flow Mensuel</p>
              <p className={`text-3xl font-bold ${results.rent.monthlyCashFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {results.rent.monthlyCashFlow.toFixed(2)} €
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-xs text-slate-500">Rendement Net</p>
                <p className="font-semibold text-slate-700">{results.rent.netYield.toFixed(2)} %</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Revenu Net Annuel</p>
                <p className="font-semibold text-slate-700">{results.rent.annualNetIncome.toLocaleString()} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Comparaison Financière</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Les calculs sont des estimations basées sur les données fournies et la fiscalité française simplifiée.
        </p>
      </div>
    </div>
  );
}
