import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { getAllCoupons } from './../../APIs Connections/Admin/Coupons/getAllCoupons';
import CouponeCard from "./CouponeCard";
export default function CouponsContainer() {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    const getCoupons = async () => {
      try {
        let couponData = await getAllCoupons();
        setCoupons(couponData);
      } catch (error) {
        console.log(error);
      }
    };
    getCoupons();
  }, [coupons]);
  return (
    <div className="contentContainer">
      <div className="heading">
        <p className="title">Coupons</p>
        <Link className="add-btn" to={`/admin/coupons/add`}>
          Add Coupon
          <RiAddLine />
        </Link>
      </div>
      <div className="cardsContainer">
        {coupons.map((coupon, index) => (
          <CouponeCard key={index} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}
