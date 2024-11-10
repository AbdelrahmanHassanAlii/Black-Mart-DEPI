import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../APIs Connections/Shared/Products/getAllProducts";
import ProductCard from "./ProductCard";

export default function SpecificProducts() {
  const { subcategoryID } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      console.log(ProductsData);
      const filteredData = ProductsData.filter((product) => {
        return product.subCategory._id === subcategoryID;
      });
      setProducts(filteredData);
    };
    getProducts();
  }, []);

  return (
    <div style={{ margin: "100px 0" }}>
      <div className="container">
        {products.length > 0 ? (
          <div className="cardsContainer">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found for this subcategory</p>
        )}
      </div>
    </div>
  );
}
