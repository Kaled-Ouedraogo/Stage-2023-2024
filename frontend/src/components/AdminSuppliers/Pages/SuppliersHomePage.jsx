import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../ui/table";
import {Link} from "react-router-dom";
import {Badge} from "../../ui/badge";
import { useEmail } from "../../UserContext/UserContext";
import { IoCashOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import axios from "axios";
import {useEffect, useState} from "react";

import {Alert} from "@mui/material";

const SuppliersHomePage = () =>{
    axios.defaults.baseURL = "http://localhost:3001/admin"

    const [dataList,setDataList] = useState([])
    const [search, setSearch] = useState('');
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.email === q);
    };
    const getProductData = async() => {
        const data = await axios.get(`/all-product?q=${search}`)
        if (data.data.success) {
            setDataList(data.data.data)
            console.log("articles: " + data.data.data)
        }
    }
    const { mail } = useEmail();
    console.log(mail)
    useEffect(() =>{
        getProductData()
    },[])
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-[#dbe4fc]">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Total Ventes</CardTitle>
                        <IoCashOutline className=""/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">918 TND</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">+10% Ce Mois</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#dbe4fc]">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Total Commandes</CardTitle>
                        <HiOutlineShoppingBag />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">03</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2 Annulée</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#dbe4fc]">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="capitalize">Nombre de vos articles</CardTitle>
                        <PackageIcon/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">04</div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-2 gap-6">

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Commandes récentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="justify-center">
                                    <TableHead className="text-center">Code Commande</TableHead>
                                    <TableHead className="text-center">Articles</TableHead>
                                    <TableHead className="text-center">Total</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                                <TableBody>
                                    <TableRow className="text-[16px]">
                                        <TableCell className="font-medium">
                                            <Link className="text-blue-600 hover:underline" href="#">
                                                #0007
                                            </Link>
                                        </TableCell>
                                        <TableCell>APPLE WATCH SÉRIES 9 x 1</TableCell>
                                        <TableCell>1899.00 TND</TableCell>
                                        <TableCell>
                                            <Badge variant="warning" className="bg-[#007BFF] text-white text-[12px]">En Attente</Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="text-[16px]">
                                        <TableCell className="font-medium">
                                            <Link className="text-blue-600 hover:underline" href="#">
                                                #0006
                                            </Link>
                                        </TableCell>
                                        <TableCell>Infinix Hot 30 x 1 <br/>Apple AirPods x 1</TableCell>
                                        <TableCell>1858.00 TND</TableCell>
                                        <TableCell>
                                            <Badge variant="warning" className="bg-[#007BFF] text-white text-[12px]">En Attente</Badge>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="text-[16px]">
                                        <TableCell className="font-medium">
                                            <Link className="text-blue-600 hover:underline" href="#">
                                                #0002
                                            </Link>
                                        </TableCell>
                                        <TableCell>Infinix Hot 30 x 2</TableCell>
                                        <TableCell>918.00 TND</TableCell>
                                        <TableCell>
                                            <Badge variant="warning" className="bg-green-500 text-white text-[12px]">Payé</Badge>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Liste des articles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTableSupplierForHome data={dataFilter(dataList,mail)} get={getProductData}/>
                    </CardContent>
                </Card>
            </div>


        </div>
    )
}



function PackageIcon() {
    return (
        <svg
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
            <path d="m7.5 4.27 9 5.15"/>
            <path
                d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


const DataTableSupplierForHome = ({data, get}) => {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    let itemNumber = 0;
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Article</TableHead>
                    <TableHead className="min-w-[150px] text-center">Nom</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Catégorie</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Sous-catégorie</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Quantité</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">Image</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element)=>{
                        itemNumber++;
                        const allImages = []
                        for(let i=0; i<element.images.length; i++){
                            allImages[i] = element.images[i].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                            if (i===0) break
                        }
                        const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                        return(
                            <TableRow key={element._id}>
                                <TableCell className="font-medium">{itemNumber}</TableCell>
                                <TableCell>{element.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.category}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.subcategory}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.quantity}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex flex-row">
                                        {allImages.map((image, index) => (
                                            <img
                                                key={index}
                                                alt={`Product Image ${index + 1}`}
                                                className="aspect-square m-2 object-cover rounded-md overflow-hidden border border-gray-200 translate-y-0 hover:translate-y-[-2px] transition-transform dark:border-gray-800"
                                                src={"http://localhost:3001/uploads/" + image}
                                                height={50}
                                                width={50}
                                            />
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Article supprimé
                    </Alert>
                </div>
            )}
        </Table>

    )
}

export default SuppliersHomePage