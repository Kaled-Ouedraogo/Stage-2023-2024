import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import test from "../Assets/uploads/1713402110892-joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg"
import axios from "axios";
import {useEffect, useState} from "react";
import { useEmail } from "../UserContext/UserContext";
//import { BsTrash3 } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import Paypal from "../Payment/Paypal";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import {Textarea} from "../ui/textarea";
import {Link} from "react-router-dom";
import {Alert} from "@mui/material";
//import {loadStripe} from "@stripe/stripe-js";


export default function ShoppingCartPage({count,updateCartNumber}){
    axios.defaults.baseURL = "http://localhost:3001"
    const [cartData, setCartData] = useState([])
    const [display, setDisplay] = useState(false)
    const [query, setQuery] = useState('');
    const [imagesArray,setImagesArray] = useState([])
    const [productData, setProductData] = useState([]);
    const [checkOut, setCheckOut] = useState(false);
    const [showSuccessAlert,setShowSuccessAlert] = useState(false);
    const [name,setName] = useState("");
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.status === q);
    };
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success){

            const filtered = dataFilter(data.data.data, "active")
            if (filtered.length > 0){
                setCartData(filtered)
                console.log(data.data.data)
                filtered[0].products.map((item)=>{
                    getProductById(item.productId)
                })
                //if (cartData.length >0)setDisplay(true)
                //else setDisplay(false)
                setDisplay(true)
                console.log("final : "+imagesArray.length)
            }

        }
        else{
            setDisplay(false)
        }
    }
    const getOneProduct = async (productId) => {
        try {
            const data = await axios.get("/product/"+productId);
            console.log(data);
            if(data.data.success){
                setProductData(data.data.data);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    const updateCartPrice = async (cartId,productId,productQty) =>{
        try{
            const data = await axios.get("/admin/product/"+productId);
            if(data.data.success){
                let totalPriceTHT = (data.data.data.sellPrice)*productQty;
                let totalPriceTVA =  (data.data.data.sellPrice * data.data.data.tva / 100)*productQty;
                let totalPriceTTC = (data.data.data.sellPrice * data.data.data.tva / 100 + data.data.data.sellPrice)*productQty;

                const newData = await axios.put("/update-cart/"+cartId,{totalPriceTHT,totalPriceTVA,totalPriceTTC})
                if(newData.data.success){
                    console.log("Updated successfully");
                }
            }
        }catch(error){
            console.error("Error updating product:", error);
        }
    }
    const getProductById = async (productId) => {
        const data = await axios.get("/admin/product/"+productId);
        console.log(data.data.data.images[0])
        const image = data.data.data.images[0];
        const imagePath = image.replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
        setImagesArray(prevImagesArray => [...prevImagesArray, imagePath]);
        if(data.data.success){

        }

    };
    const handleDelete = async (cartId, product) => {
        setName(product.productName)
        try {
            const data = await axios.delete(`/add-to-cart/`+cartId+"/"+product.productId);
            if (data.data.success) {
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(false)
                }, 5000);
                //alert(data.data.message);
                await getCartData();
                updateCartNumber();
            }
            else {
                alert(data.data.error)
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const addItem = async(item,action) =>{
        const data = await axios.get("/admin/product/"+item.productId);
        const filtered = dataFilter(cartData, "active")
        let totalPriceTHT = data.data.data.sellPrice;
        let totalPriceTVA =  data.data.data.sellPrice * data.data.data.tva / 100;
        let totalPriceTTC = data.data.data.sellPrice * data.data.data.tva / 100 + data.data.data.sellPrice;
        let totalQuantity = parseInt(filtered[0].totalQuantity) + 1;
        let newPrice = data.data.data.sellPrice;
        let quantity = 1

        if (action === "reduce") {
            totalPriceTHT = (data.data.data.sellPrice)*(-1);
            totalPriceTVA =  (data.data.data.sellPrice * data.data.data.tva / 100)*(-1);
            totalPriceTTC = (data.data.data.sellPrice * data.data.data.tva / 100 + data.data.data.sellPrice)*(-1);
            totalQuantity = parseInt(filtered[0].totalQuantity) - 1;
            newPrice = newPrice*(-1)
            quantity = quantity*(-1)
        }
        console.log("voici:"+newPrice)

        const response = await axios.put(`/add-to-cart/`+filtered[0]._id,{totalPriceTHT,totalPriceTVA,totalQuantity,totalPriceTTC, price:newPrice, productName:data.data.data.name, productId:data.data.data._id,quantity:quantity})
        if(response.data.success){
            console.log(response.data.data)
            getCartData()
        }
    }
    const { mail } = useEmail();

    useEffect(() => {
        setQuery(mail)
        if(query){
            getCartData()
            updateCartNumber();
        }

    }, [query]);
    return(
        <div className="container mx-auto px-4 md:px-6 py-8">

            {display ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <h1 className="text-2xl font-bold mb-6">Votre panier ({count})</h1>

                        <div
                            className="bg-white rounded-lg shadow-[1.0px_1.0px_4.0px_rgba(0,0,0,0.38)] p-6 space-y-4 sm:max-w-[684px] md:max-w-[800px]">
                            <div>
                                {cartData[0].products.map((item, index) => (
                                    <div className="" key={index}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    alt="Product Image"
                                                    className="rounded-md"
                                                    height={80}
                                                    src={"http://localhost:3001/uploads/" + imagesArray[index]}
                                                    style={{
                                                        aspectRatio: "80/80",
                                                        objectFit: "cover",
                                                    }}
                                                    width={80}
                                                />
                                                <div>
                                                    <h3 className="text-lg font-medium flex items-start">{item.productName}</h3>
                                                    <p className="text-gray-500 flex items-start">{(item.price).toFixed(2)} TND</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button size="icon" variant="outline"
                                                        onClick={() => addItem(item, "reduce")}>
                                                    <MinusIcon className="h-4 w-4"/>
                                                </Button>
                                                <Input
                                                    className="text-lg font-medium w-9 border-none"
                                                    value={item.quantity}
                                                ></Input>
                                                <Button size="icon" variant="outline"
                                                        onClick={() => addItem(item, "add")}>
                                                    <PlusIcon className="h-4 w-4"/>
                                                </Button>
                                                <Button size="icon" variant="outline" onClick={() => {
                                                    updateCartPrice(cartData[0]._id, item.productId, item.quantity)
                                                    handleDelete(cartData[0]._id, item)
                                                }}>
                                                    <FaTrash/>

                                                </Button>
                                            </div>
                                        </div>
                                        <Separator className="my-6"/>

                                    </div>

                                ))}
                            </div>
                        </div>

                    </div>
                    <div
                        className="bg-white rounded-lg shadow-[1.0px_1.0px_4.0px_rgba(0,0,0,0.38)] p-6 space-y-4 my-14">
                        <h2 className="text-xl font-bold">Résumé de la commande</h2>
                        <div className="flex items-center justify-between">
                            <span>Produits </span>
                            <span>{(cartData[0].totalQuantity)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Total HT</span>
                            <span>{(cartData[0].totalPriceTHT).toFixed(2)} TND</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Total TVA</span>
                            <span>{(cartData[0].totalPriceTVA).toFixed(2)} TND</span>
                        </div>

                        <Separator/>
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Total</span>
                            <span className="text-lg font-medium">{(cartData[0].totalPriceTTC).toFixed(2)} TND</span>
                        </div>
                        {cartData[0].totalPriceTTC > 25 ? <CheckoutButton display={false}/> :
                            <CheckoutButton display={true}/>}

                        {/*checkOut ? (
                                <Paypal />
                            ) : (
                                <Button onClick={()=>{
                                    setCheckOut(true)
                                }} >Paypal</Button>
                            )*/}
                        {/*<div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms"/>
                                    <Label className="text-sm text-gray-500" htmlFor="terms">
                                        I have a <span className="text-blue-500">coupon code</span>
                                    </Label>
                                </div>
                                <Button disabled variant="outline">
                                    Place Order
                                </Button>
                            </div>*/}
                    </div>
                    <br/><br/><br/><br/>
                    <br/><br/><br/><br/>

                    {showSuccessAlert && (
                        <div className="fixed top-24 right-4">
                            <Alert variant="filled" severity="warning">
                                {name} supprimé du panier
                            </Alert>
                        </div>
                    )}
                </div>

            ) : (
                <div className="bg-white rounded-lg shadow-[1.0px_1.0px_4.0px_rgba(0,0,0,0.38)] p-6 space-y-4 ">
                    <h1 className="text-2xl font-bold mb-6">Votre Panier (0)</h1>
                    <div
                        className="bg-white rounded-lg shadow-[1.0px_1.0px_4.0px_rgba(0,0,0,0.38)] p-6 space-y-4 ">
                        <h1 className="font-bold">Votre panier est vide</h1>
                        <Link to="/shop"><Button>Voir le Catalogue</Button></Link>
                    </div>
                </div>
            )}


        </div>
    )
}

function MinusIcon(props) {
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
            <path d="M5 12h14"/>
        </svg>
    )
}


function PlusIcon(props) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}

function CheckoutButton(display){
    const [category, setCategory] = useState("")
    const [city, setCity] = React.useState("");
    const cityOptions = [];
    cityOptions.push({label:"Gouvernorat de Ariana"});
    cityOptions.push({label:"Gouvernorat de Ben Arous"});
    cityOptions.push({label:"Gouvernorat de Manouba"});
    cityOptions.push({label:"Gouvernorat de Monastir"});
    cityOptions.push({label:"Gouvernorat de Nabeul"});
    cityOptions.push({label:"Gouvernorat de Sousse"});
    cityOptions.push({label:"Gouvernorat de Tunis"});
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Link to="/checkout">
                    <Button className="ml-auto shrink-0 w-full mt-3">
                        Commander
                    </Button>
                </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[740px] overflow-auto">
                <form>
                    <DialogHeader className="mb-0.5">
                        <DialogTitle>Select a Delivery Address</DialogTitle>
                        <DialogDescription>
                            Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="w-full custom-card">
                        <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                            <div className="grid gap-1">
                                <CardTitle>Address Details</CardTitle>
                                <CardDescription>Enter Your Information's Below</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-1 md:gap-2">
                                <div className="grid gap-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter Your Name"
                                        type="String"
                                        required
                                    />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        type="text"
                                        required
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="city">City</Label>
                                    <Select onValueChange={(value) => {
                                        setCity(value)
                                    }}>
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="Select a city"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {cityOptions.map(option => (
                                                    <SelectItem className="overflow-auto" key={option.label}
                                                                value={option.label}>{option.label}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Enter your address..."
                                        type="text"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2 mt-3">
                                    <Label htmlFor="phone">Select your Payment Method</Label>
                                    <RadioGroup defaultValue="comfortable" className="ml-3">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="r1"/>
                                            <Label htmlFor="r1">Paypal</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="comfortable" id="r2"/>
                                            <Label htmlFor="r2">Stripe</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="r3"/>
                                            <Label htmlFor="r3">Visa</Label>
                                        </div>
                                        {display === true && <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="r3"/>
                                            <Label htmlFor="r3">Payment on delivery</Label>
                                        </div>}

                                    </RadioGroup>
                                </div>

                            </div>
                        </CardContent>
                        <CardFooter>{/* Vos éléments de pied de carte ici */}</CardFooter>
                    </Card>
                    <DialogFooter>
                        <Button type="submit" className="mt-3">
                            Save Delivery Address
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
