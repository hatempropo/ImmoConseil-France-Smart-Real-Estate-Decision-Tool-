import React from 'react';
import { PropertyData } from '../types';
import { Home, MapPin, Euro, Calendar, Maximize, Wrench, CreditCard, User } from 'lucide-react';
import { MAJOR_FRENCH_CITIES } from '../constants';

interface Props {
  data: PropertyData;
  onChange: (data: PropertyData) => void;
}

export default function PropertyForm({ data, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    const checked = (e.target as HTMLInputElement).checked;
    
    onChange({
      ...data,
      [name]: type === 'checkbox' ? checked : val
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
        <Home className="w-5 h-5 text-indigo-600" />
        Détails du bien
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Localisation (Ville)
          </label>
          <input
            list="cities"
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="ex: Paris, Lyon, Bordeaux..."
          />
          <datalist id="cities">
            {MAJOR_FRENCH_CITIES.map(city => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Maximize className="w-4 h-4" /> Surface (m²)
          </label>
          <input
            type="number"
            name="surface"
            value={data.surface}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Euro className="w-4 h-4" /> Prix d'achat
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={data.purchasePrice}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Euro className="w-4 h-4" /> Valeur actuelle estimée
          </label>
          <input
            type="number"
            name="currentValue"
            value={data.currentValue}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Année d'achat
          </label>
          <input
            type="number"
            name="purchaseYear"
            value={data.purchaseYear}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Loyer mensuel estimé
          </label>
          <input
            type="number"
            name="estimatedMonthlyRent"
            value={data.estimatedMonthlyRent}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Charges & Crédit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Charges mensuelles</label>
            <input
              type="number"
              name="monthlyCharges"
              value={data.monthlyCharges}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Taxe Foncière annuelle</label>
            <input
              type="number"
              name="annualTaxeFonciere"
              value={data.annualTaxeFonciere}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Mensualité crédit</label>
            <input
              type="number"
              name="monthlyMortgage"
              value={data.monthlyMortgage}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Capital restant dû</label>
            <input
              type="number"
              name="remainingLoan"
              value={data.remainingLoan}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="isPrimaryResidence"
            checked={data.isPrimaryResidence}
            onChange={handleChange}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
            Résidence principale (Exonération plus-value)
          </span>
        </label>
      </div>
    </div>
  );
}
