/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sign from "./Pages/Shared/Sign";
import CategoriesContainer from "./Components/Shared/Categories/CategoriesContainer";
import SideBar from "./Components/Admin/SideBar";
import { getRole } from "./Functions/getRole";
import { useState } from "react";
import AddCategoryForm from "./Components/Admin/AddCategoryForm";

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
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
