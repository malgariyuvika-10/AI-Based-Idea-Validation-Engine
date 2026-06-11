/**
 * Calculates overall startup validation score
 */

export const calculateValidationScore = ({
  marketPotential = 0,
  competitionLevel = 0,
  innovationScore = 0,
  scalabilityScore = 0,
  feasibilityScore = 0,
}) => {
  const score =
    marketPotential * 0.25 +
    competitionLevel * 0.15 +
    innovationScore * 0.20 +
    scalabilityScore * 0.20 +
    feasibilityScore * 0.20;

  return Math.round(score);
};

export const getScoreCategory = (score) => {
  if (score >= 80) {
    return {
      label: "Excellent",
      color: "green",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      color: "blue",
    };
  }

  if (score >= 40) {
    return {
      label: "Average",
      color: "yellow",
    };
  }

  return {
    label: "Poor",
    color: "red",
  };
};

export const calculateRiskScore = ({
  marketRisk = 0,
  financialRisk = 0,
  technicalRisk = 0,
}) => {
  const risk =
    (marketRisk +
      financialRisk +
      technicalRisk) / 3;

  return Math.round(risk);
};

export const getRiskLevel = (riskScore) => {
  if (riskScore <= 30) return "Low";
  if (riskScore <= 70) return "Medium";
  return "High";
};