/* eslint-disable react/prop-types */
import Heading from "./Heading";
import ProductCard from "./ProductCard";

export default function ProductsContainer({ title, products }) {
  return (
    <div style={{ margin: "50px 0" }}>
      <div className="container">
        <div className="content">
          <Heading title={title} />
          {products ? (
            <div className="cardsContainer">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
