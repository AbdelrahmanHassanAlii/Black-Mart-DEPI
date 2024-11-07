import { useEffect, useState } from "react";
import { getAllProducts } from "../../APIs Connections/Shared/Products/getAllProducts";
import ProductsContainerUser from "../../Components/User/ProductsContainerUser";
import { getItemFromLS } from "../../Functions/getItemFromLS";
import { searchByName } from "../../Functions/SearchByName";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState([]);

  const [firlteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData);
    };
    getProducts();
  });

  useEffect(() => {
    const storedSearchTerm = getItemFromLS("searchTerm")[0];

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    } else {
      setSearchTerm("");
    }
  });

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = searchByName(products, searchTerm);
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <div style={{ padding: "50px 0" }}>
      <ProductsContainerUser title="" products={firlteredProducts} />
    </div>
  );
}
