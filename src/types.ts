export interface PropertyData {
  type: 'house' | 'apartment';
  location: string;
  purchasePrice: number;
  currentValue: number;
  purchaseYear: number;
  surface: number;
  condition: 'new' | 'good' | 'needs_renovation' | 'major_renovation';
  
  // Rental info
  estimatedMonthlyRent: number;
  monthlyCharges: number;
  annualTaxeFonciere: number;
  
  // Mortgage info
  remainingLoan: number;
  monthlyMortgage: number;
  
  // Other
  isPrimaryResidence: boolean;
}

export interface CalculationResults {
  sell: {
    grossProfit: number;
    estimatedCapitalGainsTax: number;
    netProfit: number;
    returnOnInvestment: number;
  };
  rent: {
    grossYield: number;
    netYield: number;
    monthlyCashFlow: number;
    annualNetIncome: number;
    estimatedIncomeTax: number;
  };
}
