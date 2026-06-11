export const capitalize = (text = "") => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateText = (text = "", length = 100) => {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const generateId = () => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const getRiskColor = (riskLevel) => {
  switch (riskLevel?.toLowerCase()) {
    case "low":
      return "text-green-600";

    case "medium":
      return "text-yellow-600";

    case "high":
      return "text-red-600";

    default:
      return "text-gray-600";
  }
};