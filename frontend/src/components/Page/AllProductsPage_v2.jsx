/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cIshBg3Un2O
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AccordionTrigger, AccordionContent, AccordionItem, Accordion } from "../ui/accordion"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useEmail} from "../UserContext/UserContext";
import {Button} from "../ui/button";
import * as React from "react";
import {Alert} from "@mui/material";
export default function AllProductsPage_v2({updateCartNumber}) {
    axios.defaults.baseURL = "http://localhost:3001"
    const [dataList,setDataList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [cartData, setCartData] = useState([])
    const [code, setCode] = useState(1);
    const [name,setName] = useState("");
    const [query, setQuery] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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
    const getCategoryData = async() =>{
        const data = await axios.get("/admin/all-categories")
        console.log(data)
        if(data.data.success){
            setCategoryList(data.data.data)
            console.log(data.data.data)
        }
    }
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success ){
            console.log("realityPrevious: "+data.data.data)
            const filtered = dataFilter(data.data.data, "active")
            setCartData(filtered)

            /*if (filtered.length > 0){
                setCartData(filtered)
                console.log("reality: "+filtered)
            }*/

            console.log("cart: "+data.data.data)
        }
    }
    const updateCartData = async(data) =>{
        const filtered = dataFilter(cartData, "active")
        let totalPriceTHT = data.sellPrice;
        let totalPriceTVA =  data.sellPrice * data.tva / 100;
        let totalPriceTTC = data.sellPrice * data.tva / 100 + data.sellPrice;
        let totalQuantity = parseInt(filtered[0].totalQuantity) + 1;

        const response = await axios.put(`/add-to-cart/`+filtered[0]._id,{totalPriceTHT,totalPriceTVA,totalQuantity,totalPriceTTC, price:data.sellPrice,storeName:data.storeName, productName:data.name, productId:data._id,quantity:1})
        if(response.data.success){
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            console.log(response.data.data)
            updateCartNumber();
        }
    }
    const createCartData = async(data) =>{
        let totalPriceTHT = data.sellPrice;
        let totalPriceTVA =  data.sellPrice * data.tva / 100;
        let totalPriceTTC = data.sellPrice * data.tva / 100 + data.sellPrice;
        let totalQuantity =  1;

        console.log("repère"+data.storeName)
        console.log(email)
        const response = await axios.post("/add-to-cart", { code, userEmail:mail, productId:data._id, productName:data.name, price:data.sellPrice, storeName:data.storeName, totalPriceTHT,totalPriceTTC,totalPriceTVA,totalQuantity });
        if(response.data.success){
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            console.log(response.data.data)
            console.log("la raison:++")
            getCartData()
            updateCartNumber()
        }
    }
    useEffect(()=>{
        setQuery(mail)
        getProductData()
        getCartData()
        getCategoryData()
    },[query])
    const handleAdd = (product) => {
        //getCartData()
        setName(product.name)
        if(cartData.length>0)
        {
            updateCartData(product)
        }


        else{
            createCartData(product);
        }
    };
    return (
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start py-8">
            <div className="flex flex-col gap-4 items-start">
                <div className="grid gap-1">
                    <h2 className="font-bold text-2xl">Filtres</h2>
                    <p className="text-gray-500 dark:text-gray-400">Affinez votre recherche en appliquant des filtres</p>
                </div>

                <Accordion className="w-full" collapsible type="single">
                    <AccordionItem value="category">
                        <AccordionTrigger className="text-base font-medium">Categorie</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                                {categoryList.map((element)=>{
                                    return(
                                            <Label className="flex items-center gap-2 font-normal">
                                                <Checkbox id="category-electronics" />
                                                {element.libelle}{"\n                            "}
                                            </Label>
                                    )})
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price">
                        <AccordionTrigger className="text-base font-medium">Prix</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                                <Label className="flex items-center gap-2 font-normal">
                                    <Checkbox id="price-under50" />
                                    Croissant{"\n                            "}
                                </Label>
                                <Label className="flex items-center gap-2 font-normal">
                                    <Checkbox id="price-under50" />
                                    Décroissant{"\n                            "}
                                </Label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="grid gap-6 md:gap-8">
                {/*<div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="grid gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-center">Search Results</h1>
                        <p className="text-gray-500 dark:text-gray-400">Showing 24 results for your search.</p>
                    </div>
                </div>*/}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/*<div className="relative group">
                        <Link className="absolute inset-0 z-10" href="#">
                            <span className="sr-only">View</span>
                        </Link>
                        <img
                            alt="Product Image"
                            className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                            height={300}
                            src="/placeholder.svg"
                            width={300}
                        />
                        <div className="flex-1 py-4">
                            <h3 className="font-semibold tracking-tight">IKEA BILLY Bookcase</h3>
                            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                                Versatile and customizable bookcase
                            </p>
                            <h4 className="font-semibold">$79.99</h4>
                        </div>
                    </div>*/}
                    {
                        dataList.map((element)=>{
                            const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                            return (
                                <div className="relative group" key={element._id}>
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
                                        <p className="text-gray-500 dark:text-gray-400">{element.subcategory}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-base">{element.sellPrice.toFixed(2)} TND</span>
                                            <Button size="sm" onClick={() => handleAdd(element)} >Ajouter</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        {name} ajouté au panier
                    </Alert>
                </div>
            )}
        </div>
    )
}