import { useEffect, useState } from "react";
import Landing from "../../Components/User/Landing";
import { getAllProducts } from "../../APIs Connections/Shared/Products/getAllProducts";
import { getBigDeals } from "../../Functions/getBigDeals";
import { getNewArrivals } from "../../Functions/getNewArrivals";
import ProductsContainer from "../../Components/User/ProductsContainer";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [bigDeals, setBigDeals] = useState([]);

  const [newArrivals, setNewArrivals] = useState([]);

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
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const bigDealsProducts = getBigDeals(products, 5);
      setBigDeals(bigDealsProducts);
    }
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      const newArrivalProducts = getNewArrivals(products, 5);
      setNewArrivals(newArrivalProducts);
    }
  }, [products]);

  return (
    <>
      <Landing />
      <ProductsContainer title="Big Deals" products={bigDeals} />
      <ProductsContainer title="New Arrivals" products={newArrivals} />
    </>
  );
}
