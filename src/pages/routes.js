import UserList from "../pages/UserPages/UserList";
import UserDetail from "../pages/UserPages/UserDetail";
import UserEdit from "../pages/UserPages/UserEdit";
import UserProfile from "../pages/UserPages/UserProfile";
import UserInvoice from "../pages/UserPages/UserInvoice";

import ShopOwnerList from "../pages/ShopOwnerPages/ShopOwnerList";
import ShopOwnerProductDetail from "../pages/ShopOwnerPages/ShopOwnerProductDetail";
import ShopOwnerEdit from "../pages/ShopOwnerPages/ShopOwnerEdit";
import ShopOwnerProfile from "../pages/ShopOwnerPages/ShopOwnerProfile";
import ShopOwnerInvoice from "../pages/ShopOwnerPages/ShopOwnerInvoice";

import ShipperList from "../pages/ShipperPages/ShipperList";
import ShipperDetail from "../pages/ShipperPages/ShipperDetail";
import ShipperEdit from "../pages/ShipperPages/ShipperEdit";
import ShipperProfile from "../pages/ShipperPages/ShipperProfile";
import ShipperInvoice from "../pages/ShipperPages/ShipperInvoice";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

const routes = [
  { path: "/userlist", component: UserList },
  { path: "/users/:id", component: UserDetail },
  { path: "/useredit/:id", component: UserEdit },
  { path: "/userprofile/:id", component: UserProfile },
  { path: "/userinvoice/:id/:orderId", component: UserInvoice },

  { path: "/shopownerlist", component: ShopOwnerList },
  { path: "/shopowneredit/:id", component: ShopOwnerEdit },
  { path: "/shopownerprofile/:id", component: ShopOwnerProfile },
  { path: "/shopownerinvoice/:shopId/:orderId", component: ShopOwnerInvoice },
  { path: "/shopownerproductdetail/:shopId/:productId", component: ShopOwnerProductDetail },

  { path: "/shipperlist", component: ShipperList },
  { path: "/shipper/:id", component: ShipperDetail },
  { path: "/shipperedit/:id", component: ShipperEdit },
  { path: "/shipperprofile/:id", component: ShipperProfile },
  { path: "/shipperinvoice/:shipperId/:orderId", component: ShipperInvoice },

  { path: "/dashboard", component: Dashboard },
  { path: "/login", component: Login }, // Login luôn khả dụng
];

export default routes;
