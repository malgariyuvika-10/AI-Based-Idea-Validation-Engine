export const APP_NAME = "Startup Idea Validator";

export const API_ENDPOINTS = {
  IDEAS: "/ideas",
  VALIDATION: "/validation",
  REPORTS: "/reports",
};

export const SCORE_LEVELS = {
  EXCELLENT: {
    min: 80,
    label: "Excellent",
    color: "green",
  },
  GOOD: {
    min: 60,
    label: "Good",
    color: "blue",
  },
  AVERAGE: {
    min: 40,
    label: "Average",
    color: "yellow",
  },
  POOR: {
    min: 0,
    label: "Poor",
    color: "red",
  },
};

export const RISK_LEVELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export const REPORT_FORMATS = [
  "PDF",
  "DOCX",
  "JSON",
];

export const MARKET_SEGMENTS = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "E-Commerce",
  "Agriculture",
  "Entertainment",
];

export const VALIDATION_STATUS = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  FAILED: "Failed",
};