import { useEffect, useState } from "react";
import style from "../../assets/CSS/User/BigDeals.module.css";
import Heading from "./Heading";
import { getAllProducts } from "./../../APIs Connections/Shared/Products/getAllProducts";
import { getBigDeals } from "../../Functions/getBigDeals";
import ProductCard from "./../User/ProductCard";

export default function BigDeals() {
  const [products, setProducts] = useState([]);
  const [bigDeals, setBigDeals] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const bigDealsProducts = getBigDeals(products, 5);
      setBigDeals(bigDealsProducts);
      console.log("Big Deals Products:", bigDealsProducts);
    }
  }, [products]);

  return (
    <div className={style.bigDeals}>
      <div className="container">
        <div className="content">
          <Heading title="Big Deals" />
          {bigDeals.length > 0 ? (
            <div className="cardsContainer">
              {bigDeals.map((deal, index) => (
                <ProductCard key={index} product={deal} />
              ))}
            </div>
          ) : (
            <p>No big deals available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
