/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Landing from "../../Components/User/Landing";
import { getAllProducts } from "../../APIs Connections/Shared/Products/getAllProducts";
import { getBigDeals } from "../../Functions/getBigDeals";
import { getNewArrivals } from "../../Functions/getNewArrivals";
import ProductsContainer from "../../Components/User/ProductsContainer";
import { getBestSeller } from "../../Functions/getBestSeller";
import { getItemFromLS } from "../../Functions/getItemFromLS";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [bigDeals, setBigDeals] = useState([]);

  const [newArrivals, setNewArrivals] = useState([]);

  const [bestSellers, setBestSellers] = useState([]);

  const [searchTerm, setSearchTerm] = useState([]);

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

  useEffect(() => {
    if (products.length > 0) {
      const bestSellersProducts = getBestSeller(products, 5);
      setBestSellers(bestSellersProducts);
    }
  }, [products]);

  useEffect(() => {
    const storedSearchTerm = getItemFromLS("searchTerm")[0];

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    } else {
      setSearchTerm("");
    }
  });

  return (
    <>
      <Landing />
      {
        searchTerm && (
          <ProductsContainer title={`Search Results for "${searchTerm}"`} products={products} />
        )
      }
      <ProductsContainer title="Big Deals" products={bigDeals} />
      <ProductsContainer title="New Arrivals" products={newArrivals} />
      <ProductsContainer title="Best Sellers" products={bestSellers} />
    </>
  );
}
