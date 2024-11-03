/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/User/ProductCard.module.css";
import { AiOutlineStop } from "react-icons/ai";
import { VscVerifiedFilled } from "react-icons/vsc";



export default function ProductCard({ product }) {
  // Determine if the product is unavailable
  const isUnavailable = product.quantity === 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className={`${style.productCard} ${
        isUnavailable ? style.unavailable : ""
      }`}
    >
      <div className={style.image}>
        <img src={product.imgCover} alt="Product" />
      </div>
      <div className={style.details}>
        <div className={style.title}>{product.name}</div>
        <div className={style.price}>
          <p className={style.newPrice}>
            ${product.price - (product.price * product.discount) / 100}
          </p>
          <p className={style.oldPrice}>${product.price}</p>
          <p className={style.discount}>{product.discount}%</p>
        </div>
        {isUnavailable ? (
          <p className={style.unavailableText}> <AiOutlineStop /> out of stock</p>
        ) : (
          <p className={style.inStockText}> < VscVerifiedFilled /> in stock </p>
        )}
      </div>
    </Link>
  );
}
