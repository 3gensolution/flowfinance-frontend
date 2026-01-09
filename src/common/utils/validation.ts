/**
 * Validation utilities for loan and contract parameters
 */

interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate interest rate against maximum allowed
 */
export const validateInterestRate = (
  rate: bigint,
  maxRate: bigint
): ValidationResult => {
  if (rate > maxRate) {
    return {
      valid: false,
      error: `Interest rate cannot exceed ${maxRate.toString()}%`,
    };
  }
  if (rate <= BigInt(0)) {
    return {
      valid: false,
      error: "Interest rate must be greater than 0",
    };
  }
  return { valid: true };
};

/**
 * Validate loan duration
 */
export const validateLoanDuration = (
  duration: bigint,
  minDuration: bigint,
  maxDuration: bigint
): ValidationResult => {
  if (duration < minDuration) {
    return {
      valid: false,
      error: `Loan duration cannot be less than ${minDuration.toString()} days`,
    };
  }
  if (duration > maxDuration) {
    return {
      valid: false,
      error: `Loan duration cannot exceed ${maxDuration.toString()} days`,
    };
  }
  return { valid: true };
};

/**
 * Validate collateral ratio (LTV)
 */
export const validateCollateralRatio = (
  collateralValueUSD: bigint,
  loanValueUSD: bigint,
  minRatio: bigint
): ValidationResult => {
  if (collateralValueUSD === BigInt(0)) {
    return {
      valid: false,
      error: "Collateral value must be greater than 0",
    };
  }

  if (loanValueUSD === BigInt(0)) {
    return {
      valid: false,
      error: "Loan value must be greater than 0",
    };
  }

  // Calculate ratio: collateralValue / loanValue
  // Example: 2000 / 1000 = 2 (200% ratio means 50% LTV)
  const ratio = (collateralValueUSD * BigInt(100)) / loanValueUSD;

  if (ratio < minRatio) {
    const ltv = (BigInt(100) * loanValueUSD) / collateralValueUSD;
    return {
      valid: false,
      error: `Insufficient collateral. Minimum ratio required: ${minRatio.toString()}%, LTV: ${ltv.toString()}%`,
    };
  }

  return { valid: true };
};

/**
 * Validate health factor
 */
export const validateHealthFactor = (
  healthFactor: bigint,
  minHealthFactor: bigint = BigInt(15) // 1.5x in basis points
): ValidationResult => {
  if (healthFactor < minHealthFactor) {
    return {
      valid: false,
      error: `Health factor too low. Current: ${(Number(healthFactor) / 10).toFixed(2)}, Minimum: ${(Number(minHealthFactor) / 10).toFixed(2)}`,
    };
  }
  return { valid: true };
};

/**
 * Validate amount is positive
 */
export const validatePositiveAmount = (
  amount: bigint,
  fieldName: string = "Amount"
): ValidationResult => {
  if (amount <= BigInt(0)) {
    return {
      valid: false,
      error: `${fieldName} must be greater than 0`,
    };
  }
  return { valid: true };
};

/**
 * Validate Ethereum address format
 */
export const validateEthereumAddress = (address: string): ValidationResult => {
  if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
    return {
      valid: false,
      error: "Invalid Ethereum address format",
    };
  }
  return { valid: true };
};

/**
 * Validate APY calculation
 */
export const validateAPY = (
  annualRate: bigint,
  duration: bigint
): bigint => {
  // APY = (annualRate * duration / 365)
  return (annualRate * duration) / BigInt(365);
};

/**
 * Validate repayment amount includes interest
 */
export const calculateRepaymentWithInterest = (
  principal: bigint,
  annualRate: bigint,
  duration: bigint
): bigint => {
  // Repayment = Principal + (Principal * Rate * Duration / 365 / 100)
  const interest = (principal * annualRate * duration) / (BigInt(365) * BigInt(100));
  return principal + interest;
};

/**
 * Validate collateral is sufficient for borrowing
 */
export const validateSufficientCollateral = (
  collateralValueUSD: bigint,
  loanValueUSD: bigint,
  minCollateralRatio: bigint
): ValidationResult => {
  if (collateralValueUSD === BigInt(0)) {
    return {
      valid: false,
      error: "Collateral value must be greater than 0",
    };
  }

  // minCollateralRatio is stored as basis points or percentage
  // Example: 150 means 150% = 1.5x
  const requiredCollateral = (loanValueUSD * minCollateralRatio) / BigInt(100);

  if (collateralValueUSD < requiredCollateral) {
    return {
      valid: false,
      error: `Insufficient collateral. Required: ${requiredCollateral.toString()}, Available: ${collateralValueUSD.toString()}`,
    };
  }

  return { valid: true };
};

/**
 * Validate supplier has minimum stake
 */
export const validateSupplierStake = (
  supplierStake: bigint,
  minimumStake: bigint
): ValidationResult => {
  if (supplierStake < minimumStake) {
    return {
      valid: false,
      error: `Supplier stake is below minimum. Required: ${minimumStake.toString()}, Current: ${supplierStake.toString()}`,
    };
  }
  return { valid: true };
};

/**
 * Validate supplier is eligible for operations
 */
export const validateSupplierEligibility = (
  isVerified: boolean,
  isActive: boolean,
  hasMinimumStake: boolean
): ValidationResult => {
  if (!isVerified) {
    return {
      valid: false,
      error: "Supplier is not KYC verified",
    };
  }
  if (!isActive) {
    return {
      valid: false,
      error: "Supplier account is not active",
    };
  }
  if (!hasMinimumStake) {
    return {
      valid: false,
      error: "Supplier does not have minimum required stake",
    };
  }
  return { valid: true };
};

/**
 * Validate fiat currency is supported
 */
export const validateFiatCurrency = (
  currency: string,
  supportedCurrencies: string[] = ["USD", "EUR", "GBP"]
): ValidationResult => {
  if (!supportedCurrencies.includes(currency.toUpperCase())) {
    return {
      valid: false,
      error: `Currency ${currency} is not supported. Supported: ${supportedCurrencies.join(", ")}`,
    };
  }
  return { valid: true };
};

/**
 * Comprehensive loan validation
 */
export const validateLoanCreation = (params: {
  collateralValueUSD: bigint;
  loanValueUSD: bigint;
  interestRate: bigint;
  duration: bigint;
  minCollateralRatio: bigint;
  maxInterestRate: bigint;
  minDuration: bigint;
  maxDuration: bigint;
}): ValidationResult => {
  // Validate interest rate
  const rateValidation = validateInterestRate(params.interestRate, params.maxInterestRate);
  if (!rateValidation.valid) return rateValidation;

  // Validate duration
  const durationValidation = validateLoanDuration(
    params.duration,
    params.minDuration,
    params.maxDuration
  );
  if (!durationValidation.valid) return durationValidation;

  // Validate collateral ratio
  const ratioValidation = validateCollateralRatio(
    params.collateralValueUSD,
    params.loanValueUSD,
    params.minCollateralRatio
  );
  if (!ratioValidation.valid) return ratioValidation;

  return { valid: true };
};

/**
 * Format number for display with decimals
 */
export const formatAmount = (amount: bigint, decimals: number = 18): string => {
  const divisor = BigInt(10) ** BigInt(decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;

  if (fractionalPart === BigInt(0)) {
    return integerPart.toString();
  }

  const fractionalStr = fractionalPart.toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${integerPart}.${fractionalStr}`;
};

/**
 * Parse amount from display format to bigint
 */
export const parseAmount = (amount: string, decimals: number = 18): bigint => {
  const parts = amount.split(".");
  const integerPart = BigInt(parts[0] || "0");
  const fractionalPart = BigInt((parts[1] || "0").padEnd(decimals, "0").slice(0, decimals));

  return integerPart * (BigInt(10) ** BigInt(decimals)) + fractionalPart;
};
