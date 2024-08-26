
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {Shop} from "./Pages/Shop";
import Shopcategory from './Pages/Shopcategory';
import Product from './Pages/Product';
import {Cart} from './Pages/Cart';
import { Loginsignup } from "./Pages/Loginsignup";
import Footer from './Components/Footer/Footer';
import shirt_banner from './Components/Assets/banner_shirt.jpg';
import jeans_banner  from './Components/Assets/banner_jeans.jpg'
import tshirt_banner from './Components/Assets/banner_t-shirt.jpg'
import SignIn from './Pages/SignIn';
import AddProduct from './AddProduct';
import ProductGrid from './ProductGrid';
import AdminProductGrid from './AdminProductGrid';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/Shirt"
            element={<Shopcategory category="Shirt" banner={shirt_banner} />}
          />
          <Route
            path="/Jeans"
            element={<Shopcategory category="Jeans" banner={jeans_banner} />}
          />
          <Route
            path="/T-shirt"
            element={<Shopcategory category="T-shirt" banner={tshirt_banner} />}
          />
          <Route path="/Product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ProductGrid" element={<ProductGrid />} />
          <Route path="/AdminProduct" element={<AdminProductGrid />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/login" element={<Loginsignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
