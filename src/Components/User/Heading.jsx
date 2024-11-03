/* eslint-disable react/prop-types */
import style from "../../assets/CSS/User/Heading.module.css";
export default function Heading({ title }) {
  return (
    <div className={style.heading}>
      <p>{title}</p>
    </div>
  );
}
