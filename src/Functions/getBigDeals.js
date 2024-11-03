export const getBigDeals=(products, count) => {
  return products
    .filter((product) => product.discount > 0) 
    .sort((a, b) => b.discount - a.discount) 
    .slice(0, count);
}
