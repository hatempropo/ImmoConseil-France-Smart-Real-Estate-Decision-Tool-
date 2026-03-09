import { PropertyData, CalculationResults } from '../types';

export function calculateResults(data: PropertyData): CalculationResults {
  // 1. SELL CALCULATIONS
  const grossProfit = data.currentValue - data.purchasePrice;
  
  // Simplified French Capital Gains Tax (Plus-value immobilière)
  // Note: Primary residence is exempt in France
  let estimatedCapitalGainsTax = 0;
  if (!data.isPrimaryResidence) {
    const yearsOwned = new Date().getFullYear() - data.purchaseYear;
    
    // Very simplified abatement rules (abattements pour durée de détention)
    // Real rules are complex (19% tax + 17.2% social charges with different abatement scales)
    if (yearsOwned < 22) {
      // Rough estimate: 30% of profit if owned for a short time, decreasing
      const taxRate = Math.max(0, 0.34 * (1 - yearsOwned / 30));
      estimatedCapitalGainsTax = grossProfit > 0 ? grossProfit * taxRate : 0;
    }
  }

  const netProfit = data.currentValue - data.remainingLoan - estimatedCapitalGainsTax;
  const roi = (netProfit / data.purchasePrice) * 100;

  // 2. RENT CALCULATIONS
  const annualGrossRent = data.estimatedMonthlyRent * 12;
  const annualCharges = data.monthlyCharges * 12;
  const annualMortgage = data.monthlyMortgage * 12;
  
  const grossYield = (annualGrossRent / data.currentValue) * 100;
  
  // Net yield (after charges and property tax)
  const netIncomeBeforeTax = annualGrossRent - annualCharges - data.annualTaxeFonciere;
  const netYield = (netIncomeBeforeTax / data.currentValue) * 100;
  
  // Monthly Cash Flow (after mortgage)
  const monthlyCashFlow = data.estimatedMonthlyRent - data.monthlyCharges - (data.annualTaxeFonciere / 12) - data.monthlyMortgage;
  
  // Estimated Income Tax on Rental (Simplified "Micro-Foncier" or "Micro-BIC")
  // 30% or 50% abatement depending on regime. Let's assume 30% abatement and 20% average tax + 17.2% social charges
  const taxableIncome = netIncomeBeforeTax * 0.7; // 30% abatement
  const estimatedIncomeTax = taxableIncome * 0.372; // 20% tax + 17.2% social charges

  return {
    sell: {
      grossProfit,
      estimatedCapitalGainsTax,
      netProfit,
      returnOnInvestment: roi
    },
    rent: {
      grossYield,
      netYield,
      monthlyCashFlow,
      annualNetIncome: netIncomeBeforeTax - estimatedIncomeTax,
      estimatedIncomeTax
    }
  };
}
