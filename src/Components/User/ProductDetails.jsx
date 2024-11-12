import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSpecificProduct } from "../../APIs Connections/Shared/Products/getSpecificProduct";
import { addToCart } from "../../APIs Connections/User/Cart/addToCart";
import { FaAppStore } from "react-icons/fa";
import style from "../../assets/CSS/User/ProductDetails.module.css";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { getItemFromLS } from "../../Functions/getItemFromLS";

import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { getLoggingUserCart } from "../../APIs Connections/User/Cart/getLoggingUserCart";
import { IoMdRemoveCircle } from "react-icons/io";
import { removeFromCart } from "../../APIs Connections/User/Cart/removeFromCart";

export default function ProductDetails() {
  let loginData = getItemFromLS("loginData");

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [userCartProducts, setUserCartProducts] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userCart = await getLoggingUserCart();
        if (userCart.cartItems) {
          setUserCartProducts(userCart.cartItems);
          setIsInCart(
            userCartProducts.some((item) => item.product._id === product._id)
          );
        } else {
          setUserCartProducts([]);
          setIsInCart(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCart();
  }, [userCartProducts]);

  useEffect(() => {
    const getProduct = async () => {
      const productData = await getSpecificProduct(id);
      const productInfo = productData?.data?.product;

      if (productInfo) {
        setProduct(productInfo);
        console.log(productInfo);
        setCurrentImage(productInfo.imgCover);
        setColor(productInfo.color?.[0] || null);
        setSize(productInfo.size?.[0] || null);
      }
    };
    getProduct();
  }, [id]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleChangeColor = (color) => {
    setColor(color);
  };

  const handleChangeSize = (size) => {
    setSize(size);
  };

  const handleAddToCart = async () => {
    const data = {
      product: product.id,
      quantity: quantity,
      // color: color,
      // size: size,
      // unitPrice: product.price - (product.price * product.discount) / 100,
      // totalPrice: (product.price - (product.price * product.discount) / 100 ) * quantity,
    };

    try {
      const cartResponse = await addToCart(data);
      console.log(cartResponse);

      if (cartResponse.status === 200) {
        toast.success("Product added to cart successfully!");
      } else {
        throw new Error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  const handleDeleteFromCart = async (id) => {
    console.log(id);
    const response = await removeFromCart(id);

    if (response.status === 200) {
      toast.success("Product removed from cart successfully!");
      setIsInCart(false);
    } else {
      toast.error("Failed to remove product from cart.");
    }
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <div className="container">
        {product ? (
          <>
            <div className={style.productDetails}>
              <div className={style.content}>
                <div className={style.images}>
                  <div className={style.subImages}>
                    <img
                      src={product.imgCover}
                      alt="Product"
                      onClick={() => handleImageClick(product.imgCover)}
                      className={
                        currentImage === product.imgCover
                          ? style.activeThumbnail
                          : ""
                      }
                    />
                    {product.images &&
                      product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Product thumbnail ${index + 1}`}
                          onClick={() => handleImageClick(image)}
                          className={
                            currentImage === image ? style.activeThumbnail : ""
                          }
                        />
                      ))}
                  </div>
                  <div className={style.mainImage}>
                    <img src={currentImage} alt="Product" />
                  </div>
                </div>
                <div className={style.details}>
                  <p className={style.title}>{product.name}</p>
                  <p className={style.brand}>
                    <FaAppStore /> {product.brand}
                  </p>
                  <p className={style.description}>{product.description}</p>
                  <div className={style.price}>
                    {product.discount > 0 ? (
                      <div className={style.priceContainer}>
                        <span className={style.oldPrice}>
                          Price: <del>${product.price}</del>
                        </span>
                        <span className={style.discount}>
                          Discount: -{product.discount}%
                        </span>
                        <span className={style.newPrice}>
                          Now For: $
                          {(
                            product.price -
                            (product.price * product.discount) / 100
                          ).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      `$${product.price}`
                    )}
                  </div>
                  {product.color && product.color.length > 0 && (
                    <div className={style.colors}>
                      <p className={style.colorTitle}>Colors:</p>
                      <div className={style.colorsBox}>
                        {product.color.map((clr, index) => (
                          <div
                            key={index}
                            className={`${style.color} ${
                              color === clr ? style.selectedColor : ""
                            }`}
                            style={{ backgroundColor: clr }}
                            onClick={() => handleChangeColor(clr)}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.size && product.size.length > 0 && (
                    <div className={style.sizes}>
                      <p className={style.sizeTitle}>Sizes:</p>
                      <div className={style.sizesBox}>
                        {product.size.map((sz, index) => (
                          <div
                            key={index}
                            className={`${style.size} ${
                              size === sz ? style.selectedSize : ""
                            }`}
                            onClick={() => handleChangeSize(sz)}
                          >
                            {sz}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={style.quantityContainer}>
                    <p className={style.quantityTitle}>Quantity:</p>
                    <div className={style.quantity}>
                      <button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={style.quantity}
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(Math.max(1, Number(e.target.value)))
                        }
                        onBlur={() =>
                          setQuantity((prev) => (isNaN(prev) ? 1 : prev))
                        }
                        min="1"
                      />
                      <button onClick={handleIncrement}>+</button>
                    </div>
                  </div>
                  <div className={style.buttons}>
                    {loginData.length > 0 ? (
                      <div className={style.operationButtons}>
                        {isInCart ? (
                          <button
                            className={`${style.btn} ${style.removeCart}`}
                            onClick={() => handleDeleteFromCart(product._id)}
                          >
                            Remove from Cart
                            <IoMdRemoveCircle />
                          </button>
                        ) : (
                          <button
                            className={`${style.btn} ${style.addCart}`}
                            onClick={handleAddToCart}
                          >
                            Add to Cart
                            <FaCartShopping />
                          </button>
                        )}

                        <button className={`${style.btn} ${style.addWish}`}>
                          Add to Wishlist
                          <FaHeart />
                        </button>
                      </div>
                    ) : (
                      <div className={style.loginButton}>
                        <Link
                          className={`${style.btn} ${style.login}`}
                          onClick={handleAddToCart}
                        >
                          Sign Now for Shopping <PiSignInBold />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
