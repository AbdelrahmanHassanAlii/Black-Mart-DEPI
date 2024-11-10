import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificProduct } from "../../APIs Connections/Shared/Products/getSpecificProduct";
import { FaAppStore } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import style from "../../assets/CSS/User/ProductDetails.module.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null); // Set initial state to null
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      let productData = await getSpecificProduct(id);
      setProduct(productData.data.product);
      setCurrentImage(productData.data.product.imgCover); // Set initial main image
    };
    getProduct();
  }, [id]); // Add id as a dependency to reload if it changes

  // Handler to switch the main image
  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <div className="container">
        {product ? (
          <div className={style.productDetails}>
            <div className={style.content}>
              <div className={style.images}>
                {/* Thumbnail images */}
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
                  {product.images.map((image, index) => (
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
                {/* Main image display */}
                <div className={style.mainImage}>
                  <img src={currentImage} alt="Product" />
                </div>
              </div>
              <div className={style.details}>
                <p className={style.title}>{product.name}</p>
                <p className={style.brand}>
                  <FaAppStore /> {product.brand}
                </p>
                <p className={style.price}>
                  <span>
                    ${product.price - (product.price * product.discount) / 100}
                  </span>
                  <del>${product.price}</del>
                </p>
                <p className={style.description}>{product.description}</p>
                <button className={style.addBtn}>
                  Add to Cart
                  <RiAddLine />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
