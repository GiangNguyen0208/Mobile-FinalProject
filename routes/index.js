import Default from "../view/client/layout/default"; 
import Info from "../view/client/pages/Info/index"; 
import Login from "../view/client/pages/login"; 
import Notifications from "../view/client/pages/notifications/index";  
import News from "../view/client/pages/notifications/news.js";
import Promotions from "../view/client/pages/notifications/promotions.js";
import Order from "../view/client/pages/order/index"; 
import WishList from "../view/client/pages/wishlist/index"; 
import Shipping from "../view/client/components/Order/shipping.js";
import History from "../view/client/components/Order/history.js";
import Rating from "../view/client/components/Order/rating.js";
import Draft from "../view/client/components/Order/draft.js";
import NearMe from "../view/client/pages/wishlist/nearMe.js";
import Latest from "../view/client/pages/wishlist/latest.js";
import User from "../view/client/pages/Info/User.js";
import OrderDetail from "../view/client/pages/order/orderDetail";

export const routes = {
    path: "/",
    element: <Default />,
    children: [
        { 
            path: "/",
            element: <Default /> 
        },
        { 
            path: "/orders",
            element: <Order /> ,
            children: [
                {
                    path: "shipping",
                    element: <Shipping />
                },
                {
                    path: "history",
                    element: <History />,
                    children: [
                   {
                       path: "orderItem/:orderId",
                       element: <OrderDetail />
                   }
               ]
                },
                {
                    path: "rating",
                    element: <Rating />
                },
                {
                    path: "draft",
                    element: <Draft />
                },
            ]
        },
        { 
            path: "/likes",
            element: <WishList /> 
        },
        { 
            path: "/notifications",
            element: <Notifications />,
            children: [
                {
                    path: "promotions",
                    element: <Promotions/>
                },
                {
                    path: "news",
                    element: <News />
                }
            ]
        },
        { 
            path: "/info",
            element: <Info /> 
        },
        { 
            path: "/login",
            element: <Login /> 
        },
        {
            path: "/wishlist",
            element: <WishList/>,
            children: [
                {
                    path: "nearMe",
                    element: <NearMe/>
                },
                {
                    path: "latest",
                    element: <Latest/>
                }
            ]
        }
    ]
};
