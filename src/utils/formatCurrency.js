/**
 * Utilitas format mata uang Rupiah.
 */

export function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return 'Tanyakan harga';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
