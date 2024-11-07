import { Link } from "react-router-dom";
import style from "../../assets/CSS/User/Header.module.css";
import { getItemFromLS } from "../../Functions/getItemFromLS";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { TbCategory2 } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { PiSignInBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import { deleteItemFromLS } from "../../Functions/deleteItemFromLS";
import Swal from "sweetalert2";
import { addItemToLS } from "./../../Functions/addItemToLS";

export default function Header() {
  let loginData = getItemFromLS("loginData");

  const [searchTerm, setSearchTerm] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemFromLS("loginData");
        window.location.reload();
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    addItemToLS("searchTerm", e.target.value);
    e.target.value === "" ? deleteItemFromLS("searchTerm") : null;
  };

  useEffect(() => {
    let term = getItemFromLS("searchTerm");
    if (term.length > 0) {
      setSearchTerm(term[0]);
    }
  }, []);

  return (
    <div className={style.header}>
      <div className="container">
        <div className={style.headerContent}>
          <div className={style.title}>Black Mart</div>
          <div className={style.links}>
            <ul>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/subcategories">Subcategories</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
            </ul>
          </div>
          <div className={style.searchArea}>
            <FaSearch className={style.searchIcon} />
            <input
              type="text"
              placeholder="Search for products, subcategories and categories"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
          {loginData.length !== 0 ? (
            <div className={style.userArea}>
              <Link to="/profile">
                <CgProfile className={style.userIcon} />
              </Link>
              <Link to="/cart">
                <FaCartShopping className={style.cartIcon} />
              </Link>
              <Link to="" onClick={logOut}>
                <TbLogout2 className={style.logoutIcon} />
              </Link>
            </div>
          ) : (
            <div className={style.login}>
              <Link to="/login">Sign Now</Link>
            </div>
          )}

          <div className={style.menuIcon}>
            {isMenuOpen ? (
              <FaBarsStaggered onClick={toggleMenu} />
            ) : (
              <FaBars onClick={toggleMenu} />
            )}
          </div>

          <div className={`${style.menu} ${isMenuOpen ? style.open : ""}`}>
            <div className={style.closeIcon}>
              <IoMdClose onClick={toggleMenu} />
            </div>
            <ul>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  <TbCategory2 />
                  Categories
                </Link>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  <BiCategory />
                  Subcategories
                </Link>
              </li>
              <li>
                <Link to="#" onClick={toggleMenu}>
                  <AiOutlineProduct />
                  Products
                </Link>
              </li>
              {loginData.length !== 0 ? (
                <>
                  <li>
                    <Link to="#" onClick={toggleMenu}>
                      <CgProfile />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="#" onClick={toggleMenu}>
                      <FaCartShopping />
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="" onClick={logOut}>
                      <TbLogout2 />
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" onClick={toggleMenu}>
                    <PiSignInBold />
                    Sign Now
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
