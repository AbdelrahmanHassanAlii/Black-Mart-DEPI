import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { getAllProducts } from "../../../APIs Connections/Shared/Products/getAllProducts";
import ProductCard from "./ProductCard";

export default function ProductsContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData);
    };
    getProducts();
  }, [products]);
  return (
    <div className="contentContainer">
      <div className="heading">
        <p className="title">Products</p>
        <Link className="add-btn" to={`/admin/products/add`}>
          Add Product
          <RiAddLine />
        </Link>
      </div>
      <div className="cardsContainer">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
