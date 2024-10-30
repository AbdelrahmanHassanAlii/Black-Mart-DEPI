import { Link } from "react-router-dom";
import style from "../../assets/CSS/User/SignHeader.module.css";
import { PiSignInBold } from "react-icons/pi";

export default function SignHeader() {
  return (
    <div className={style.signHeader}>
      <div className={style.title}>Sign and Start Your Journey.</div>
      <Link to="/login" className={style.btn}>
        Sign Now
        <PiSignInBold />
      </Link>

    </div>
  );
}
