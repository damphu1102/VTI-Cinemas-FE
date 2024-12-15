import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { AdminErrorPage, UserErrorPage } from "../pages/Error/ErrorPage";

// Log để kiểm tra thứ tự và nội dung của các route trong AdminRoutes và UserRoutes
console.log("Admin Routes:", AdminRoutes);
console.log("User Routes:", UserRoutes);

// Tạo đối tượng router với danh sách các route
const routerPage = createBrowserRouter([
  ...AdminRoutes, // Đưa vào các route của admin
  ...UserRoutes, // Đưa vào các route của người dùng
  {
    path: "/error-admin", // Đường dẫn đến trang lỗi dành cho admin
    element: <AdminErrorPage />,
  },
  {
    path: "/error-user", // Đường dẫn đến trang lỗi dành cho user
    element: <UserErrorPage />,
  },
]);

export const RouterPage = () => {
  return <RouterProvider router={routerPage} />;
};
