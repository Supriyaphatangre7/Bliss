import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Shop from "./components/Shop";
import ItemHome from "./components/ItemHome";
import Contactus from "./components/Contactus";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import AboutUs from "./components/AboutUs";
import Logout from "./components/Logout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Pslider from "./components/Pslider";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Buy from "./components/Buy";
import OrderSuccess from "./components/OrderSuccess";
import ProdSummary from "./components/prodSummary";
import Avatar from "./components/Avatar";
import TryOption from "./components/TryOption";
import Cameraopt from "./components/Cameraopt";
import Imageopt from "./components/Imageopt";
import Camerabottom from "./components/Camerabottom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<ProtectedRoutes/>}>

        <Route path="/shop" element={<Shop />} />
        <Route path="/itemhome" element={<ItemHome />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/slider" element={<Slider/>} />
        <Route path="/hero" element={<Hero/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/pslider" element={<Pslider/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/prodsummary" element={<ProdSummary />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/try_on" element={<TryOption />} />
        <Route path="/camera" element={<Cameraopt />} />
        <Route path="/image" element={<Imageopt/>} />
        <Route path="/camerabottom" element={<Camerabottom/>} />



       
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
