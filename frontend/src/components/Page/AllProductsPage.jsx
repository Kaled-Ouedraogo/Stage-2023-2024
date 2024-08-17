import {Link} from "react-router-dom";
import { Button } from "../ui/button"
import test from "../Assets/uploads/1713402110892-joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg"
import axios from "axios";
import {useEffect, useState} from "react";
import * as React from "react";
import { useEmail } from "../UserContext/UserContext";
export default function AllProductsPage ({updateCartNumber}){
    axios.defaults.baseURL = "http://localhost:3001"
    const [dataList,setDataList] = useState([])
    const [cartData, setCartData] = useState([])
    const [code, setCode] = useState(1);
    const [query, setQuery] = useState('');
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.status === q);
    };
    const { mail } = useEmail();
    let email = mail;
    const getProductData = async() =>{
        const data = await axios.get("/admin/all-product")
        console.log(data)
        if(data.data.success){
            setDataList(data.data.data)
        }
    }
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success){
            setCartData(data.data.data)
            console.log("cart: "+data.data.data)
        }
    }
    const updateCartData = async(data) =>{
        const filtered = dataFilter(cartData, "active")
        let totalPriceTHT = data.sellPrice;
        let totalPriceTVA =  data.sellPrice * data.tva / 100;
        let totalPriceTTC = data.sellPrice * data.tva / 100 + data.sellPrice;
        let totalQuantity = parseInt(filtered[0].totalQuantity) + 1;

        const response = await axios.put(`/add-to-cart/`+filtered[0]._id,{totalPriceTHT,totalPriceTVA,totalQuantity,totalPriceTTC, price:data.sellPrice, productName:data.name, productId:data._id,quantity:1})
        if(response.data.success){
            console.log(response.data.data)
            updateCartNumber();
        }
    }
    const createCartData = async(data) =>{
        let totalPriceTHT = data.sellPrice;
        let totalPriceTVA =  data.sellPrice * data.tva / 100;
        let totalPriceTTC = data.sellPrice * data.tva / 100 + data.sellPrice;
        let totalQuantity =  1;


        console.log(data.name)
        console.log(email)
        const response = await axios.post("/add-to-cart", { code, userEmail:mail, productId:data._id, productName:data.name, price:data.sellPrice, totalPriceTHT,totalPriceTTC,totalPriceTVA,totalQuantity });
        if(response.data.success){
            console.log(response.data.data)
            getCartData()
            updateCartNumber()
        }
    }
    useEffect(()=>{
        setQuery(mail)
        getProductData()
        getCartData()
    },[query])
    const handleAdd = (product) => {
        //getCartData()
        if(cartData.length>0)
        {
            updateCartData(product)
        }


        else{
            createCartData(product);
        }
    };
    //const addToCart = async() =>{

    //}
    return (
        <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6 justify-center">
                        <h1>Temporaire</h1>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <HomeIcon className="h-4 w-4"/>
                                Home
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                href="#"
                            >
                                <PackageIcon className="h-4 w-4"/>
                                Products
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <UsersIcon className="h-4 w-4"/>
                                Categories
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <FilterIcon className="h-4 w-4"/>
                                Filters
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="my-4">
                    <h1>Temporaire 2</h1>
                </div>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {
                            dataList.map((element)=>{
                                const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                                return (
                                    <div className="bg-white rounded-lg overflow-hidden shadow-sm dark:bg-gray-950 cursor-pointer" key={element._id}>
                                        <Link to={'/shop/'+element._id}>
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                height="200"
                                                src={"http://localhost:3001/uploads/" + imagePath}
                                                style={{
                                                    aspectRatio: "300/200",
                                                    objectFit: "cover",
                                                }}
                                                width="300"
                                            />
                                        </Link>
                                        <div className="p-4 space-y-2" >
                                            <h3 className="font-semibold text-lg">{element.name}</h3>
                                            <p className="text-gray-500 dark:text-gray-400">{element.category}</p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-base">{element.sellPrice.toFixed(2)} TND</span>
                                                <Button size="sm" onClick={() => handleAdd(element)} >Add to Cart</Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </main>
            </div>
        </div>
    )
}

function BellIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
    )
}


function FilterIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
    )
}


function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


function Package2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}


function PackageIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}


function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}