import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../ui/card"
import { Button } from "../ui/button"
import { useEmail } from "../UserContext/UserContext";
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import tracker from "../Assets/tracker.png"
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import banner from "../Assets/order.jpg"
import {Link} from "react-router-dom";
import {Progress} from "../ui/progress";
export default function ViewOrder() {
    axios.defaults.baseURL = "http://localhost:3001"
    const { mail } = useEmail();
    const [cartData, setCartData] = useState([])
    const [display, setDisplay] = useState(false)
    const [query, setQuery] = useState('');
    const [imagesArray,setImagesArray] = useState([])
    const [orderData, setOrderData] = useState([])
    const [progress, setProgress] = useState(100)
    let indice = -1
    let indice_date = -1

    const buttonProperties = {
        default: "",
        attente: "bg-[#6C757D] text-white",
        annulee: "bg-[#DC3545] text-white",
        livraison: "bg-[#FFC107] text-black",
        terminee: "bg-green-500 text-white"
    };
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.status === q);
    };
    const getOrderData = async() =>{
        const data = await axios.get(`/all-orders?q=${query}`)
        if(data.data.success && data.data.data.length > 0){
            console.log("evidence"+data.data.data)
            setOrderData(data.data.data)
            await getCartData()
            //setDisplay(true)
        }
    }
    const getProductById = async (productId) => {
        const data = await axios.get("/admin/product/"+productId);
        console.log(data.data.data.images[0])
        const image = data.data.data.images[0];
        const imagePath = image.replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
        setImagesArray(prevImagesArray => [...prevImagesArray, imagePath]);
        console.log("teste ce"+imagesArray)
        if(data.data.success){

        }

    };

    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success && data.data.data.length > 0){

            const filtered = dataFilter(data.data.data, "validate")
            if (filtered.length > 0){
                setCartData(filtered)
                console.log(data.data.data)
                const productIds = [];
                filtered.forEach(item => {
                    item.products.forEach(product => {
                        productIds.push(product.productId);
                    });
                });
                await Promise.all(productIds.map(id => getProductById(id)));
                  setDisplay(true)
            }

        }
        else{
            setDisplay(false)
        }
    }


    useEffect(() => {
        setQuery(mail)
        if (query)
            getOrderData()



    }, [query]);
    return (
        <div>
            {!display && <div className="min-h-screen flex flex-col bg-gray-100">
                <div className="relative flex-grow bg-cover bg-center rounded-lg shadow-md p-6 space-y-4"
                     style={{backgroundImage: `url(${banner})`, minHeight: '600px'}}>
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-6 space-y-4 rounded-lg">
                        <h1 className="text-white font-bold">Vous n'avez placé aucune commande !</h1>
                        <Link to="/shop"><Button className="bg-blue-500 text-white capitalize">Continuez vos achats</Button></Link>
                    </div>
                </div>
                <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t ">
                    <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 La Poste Tunisienne. Tout droit
                        réservé.</p>
                    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                        <Link className="text-xs hover:underline underline-offset-4" href="#">
                            Conditions d'utilisation
                        </Link>
                        <Link className="text-xs hover:underline underline-offset-4" href="#">
                            Politique de confidentialité
                        </Link>
                    </nav>
                </footer>
            </div>}

            {display &&
                <div>
                    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 ">
                        <div className="grid gap-8">
                            <div className="grid gap-4">
                                <div className="mb-2">
                                    <h1 className="font-bold text-2xl">Mes commandes <hr className="mt-2"/>
                                    </h1>
                                </div>
                                <div className="flex justify-center items-center">
                                    <img src={tracker} alt="" className="w-16"/>
                                </div>
                                <Progress className="w-auto" value={progress}/>
                                <div className="grid gap-4 grid-cols-2">
                                    {orderData.length >0 && cartData.map((element) => {
                                        indice_date++
                                        return (
                                            <Card className="w-auto p-4 ">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarIcon
                                                            className="h-5 w-5 text-gray-500 dark:text-gray-400"/>

                                                        <span
                                                            className="text-sm font-medium">  {orderData[indice_date].orderDate.split('T')[0].split('-').reverse().join('-')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            className={`
                                                                ${orderData.length > 0 && orderData[indice_date].status === "En Attente" ? buttonProperties.attente : ""}
                                                                ${orderData.length > 0 && orderData[indice_date].status === "Annulée" ? buttonProperties.annulee : ""}
                                                                ${orderData.length > 0 && orderData[indice_date].status === "En Livraison" ? buttonProperties.livraison : ""}
                                                                ${orderData.length > 0 && orderData[indice_date].status === "Terminée" ? buttonProperties.terminee : ""}
                                                                ${orderData.length > 0 && orderData[indice_date].status !== "En Attente" && orderData[indice_date].status !== "Annulée" ? buttonProperties.default : ""}
  `}
                                                        >{orderData[indice_date].status}
                                                        </Badge>
                                                        <span
                                                            className="text-sm font-medium">{element.totalPriceTTC.toFixed(2)} TND</span>
                                                    </div>
                                                </div>
                                                <Separator className="my-4"/>
                                                <div className="grid gap-4">
                                                    {element.products.map((item, index) => {
                                                            indice++
                                                            return (
                                                                <div
                                                                    className="grid grid-cols-[100px_1fr_100px] items-center gap-4">
                                                                    <img
                                                                        alt="Product image"
                                                                        className="rounded-md"
                                                                        height={80}
                                                                        src={"http://localhost:3001/uploads/" + imagesArray[indice]}
                                                                        style={{
                                                                            aspectRatio: "80/80",
                                                                            objectFit: "cover",
                                                                        }}
                                                                        width={80}
                                                                    />
                                                                    <div>
                                                                        <h3 className="text-base font-medium">{item.productName}</h3>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantité
                                                                            :</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span
                                                                            className="text-base font-medium">{(99).toFixed(2)} TND</span>
                                                                        <p className="text-sm text-gray-500 dark:text-gray-400">x2</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    )}

                                                </div>
                                            </Card>
                                        )
                                    })
                                    }
                                </div>
                                <Link to="/shop"><Button className="bg-blue-500 text-white capitalize w-fit mx-auto my-6">Continuez vos
                                    achats</Button></Link>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            </div>
                        </div>
                    </div>
                    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t ">
                        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 La Poste Tunisienne. Tout droit
                            réservé.</p>
                        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                            <Link className="text-xs hover:underline underline-offset-4" href="#">
                                Conditions d'utilisation
                            </Link>
                            <Link className="text-xs hover:underline underline-offset-4" href="#">
                                Politique de confidentialité
                            </Link>
                        </nav>
                    </footer>
                </div>}

        </div>
    )
}

function CalendarIcon(props) {
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
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <path d="M3 10h18"/>
        </svg>
    )
}