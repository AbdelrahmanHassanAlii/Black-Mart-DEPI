import { getRole } from "../../Functions/getRole";
import SideBar from "./SideBar";

/* eslint-disable react/prop-types */
export default function AdminLayout({ children }) {
  let role = getRole();

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
}
