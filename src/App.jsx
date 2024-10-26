/* eslint-disable react/prop-types */
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import Sign from "./Pages/Shared/Sign";
// import AdminLayout from "./Components/Admin/AdminLayout";
// import CategoriesContainer from "./Components/Shared/Categories/CategoriesContainer";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Sign />} />
//         <Route path="/sign" element={<Sign />} />
//         <Route path="/login" element={<Sign />} />

//         <Route
//           path="/admin/*"
//           element={
//             <AdminLayout>
//               <Routes>
//                 <Route
//                   path="/admin/dashboard"
//                   element={<CategoriesContainer />}
//                 />
//               </Routes>
//             </AdminLayout>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sign from "./Pages/Shared/Sign";
// import AdminLayout from "./Components/Admin/AdminLayout";
import CategoriesContainer from "./Components/Shared/Categories/CategoriesContainer";
import SideBar from "./Components/Admin/SideBar";
import { getRole } from "./Functions/getRole";

function App() {


  const AdminLayout = ({ children }) => {
    let role = getRole(); // Get role from local storage

    // Log role for debugging purposes
    console.log("Role:", role);

    // Show UnAuthorized component if the role is "user" or invalid
    return role === "user" ? (
      <div>UnAuthorized</div>
    ) : (
      <>
        <div
          className="admin-container"
          style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}
        >
          <SideBar />
          <div className="admin-content">{children}</div>
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
                <Route
                  path="/dashboard"
                  element={<CategoriesContainer />}
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
