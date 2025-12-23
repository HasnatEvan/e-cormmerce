import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/HomePage/Home";
import Dashboard from "../Layout/Dashboard";
import AddProducts from "../Pages/Dashboard/AdminPages/AddProducts/AddProducts";
import LoginForm from "../Authentication/LoginFrom";
import SignupFrom from "../Authentication/SignupFrom";
import ProductDetails from "../Components/Card/ProductDetails";
import WishList from "../Pages/HomePage/WishList/WishList";
import Cart from "../Pages/HomePage/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import SuccessPage from "../Components/SuccessPage/SuccessPage";
import SingleCheckout from "../Components/Checkout/SingleCheckout";
import CategoryProducts from "../Components/CategoryProducts/CategoryProducts";
import SearchResults from "../Components/SearchResults/SearchResults";
import ManageProducts from "../Pages/Dashboard/AdminPages/ManageProducts/ManageProducts";
import EditeProducts from "../Pages/Dashboard/AdminPages/ManageProducts/EditeProducts";
import MyOrders from "../Pages/Dashboard/UsersPages/MyOrders/MyOrders";
import AddProduct from "../Pages/Dashboard/AdminPages/AddProduct/AddProduct";
import Inventory from "../Pages/Dashboard/AdminPages/Inventory/Inventory";
import EditProduct from "../Pages/Dashboard/AdminPages/Inventory/EditeProduct";
import AllProducts from "../Pages/AllProducts/AllProducts";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "sign-up",
        element: <SignupFrom />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: '/wishlist',
        element: <WishList></WishList>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>
      },
      {
        path: '/single-checkout',
        element: <SingleCheckout></SingleCheckout>
      },
      {
        path: '/success',
        element: <SuccessPage></SuccessPage>
      },
      {
        path: "/category/:category",
        element: <CategoryProducts />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/purchase-history",
        element: <MyOrders></MyOrders>
      },
      {
        path: "/add-products",
        element: <AddProduct></AddProduct>
      },
      {
        path: "/inventory",
        element: <Inventory></Inventory>
      },
      {
        path: "/edit-products/:id",
        element: <EditProduct></EditProduct>
      },
      {
        path:'/all-products',
        element:<AllProducts></AllProducts>
      }
    ],
  },

  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   children: [
  //     {
  //       path: "add-product",
  //       element: <AddProducts />,
  //     },
  //     {
  //       path: '/dashboard/manage-products',
  //       element: <ManageProducts></ManageProducts>
  //     },
  //     {
  //       path: "edit-products/:id",
  //       element: <EditeProducts />,
  //     },
  //   ],
  // },
]);
