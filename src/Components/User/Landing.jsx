import style from "../../assets/CSS/User/Landing.module.css";
import { Link } from "react-router-dom";
import { getItemFromLS } from "../../Functions/getItemFromLS";
export default function Landing() {
  const loginData = getItemFromLS("loginData");

  return (
    <div className={style.landing}>
      <div className="container">
        <div className={style.content}>
          <div className={style.text}>
            <p className={style.heading}>Welcome to Black Mart</p>
            <p>Find All That You Need</p>
            <p className={style.description}>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            {loginData.length === 0 ? (
              <Link to="/login" className={style.button}>
                Get Started
              </Link>
            ) : null}

            <div className={style.achivements}>
              <div className={style.achivement}>
                <p className={style.number}>1000+</p>
                <p className={style.text}>International Brands</p>
              </div>
              <div className={style.achivement}>
                <p className={style.number}>2000+</p>
                <p className={style.text}>High Quality Products</p>
              </div>
              <div className={style.achivement}>
                <p className={style.number}>100+</p>
                <p className={style.text}>Happy Customers</p>
              </div>
            </div>
          </div>
          <div className={style.images}>
            <img
              src="https://i.imgur.com/6zUKGR1.png"
              className={style.star_1}
              alt="landing image"
            />
            <img
              src="https://i.imgur.com/Bd8y50V.png"
              className={style.image}
              alt="landing image"
            />
            <img
              src="https://i.imgur.com/6zUKGR1.png"
              className={style.star_2}
              alt="landing image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
