import { routes } from "../../../../routes/index";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContext";
// import { useAuth } from "../../../../hooks/useAuth";
import PrivateRouter from "../PrivateRoute";
import { useContext } from "react";

export const AllRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext); 

  // Hàm thêm PrivateRouter cho các routes có isPrivate
  const wrapWithPrivateRouter = (routesObject) => {
    return routesObject.map((route) => {
      const wrappedRoute = { ...route };

      if (route.isPrivate) {
        wrappedRoute.element = <PrivateRouter>{route.element}</PrivateRouter>;
      }

      if (route.children) {
        wrappedRoute.children = wrapWithPrivateRouter(route.children);
      }
      
      return wrappedRoute;
    });
  };

  // Hàm kiểm tra trạng thái đăng nhập và chuyển hướng nếu cần
  const updateRoutes = (routes) => {
    return routes.map((route) => {
      if (route.isPrivate && !isLoggedIn) {
        return { ...route, element: <Navigate to="/login" /> };
      }
      
      if (route.children) {
        route.children = updateRoutes(route.children); 
      }
      
      return route;
    });
  };

  // Áp dụng cả hai hàm trên
  const wrappedRoutes = wrapWithPrivateRouter(routes);
  const finalRoutes = updateRoutes(wrappedRoutes);

  // Kết hợp các routes thành components
  const elements = useRoutes(finalRoutes);

  return <>{elements}</>;
};
