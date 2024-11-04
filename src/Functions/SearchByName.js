export const searchByName = (products, name) => {
  const searchTerm = typeof name === "string" ? name.trim().toLowerCase() : "";

  if (!searchTerm) {
    return products;
  }

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
};
