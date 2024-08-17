import './App.css';
import * as React from "react"
import "src/index.css"
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import {Login, SignUp, SignUpSuppliers} from "src/components/Page/LoginSignUp";
import Admin from "src/components/Admin/Admin";
import HomePage from "src/components/Admin/Pages/HomePage";
import ProductsPage from "src/components/Admin/Pages/ProductsPage";
import addProduct from "src/components/Admin/AddEditProduct/addProduct";
import EditProduct from "src/components/Admin/AddEditProduct/editProduct";
import ShopPage from "src/components/Page/ShopPage";
import Redirection from "src/components/Role/Redirection";
import ManageUsers from "src/components/Admin/Pages/ManageUsers";
import SuppliersDashboard from "src/components/AdminSuppliers/Pages/SuppliersDashboard";
import SuppliersHomePage from "src/components/AdminSuppliers/Pages/SuppliersHomePage";
import SuppliersProductsPage from "src/components/AdminSuppliers/Pages/SuppliersProductsPage";
import { EmailProvider } from "src/components/UserContext/UserContext";
import {DashboardProducts} from "src/components/Admin/NewComponent/Products";
import {ThemeProvider} from "./components/ThemeProvider/ThemeProvider";
import OrderPage from "./components/Admin/Pages/OrderPage";
import StatPage from "./components/Admin/Pages/StatPage";
import SuppliersOrdersPage from "./components/AdminSuppliers/Pages/SuppliersOrdersPage";
import Temp from "./components/Admin/Pages/Temp";
import ChartOne from "./Charts/ChartOne";

function App() {

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">

    <div className="App">
        <BrowserRouter>
            <EmailProvider>
                <Routes>
                    <Route path="/temp" element={<ChartOne/>} />
                    <Route path='/login' element={<Redirection />} />
                    <Route path='/' element={<Redirection />} />
                    <Route path='/signup' element={<SignUp/>}/>

                    <Route path="/signup-suppliers" element={<SignUpSuppliers/>}/>

                    <Route path='/home' element={<ShopPage display="home"/>}/>

                    <Route path='/admin/home' element={<Admin section={HomePage} name="home"></Admin>}/>
                    <Route path='/admin/products' element={<Admin section={ProductsPage} name="products"></Admin>}/>
                    <Route path="/admin/products/:productId" element={<Admin section={EditProduct} name="products"></Admin>}/>
                    <Route path='/admin/new' element={<Admin section={addProduct} name="analytics"></Admin>}/>
                    <Route path='/admin/users' element={<Admin section={ManageUsers} name="users"></Admin>}/>
                    <Route path='/admin/orders' element={<Admin section={OrderPage} name="orders"></Admin>}/>
                    <Route path='/admin/analytics' element={<Admin section={StatPage} name="analytics"></Admin>}/>

                    <Route path='/suppliers/home' element={<SuppliersDashboard section={SuppliersHomePage} name="home"></SuppliersDashboard>}/>
                    <Route path='/suppliers/products' element={<SuppliersDashboard section={SuppliersProductsPage} name="products"></SuppliersDashboard>}/>
                    <Route path='/suppliers/orders' element={<SuppliersDashboard section={SuppliersOrdersPage} name="orders"></SuppliersDashboard>}/>
                    <Route path="/suppliers/products/:productId" element={<SuppliersDashboard section={EditProduct} name="products"></SuppliersDashboard>}/>


                    <Route path='/shop' element={<ShopPage display="all"/>}/>
                    <Route path='/shop/:productId' element={<ShopPage display="one"/>}/>
                    <Route path='/account' element={<ShopPage display="account"/>}/>
                    <Route path='/order' element={<ShopPage display="order"/>}/>


                    <Route path='/shoppingCart' element={<ShopPage display="cart"/>}/>
                    <Route path='/checkout' element={<ShopPage display="checkout"/>}/>


                    <Route path='/admin/produits' element={<DashboardProducts/>}/>
                    <Route path='/admin/produit' element={<Admin section={DashboardProducts} name="produit"></Admin>}/>

                </Routes>
            </EmailProvider>
            <Routes>

            </Routes>
        </BrowserRouter>
    </div>
        </ThemeProvider>
  );
}

export default App;
