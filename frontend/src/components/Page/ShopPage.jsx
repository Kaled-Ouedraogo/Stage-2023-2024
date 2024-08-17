import Navbar from "../Navbar/Navbar";
import OneProductPage from "./OneProductPage";
import {useEffect, useState} from "react";
import AllProductsPage from "./AllProductsPage";
import ShoppingCartPage from "./ShoppingCartPage";
import LandingPage from "../Page/LandingPage";
import axios from "axios";
import { useEmail } from "../UserContext/UserContext";
import PaymentPage from "../Page/PaymentPage";
import ViewProfil from "../Page/ViewProfil";
import ViewOrder from "../Page/ViewOrder";
import AllProductsPage_v2 from "./AllProductsPage_v2";
export default function ShopPage (props) {
    const [shoppingCartNumber,setShoppingCartNumber]=useState(0)
    axios.defaults.baseURL = "http://localhost:3001"
    const [query, setQuery] = useState('');
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.status === q);
    };
    const [count, setCount] = useState(0);
    const [cartData, setCartData] = useState([])
    const { mail } = useEmail();

    const updateCartNumber = (value) =>{
        setShoppingCartNumber(value)
    }
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success){
            setCartData(data.data.data)
            console.log("cart: "+data.data.data)
            const filtered = dataFilter(data.data.data, "active")
            try{
                    setCount(filtered[0].totalQuantity)
            }catch (err){
                console.log(err)
            }

        }
    }
    useEffect(() => {
        setQuery(mail)
        if(query)
            getCartData()
        }, [query]);
    return(
        <div className="bg-gray-100">
            <Navbar count={count}></Navbar>
            {props.display === "one" && <OneProductPage updateCartNumber={updateCartNumber}/>}
            {props.display === "all" && <AllProductsPage_v2 updateCartNumber={getCartData}/>}
            {props.display === "cart" && <ShoppingCartPage count={count} updateCartNumber={getCartData}/>}
            {props.display === "checkout" && <PaymentPage />}
            {props.display === "home" && <LandingPage/>}
            {props.display === "account" && <ViewProfil/>}
            {props.display === "order" && <ViewOrder/>}
        </div>
    )
}
