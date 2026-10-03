export const formatCurrency = (amount) => {
  if (typeof amount === 'string') {
    return amount.replace(/^\$/, '₹');
  }
  if (typeof amount !== 'number') return `₹${amount}`;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatINR = formatCurrency;
