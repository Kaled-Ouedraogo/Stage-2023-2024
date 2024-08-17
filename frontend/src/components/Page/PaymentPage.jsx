import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "../ui/pagination"
import {Progress } from "../ui/progress"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Textarea} from "../ui/textarea";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import Paypal from "../Payment/Paypal";
import { CircularProgress } from '@chakra-ui/react'
import {useEmail} from "../UserContext/UserContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
export default function PaymentPage(props) {
    axios.defaults.baseURL = "http://localhost:3001"
    const { mail } = useEmail();
    const [code, setCode] = useState(1);
    const [cartData, setCartData] = useState([])
    const [name,setName] = useState()
    const [tel,setTel] = useState()
    const [region,setRegion] = useState()
    const [ville,setVille] = useState()
    const [address,setAddress] = useState()
    const [paymentMethod, setPaymentMethod] = useState("paypal22")
    const [query, setQuery] = useState('');

    const [display, setDisplay] = useState(false)
    const [progress, setProgress] = useState(0)
    const [city, setCity] = React.useState("");
    const [displayButton, setDisplayButton] = React.useState(false);
    const navigate = useNavigate()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const [i,setValue] = useState(1)

    const updateStep = (op)=>{
        if (op==="+" && i<2){
            setValue(i+1)
            setProgress(50)
        }
        else if (op==="-" && i>1){
            setProgress(0)
            setValue(i-1)
        }
    }
    //let i =1
    const cityOptions = [];
    cityOptions.push({label:"Gouvernorat de Ariana"});
    cityOptions.push({label:"Gouvernorat de Ben Arous"});
    cityOptions.push({label:"Gouvernorat de Manouba"});
    cityOptions.push({label:"Gouvernorat de Monastir"});
    cityOptions.push({label:"Gouvernorat de Nabeul"});
    cityOptions.push({label:"Gouvernorat de Sousse"});
    cityOptions.push({label:"Gouvernorat de Tunis"});
    const cityOptions2 = [
        { label: "Bab Bhar" }, { label: "Bab Bnet" }, { label: "Bab Fella" }, { label: "Bab Khadhra" },
        { label: "Bab Mnara" }, { label: "Bab Saadoun" }, { label: "Bab Souika" }, { label: "Belvedère" },
        { label: "Carthage" }, { label: "Cite El Khadra" }, { label: "Cité El Mahrajen" }, { label: "Cité Hlel" },
        { label: "Cité Ibn Khaldoun" }, { label: "Cité Ibn Sina" }, { label: "Cité Intilaka" }, { label: "Cité Rommana" },
        { label: "El Agba" }, { label: "El Aouina" }, { label: "El Hrairia" }, { label: "El Kabbaria" }, { label: "El Kram" },
        { label: "El Menzah" }, { label: "El Omrane" }, { label: "El Omrane Superieur" }, { label: "El Ouerdia" },
        { label: "Essijoumi" }, { label: "Ettahrir" }, { label: "Ezzouhour" }, { label: "Gammart" }, { label: "Hafsia" },
        { label: "Jardins de Carthage" }, { label: "Jebel Jelloud" }, { label: "La Goulette" }, { label: "La Marsa" },
        { label: "La Medina" }, { label: "Le Bardo" }, { label: "Les berges du lac 1" }, { label: "Les berges du lac 2" },
        { label: "Manar 1" }, { label: "Manar 2" }, { label: "Manar 3" }, { label: "menzah 4" }, { label: "Menzah 9" },
        { label: "Montplaisir" }, { label: "Mourouj 2" }, { label: "Sidi Bou Saïd" }, { label: "Sidi El Bechir" }, { label: "Sidi Hassine" }
    ];
    const buttonProperties = {
        default: "",
        active: "bg-[#007BFF] bg-opacity-85"
    };
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.status === q);
    };
    const [isLoading, setIsLoading] = useState(false);
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q=${query}`)
        if(data.data.success){
            const filtered = dataFilter(data.data.data, "active")
            setCartData(filtered)
            console.log("ordercart: "+data.data.data[0]._id);
        }
    }
    const createOrder = async(cartData) =>{
        await getCartData()
        console.log("ordercart22: "+cartData[0]._id);
        const response = await axios.post("/add-order", { code, userEmail:mail, shoppingCartId:cartData[0]._id, name:name, tel:tel, address:address, ville:ville, region:region, paymentMethod:paymentMethod });
        if(response.data.success){
            console.log(response.data.data)
            //alert("Commande validée")
            setIsLoading(true);
            //showSuccessAlert(true)
            setTimeout(() => {
                setIsLoading(false);
                navigate('/order');
            }, 4000);
            //updateCartNumber()
        }
    }
    useEffect(()=>{
        setQuery(mail)
        getCartData()
    },[])

    return (
        <div className="m-auto">
            <div className="flex flex-col w-full max-w-md mx-auto my-5">
                <div className="mb-10">
                    <h1 className="font-bold text-2xl">Finaliser Votre Commande <hr className="mt-2"/></h1>
                </div>
                <Progress className="w-auto" value={progress}/>
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem onClick={() => updateStep("-")}>
                            <PaginationPrevious href="#"/>
                        </PaginationItem>
                        <PaginationItem onClick={() => {
                            setValue(1)
                            setProgress(0)
                        }}>
                            <PaginationLink href="#"
                                            className={`${buttonProperties.default} ${i === 1 ? buttonProperties.active : ""}`}>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem onClick={() => {
                            setValue(2)
                            setProgress(50)
                        }}>
                            <PaginationLink href="#"
                                            className={`${buttonProperties.default} ${i === 2 ? buttonProperties.active : ""}`}>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem onClick={() => updateStep("+")}>
                            <PaginationNext href="#"/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                <div className="mt-10 flex flex-col w-full max-w-md mx-auto">
                    {i === 1 && <div>
                        <Card className="w-full custom-card">
                            <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                                <div className="grid gap-1 m-auto">
                                    <CardTitle>Informations de livraison</CardTitle>
                                    <CardDescription>Remplir le formulaire ci-dessous</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-1 md:gap-2">
                                    <div className="grid gap-1">
                                        <Label htmlFor="name">Nom/Prénom</Label>
                                        <Input
                                            id="name"
                                            placeholder="Entrer votre nom"
                                            type="String"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>


                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <Input
                                            id="phone"
                                            placeholder="Numéro de télephone"
                                            type="text"
                                            required
                                            onChange={(e) => setTel(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="city">Région</Label>
                                        <Select onValueChange={(value) => {
                                            setCity(value)
                                            setRegion(value)
                                        }}>
                                            <SelectTrigger className="w-auto">
                                                <SelectValue placeholder="Selectionner la région"/>
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

                                    <div className="grid gap-3">
                                        <Label htmlFor="city">Ville</Label>
                                        <Select onValueChange={(value) => {
                                            setCity(value)
                                            setVille(value)
                                        }}>
                                            <SelectTrigger className="w-auto">
                                                <SelectValue placeholder="Selectionner la ville"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {cityOptions2.map(option => (
                                                        <SelectItem className="overflow-auto" key={option.label}
                                                                    value={option.label}>{option.label}</SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Addresse</Label>
                                        <Textarea
                                            id="address"
                                            placeholder="ex: nom de la rue, numéro maison, immeuble, appartement"
                                            type="text"
                                            required
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    {/*<div className="grid gap-2 mt-3">
                                    <Label htmlFor="phone">Selectionner votre mode de paiement</Label>
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
                                */}
                                </div>
                                <br/>
                            </CardContent>
                            <CardFooter>{/* Vos éléments de pied de carte ici */}</CardFooter>
                        </Card>
                        <br/><br/><br/>
                    </div>
                    }

                    {i === 2 &&
                        <div className="my-6">
                            <Card>
                                <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                                    <div className="grid gap-1 m-auto">
                                        <CardTitle>Méthode de Paiement</CardTitle>
                                        <CardDescription>Comment souhaiter vous payer</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup defaultValue="" className="ml-3" onValueChange={(value) => {
                                        console.log("Selected value:", value)
                                        if (value === "now") {
                                            setDisplay(true)
                                            setDisplayButton(false)
                                        } else {
                                            setDisplay(false)
                                        }
                                        if (value === "later") {
                                            setDisplayButton(true)
                                        }

                                    }}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem className="size-6" value="later" id="r2"/>
                                            <div className="flex flex-col space-y-0 mt-2">
                                                <Label htmlFor="r2">Paiement à la
                                                    livraison &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                                                <CardDescription className="">Une fois votre commande
                                                    livrée</CardDescription>
                                            </div>
                                            <br/>
                                            <hr/>
                                        </div>
                                        <div className="flex items-center space-x-2 mb-3">
                                            <RadioGroupItem className="size-6" value="now" id="r2"/>
                                            <div className="flex flex-col space-y-0 mt-2">
                                                <Label htmlFor="r2">Paiement en
                                                    ligne &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
                                                <CardDescription className="">Rapide et Sécurisé
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</CardDescription>
                                            </div>
                                            <br/>
                                            <hr/>
                                        </div>

                                    </RadioGroup>
                                    <div
                                        className={`transition-opacity duration-500 opacity-0 ${display ? 'opacity-100' : 'invisible'}`}>
                                        {display && <Paypal/>}
                                    </div>
                                    <div className="flex justify-end items-end">
                                        {displayButton && <Button onClick={() => {
                                            setIsLoading(true);
                                            setTimeout(() => {
                                                //navigate('/home');
                                                setIsLoading(false)
                                                createOrder(cartData)
                                            }, 3000);
                                            setShowSuccessAlert(true);
                                            setTimeout(() => {
                                                setShowSuccessAlert(false)
                                                //navigate('/home');
                                            }, 3000);
                                        }} className="text-end bg-[#007BFF]">Valider la Commande</Button>}
                                    </div>


                                </CardContent>
                            </Card>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                    }

                </div>

            </div>

            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center z-60 w-full width: 100% bg-gray-900 bg-opacity-50 h-full height:100%">
                    <CircularProgress isIndeterminate color='#007BFF'/>
                </div>

            )}

            {/* SUCCESS ALERT*/}
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success" className="bg-green-500">
                        Panier validé avec succès
                    </Alert>
                </div>
            )}
        </div>
    )
}