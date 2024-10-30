import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../APIs Connections/Shared/Products/getAllProducts";
import { getAllOrders } from "../../APIs Connections/Admin/Orders/getAllOrders";
import { getAllUsers } from "../../APIs Connections/Admin/Users/getAllUsers";
import { getAllCategories } from "../../APIs Connections/Shared/Categories/getAllCategories";
import InfoCard from "./InfoCard";

export default function HomeCardsContainer() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //get all products
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData);
    };
    getProducts();

    //get all orders
    const getOrders = async () => {
      let OrdersData = await getAllOrders();
      setOrders(OrdersData);
    };
    getOrders();

    //get all users
    const getUsers = async () => {
      let UsersData = await getAllUsers();
      console.log(UsersData);
      setUsers(UsersData);
    };
    getUsers();

    //get all categories
    const getCategories = async () => {
      let CategoriesData = await getAllCategories();
      setCategories(CategoriesData);
    };
    getCategories();
  }, []);
  return (
    <div className="cardsContainer">
      <InfoCard
        icon={<PiUsersThreeLight />}
        iconColor={"#74C1ED"}
        name="Users"
        number={users.length}
        color="#F0F9FF"
      />
      <InfoCard
        icon={<TbCategoryPlus />}
        iconColor={"#EE95C5"}
        name="Categories"
        number={categories.length}
        color="#FEF6FB"
      />
      <InfoCard
        icon={<AiOutlineProduct />}
        iconColor={"#F6C762"}
        name="Products"
        number={products.length}
        color="#FEFBEC"
      />
      .
      <InfoCard
        icon={<MdOutlineLocalShipping />}
        iconColor={"#74C1ED"}
        name="Orders"
        number={orders.length}
        color="#F0F9FF"
      />
    </div>
  );
}
