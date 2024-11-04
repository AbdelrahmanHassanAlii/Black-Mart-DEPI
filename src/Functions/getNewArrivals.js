export const getNewArrivals = (products, count) => {
  return products
    .filter((product) => product.quantity > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, count);
};
