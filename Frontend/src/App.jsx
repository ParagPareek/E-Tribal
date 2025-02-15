import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header.jsx";
import Home from "./Components/Main/Home";
import Shop from "./Components/Main/Shop";
import About from "./Components/Main/About";
import Contact from "./Components/Main/Contact";
import Cart from "./Components/Main/Cart";
import S_product from "./Components/Main/S_product";
import Login from "./Components/Login_SignUp/Login";
import SignUp from "./Components/Login_SignUp/SignUp";
import BlogMain from "./Components/Main/BlogMain.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { useState } from "react";
import useGetUser from "./CustomHooks/useGetUserId.jsx";
import Product from "./Components/Seller/Product.jsx";
import OrderDetails from "./Components/Cart/OrderDetails.jsx";

function App() {
  const [userDetails, setUserDetails] = useState(localStorage.getItem("token"));
  const { userId } = useGetUser();
  const location = useLocation(); // Get the current route

  // console.log("location", location.pathname);
  
  const useAuth = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<BlogMain />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="sproduct/:id/" element={<S_product />} />
          <Route path="/sellerDashBoard" element={<Product />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
      </Routes>

      {/* Hide Footer on Product Page */}
      {location.pathname !== "/sellerDashBoard" && <Footer />}
    </>
  );
}

export default App;
