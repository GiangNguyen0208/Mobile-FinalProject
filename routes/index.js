
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
import { createBrowserRouter } from "react-router-dom";


export const routes = [
    {
      path: "/",
      element: <Default />,
      isPrivate: false,
      children: [
        { 
          path: "/",
          element: <Default />,
          isPrivate: false,
        },
        { 
          path: "/login",
          element: <Login />,
          isPrivate: false,
        },
        { 
          path: "/orders",
          element: <Order />,
          isPrivate: true,
          children: [
            {
              path: "shipping",
              element: <Shipping />,
              isPrivate: true,
            },
            {
              path: "history",
              element: <History />,
              isPrivate: true,
              children: [
                {
                  path: "orderItem/:orderId",
                  element: <OrderDetail />,
                  isPrivate: true,
                }
              ]
            },
            {
              path: "rating",
              element: <Rating />,
              isPrivate: true,
            },
            {
              path: "draft",
              element: <Draft />,
              isPrivate: true,
            },
          ]
        },
        { 
          path: "/likes",
          element: <WishList />,
          isPrivate: true,
        },
        { 
          path: "/notifications",
          element: <Notifications />,
          isPrivate: true,
          children: [
            {
              path: "promotions",
              element: <Promotions />,
              isPrivate: true,
            },
            {
              path: "news",
              element: <News />,
              isPrivate: true,
            }
          ]
        },
        { 
          path: "/info",
          element: <Info />,
          isPrivate: true,
        },
        {
          path: "/wishlist",
          element: <WishList />,
          isPrivate: true,
          children: [
            {
              path: "nearMe",
              element: <NearMe />,
              isPrivate: true,
            },
            {
              path: "latest",
              element: <Latest />,
              isPrivate: true,
            }
          ]
        },
      ]
    }
  ];
  
