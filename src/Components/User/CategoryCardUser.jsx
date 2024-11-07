/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/User/ProductCard.module.css";
export default function CategoryCardUser({ category }) {
  return (
    <Link to={`/category/${category._id}/subcategories`} className={style.Card}>
      <div className={style.image}>
        <img src={category.img} alt={category.name} />
      </div>
      <div className={style.details}>
        <p className={style.title}>{category.name}</p>
      </div>
    </Link>
  );
}
