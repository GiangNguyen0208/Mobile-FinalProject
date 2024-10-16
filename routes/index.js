import Default from "../view/client/layout/default";
import Home from "../view/client/pages/home/index";
import Info from "../view/client/pages/Info/index";
import Notifications from "../view/client/pages/notifications/index";
import Order from "../view/client/pages/order/index";
import WishList from "../view/client/pages/wishlist/index";

const routes = {
    path: "/",
    element: <Default />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/orders",
            element: <Order/>
        },
        {
            path: "/likes",
            element: <WishList/>
        },
        {
            path: "/notifications",
            element: <Notifications/>
        },
        {
            path: "/info",
            element: <Info/>
        }
        // {
        //     path: "/login",
        //     element: <Login/>
        // },
        // {
        //     element: <PrivateRouter/>,
        //     children: [
        //         {
        //             path: "/orders",
        //             element: <Order/>
        //         },
        //         {
        //             path: "/likes",
        //             element: <WishList/>
        //         },
        //         {
        //             path: "/notifications",
        //             element: <Notifications/>
        //         },
        //         {
        //             path: "/info",
        //             element: <Info/>
        //         },
        //     ]
        // }
    ]
};

export default routes;
