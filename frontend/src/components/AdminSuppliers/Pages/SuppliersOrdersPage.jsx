import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {ResponsiveBar} from "@nivo/bar";
import {ResponsiveLine} from "@nivo/line";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../ui/table";
import {Link} from "react-router-dom";
import {Badge} from "../../ui/badge";
import axios from "axios";
import {useEffect, useState} from "react";
import {useEmail} from "../../UserContext/UserContext";

const SuppliersOrdersPage = () =>{
    axios.defaults.baseURL = "http://localhost:3001"
    const { mail } = useEmail();
    const [orderData, setOrderData] = useState([])
    const [display, setDisplay] = useState(false)
    const [cartData, setCartData] = useState([])
    const [supplierData, setSupplierData] = useState([])
    const [currentProduct, setCurrentProduct] = useState([])
    const orderFilter = (data) =>{
        return data.filter((item) => item.storeName === mail);
    };
    const cartFilter = (data) =>{
        return data.filter((item) => item.status === "validate");
    }
    const productFilter = (data,libelle)=>{
        return data.filter((item) => item.storeName === libelle);
    }
    const supplierFilter = (data) =>{
        return data.filter((item) => item.email === mail);
    };
    const getSuppliersData = async () => {
        const data = await axios.get(`/admin/all-users`)
        if (data.data.success) {
            const filtered = supplierFilter(data.data.data)
            setSupplierData(filtered)
            await getCartData()
        }
    }
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q`)
        if(data.data.success && data.data.data.length > 0){
            const filtered = cartFilter(data.data.data)
            if (filtered.length > 0) {
                setCartData(filtered)
                setDisplay(true)
            }

        }
    }

    const getOrderData = async() =>{
        const data = await axios.get(`/all-orders?q`)
        if(data.data.success && data.data.data.length > 0){
            setOrderData(data.data.data)
            console.log(data.data.data)
        }
    }
    useEffect(() => {
        if (mail){
            getSuppliersData()
            //getCartData()
            getOrderData()
        }

    }, [mail]);
    return (
        <div>
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
                                <TableHead className="text-center">Date</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        {display &&
                            <TableBody>
                                <TableRow className="text-[16px]">
                                    <TableCell className="font-medium">
                                        <Link className="text-blue-600 hover:underline" href="#">
                                            #0007
                                        </Link>
                                    </TableCell>
                                    <TableCell>APPLE WATCH SÉRIES 9 x 1</TableCell>
                                    <TableCell>30-05-2024</TableCell>
                                    <TableCell>1899.00 TND</TableCell>
                                    <TableCell>
                                        <Badge variant="warning" className="bg-[#007BFF] text-white text-[16px]">En Attente</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="text-[16px]">
                                    <TableCell className="font-medium">
                                        <Link className="text-blue-600 hover:underline" href="#">
                                            #0006
                                        </Link>
                                    </TableCell>
                                    <TableCell>Infinix Hot 30 x 1 <br/>Apple AirPods x 1</TableCell>
                                    <TableCell>30-05-2024</TableCell>
                                    <TableCell>1858.00 TND</TableCell>
                                    <TableCell>
                                        <Badge variant="warning" className="bg-[#007BFF] text-white text-[16px]">En Attente</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="text-[16px]">
                                    <TableCell className="font-medium">
                                        <Link className="text-blue-600 hover:underline" href="#">
                                            #0002
                                        </Link>
                                    </TableCell>
                                    <TableCell>Infinix Hot 30 x 2</TableCell>
                                    <TableCell>11-05-2024</TableCell>
                                    <TableCell>918.00 TND</TableCell>
                                    <TableCell>
                                        <Badge variant="warning" className="bg-green-500 text-white text-[16px]">Payé</Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        }
                    </Table>
                </CardContent>
            </Card>

        </div>
    )
}



export default SuppliersOrdersPage