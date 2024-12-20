import { routes as initialRoutes, routes  } from "../../../../routes/index";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthContext } from "../../../context/Auth/AuthContext";
import PrivateRouter from "../PrivateRoute";
import { useContext, useEffect, useState } from "react";

export const AllRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [ updatedRoutes, setUpdatedRoutes ] = useState(initialRoutes);
  

  const updateRoutes  = (routes) => {
    return routes.map((route) => {
      const updatedRoute = { ...route };

      // Nếu người dùng đã đăng nhập, cập nhật isPrivate cho từng route
      if (route.isPrivate !== undefined) {
        updatedRoute.isPrivate = !isLoggedIn ? route.isPrivate : false;
      }

      // Kiểm tra và cập nhật các route con nếu có
      if (route.children) {
        updatedRoute.children = updateRoutes(route.children);
      }

      return updatedRoute;
    });
  };
 
  useEffect(() => {
    const modifiedRoutes = updateRoutes(initialRoutes);
    setUpdatedRoutes(modifiedRoutes);
  }, [isLoggedIn])

  // Kết hợp các routes thành components
  const elements = useRoutes(updatedRoutes);

  return <>{elements}</>;
};
