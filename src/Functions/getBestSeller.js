export const getBestSeller = (products, count) => {
  return products
    .sort((a, b) => b.sold - a.sold) 
    .slice(0, count); 
};
