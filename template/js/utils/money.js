// money calculate from cents to dollars
export function formatCurrency(priceCents, quantity){
  const price = ((priceCents / 100) * quantity).toFixed(2);
  return price;
}