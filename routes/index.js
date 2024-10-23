import Default from "../view/client/layout/default"; 
// import Home from "../view/client/pages/home/index"; 
import Info from "../view/client/pages/Info/index"; 
import Login from "../view/client/pages/login"; 
import Notifications from "../view/client/pages/notifications/index";  
import News from "../view/client/pages/notifications/news.js";
import Promotions from "../view/client/pages/notifications/promotions.js";
import Order from "../view/client/pages/order/index"; 
import WishList from "../view/client/pages/wishlist/index"; 

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
            element: <Order /> 
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
        }
    ]
};
