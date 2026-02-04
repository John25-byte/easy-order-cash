/**
 * Currency formatting utilities for Kenyan Shillings
 */

export function formatPrice(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1000) {
    return `KSh ${(amount / 1000).toFixed(1)}k`;
  }
  return formatPrice(amount);
}
