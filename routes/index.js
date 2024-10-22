import Default from "../view/client/layout/default";
import Home from "../view/client/pages/home/index";
import Info from "../view/client/pages/Info/index";
import Login from "../view/client/pages/login";
import Notifications from "../view/client/pages/notifications/index";
import Order from "../view/client/pages/order/index";
import WishList from "../view/client/pages/wishlist/index";
import ProductDetail from "../view/client/pages/ProductDetail";

const routes = {
    path: "/",
    element: <Default />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "orders",
            element: <Order />
        },
        {
            path: "likes",
            element: <WishList />
        },
        {
            path: "notifications",
            element: <Notifications />
        },
        {
            path: "info",
            element: <Info />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "detail",
            element: <ProductDetail />
        }
    ]
};

export default routes;
