/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sign from "./Pages/Shared/Sign";
import CategoriesContainer from "./Components/Shared/Categories/CategoriesContainer";
import SideBar from "./Components/Admin/SideBar";
import { getRole } from "./Functions/getRole";
import { useState } from "react";
import AddCategoryForm from "./Components/Admin/AddCategoryForm";
import UpdateCategoryForm from "./Components/Admin/UpdateCategoryForm";
import SubCategoriesContainer from "./Components/Shared/Subcategories/SubCategoriesContainer";
import AddSubcategoryForm from "./Components/Admin/AddSubcategoryForm";
import UpdateSubcategoryForm from "./Components/Admin/UpdateSubcategoryForm";
import ProductsContainer from "./Components/Shared/Products/ProductsContainer";
import AddProductForm from "./Components/Admin/AddProductForm";
import UpdateProductForm from "./Components/Admin/UpdateProductForm";
import CouponsContainer from "./Components/Admin/CouponsContainer";
import AddCouponForm from "./Components/Admin/AddCouponeForm";
import UpdateCouponeForm from "./Components/Admin/UpdateCouponeForm";

function App() {
  const AdminLayout = ({ children }) => {
    let role = getRole();
    const [isFullWidth, setIsFullWidth] = useState(false);

    const toggleFullWidth = () => setIsFullWidth(!isFullWidth);

    return role === "user" ? (
      <div>UnAuthorized</div>
    ) : (
      <>
        <div
          className="admin-container"
          style={{
            display: "grid",
            gridTemplateColumns: isFullWidth ? "1fr" : "1fr 4fr",
          }}
        >
          {!isFullWidth && <SideBar />}
          <div className="admin-content">
            <button className="toggleBtn" onClick={toggleFullWidth}>
              {isFullWidth ? "Show Sidebar" : "Hide Sidebar"}
            </button>
            {children}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Sign />} />

        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<CategoriesContainer />} />

                {/* admin categories Routes */}
                <Route path="/categories" element={<CategoriesContainer />} />
                <Route path="/categories/add" element={<AddCategoryForm />} />
                <Route
                  path="/categories/update/:id"
                  element={<UpdateCategoryForm />}
                />

                {/* admin subcategories Routes */}
                <Route
                  path="/subCategories"
                  element={<SubCategoriesContainer />}
                />

                <Route
                  path="/subCategories/add"
                  element={<AddSubcategoryForm />}
                />
                <Route
                  path="/subCategories/update/:id"
                  element={<UpdateSubcategoryForm />}
                />

                {/* admin product Routes */}
                <Route path="/products" element={<ProductsContainer />} />
                <Route path="/products/add" element={<AddProductForm />} />
                <Route
                  path="/products/update/:id"
                  element={<UpdateProductForm />}
                />

                {/* admin coupon Routes */}
                <Route path="/coupons" element={<CouponsContainer />} />
                <Route path="/coupons/add" element={<AddCouponForm />} />
                <Route
                  path="/coupons/update/:id"
                  element={<UpdateCouponeForm />}
                />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
