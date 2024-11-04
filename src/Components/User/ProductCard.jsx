/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineStop } from "react-icons/ai";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaAppStore } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import style from "../../assets/CSS/User/ProductCard.module.css";

export default function ProductCard({ product }) {
  // Determine if the product is unavailable
  const isUnavailable = product.quantity === 0;

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Link
      to={`/products/${product._id}`}
      className={`${style.Card} ${
        isUnavailable ? style.unavailable : ""
      }`}
      data-aos="fade-up"
    >
      <div className={style.image}>
        <img src={product.imgCover} alt="Product" />
      </div>
      <div className={style.details}>
        <div className={style.title}>{product.name}</div>
        <p className={style.brand}>
          {" "}
          <FaAppStore /> {product.brand}
        </p>
        <div className={style.price}>
          <p className={style.newPrice}>
            ${product.price - (product.price * product.discount) / 100}
          </p>
          <p className={style.oldPrice}>${product.price}</p>
          <p className={style.discount}>{product.discount}%</p>
        </div>
        {isUnavailable ? (
          <p className={style.unavailableText}>
            {" "}
            <AiOutlineStop /> out of stock
          </p>
        ) : (
          <p className={style.inStockText}>
            {" "}
            <VscVerifiedFilled /> in stock{" "}
          </p>
        )}
      </div>
    </Link>
  );
}
