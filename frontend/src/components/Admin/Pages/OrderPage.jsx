import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter} from "../../ui/card";
import {Link} from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"

import { Badge } from "../../ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../ui/breadcrumb"
import { Button } from "../../ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import { Input } from "../../ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "../../ui/pagination"
import { Progress } from "../../ui/progress"
import { Separator } from "../../ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../ui/tabs"
import axios from "axios";
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";

const OrderPage = () =>{
    axios.defaults.baseURL = "http://localhost:3001"
    const [orderData, setOrderData] = useState([])
    const buttonProperties = {
        default: "",
        attente: "bg-[#6C757D] text-white"
    };
    const [display, setDisplay] = useState(false)
    const [pendingCount, setPendingCount] = useState(0);
    const [deliveryCount, setDeliveryCount] = useState(0);
    const [displayDetails, setDisplayDetails] = useState(false)
    const [userData, setUserData] = useState([])
    const [cartData, setCartData] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [currentCart, setCurrentCart] = useState([])
    const [currentCustomer, setCurrentCustomer] = useState([])
    const [selectedRowId, setSelectedRowId] = useState(null);
    const dataFilter = (data) =>{
        return data.filter((item) => item.role === 0);
    };

    const customerCartFilter = (data,shoppingCartId) =>{
        return data.filter((item) => item._id === shoppingCartId);
    };

    const userFilter = (data,email) =>{
        return data.filter((item) => item.email === email);
    };


    const getOrderData = async() =>{
        const data = await axios.get(`/all-orders?q`)
        if(data.data.success && data.data.data.length > 0){
            setOrderData(data.data.data)
            await getClientData()
            await getCartData()
            setDisplay(true)
        }
    }


    const getClientData = async() =>{
        const tempdata = await axios.get(`/all-clients`)
        if (tempdata.data.success) {
            const filtered = dataFilter(tempdata.data.data)
            setUserData(filtered)
        }
    }
    const getCartData = async() =>{
        const data = await axios.get(`/add-to-cart?q`)
        if(data.data.success && data.data.data.length > 0){
            setCartData(data.data.data)
        }
    }

    useEffect(() => {
        if (orderData.length > 0) {
            const pendingOrders = orderData.filter(order => order.status === 'En Attente').length;
            const deliveryOrders = orderData.filter(order => order.status === 'En Livraison').length;

            setPendingCount(pendingOrders);
            setDeliveryCount(deliveryOrders);
        }

    }, [orderData]);

    useEffect(() => {
            getOrderData()
            getClientData()
            getCartData()
    }, []);

    useEffect(() => {
        if (orderData.length > 0) {
            const firstOrder = orderData[0];
            const customer = userFilter(userData, firstOrder.userEmail);
            const customerCart = customerCartFilter(cartData, firstOrder.shoppingCartId);

            if (customer.length && customerCart.length) {
                setCurrentOrder(firstOrder);
                setCurrentCart(customerCart);
                setCurrentCustomer(customer);
                setSelectedRowId(firstOrder._id);
                setDisplayDetails(true);
            }
        }
    }, [orderData, userData, cartData]);
    return (
        <div className="flex min-h-screen w-full flex-col ">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Rechercher "
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card className="sm:col-span-2 bg-amber-50" x-chunk="dashboard-05-chunk-0">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Gérer les commandes</CardTitle>
                                    <CardDescription className="max-w-lg text-balance leading-relaxed text-[17px]">
                                        Consulter les détails de chaque commande <br/> Changer l'état des commandes
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button className="m-auto bg-[#007BFF]">Exporter La Liste</Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-1" className="bg-amber-50">
                                <CardHeader className="pb-2">
                                    <CardDescription>En Attente</CardDescription>
                                    <CardTitle className="text-4xl text-[#007BFF]">0{pendingCount}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Commandes
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={25} aria-label="25% increase" />
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-05-chunk-2" className="bg-amber-50">
                                <CardHeader className="pb-2">
                                    <CardDescription>Livraison En Cours</CardDescription>
                                    <CardTitle className="text-4xl text-[#007BFF]">0{deliveryCount}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        Commandes
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={12} aria-label="12% increase" />
                                </CardFooter>
                            </Card>
                        </div>
                        <Tabs defaultValue="week">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="week">Semaine</TabsTrigger>
                                    <TabsTrigger value="month">Mois</TabsTrigger>
                                    <TabsTrigger value="year">Année</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 gap-1 text-sm"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only">Filtrer</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Filter par</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                En Attente
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Livraison En Cours
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Annulée
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <File className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Exporter</span>
                                    </Button>
                                </div>
                            </div>
                            <TabsContent value="week">
                                <Card x-chunk="dashboard-05-chunk-3" className="mt-4 bg-muted/100">
                                    <CardHeader className="px-7">
                                        <CardTitle>Liste des commandes</CardTitle>
                                        <CardDescription>
                                            Gérer les commandes
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent >
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-center">Client</TableHead>
                                                    <TableHead className="hidden sm:table-cell text-center">
                                                        Mode de Paiement
                                                    </TableHead>
                                                    <TableHead className="hidden sm:table-cell text-center">
                                                        Status
                                                    </TableHead>
                                                    <TableHead className="hidden md:table-cell text-center">
                                                        Date
                                                    </TableHead>
                                                    <TableHead className="text-right">Montant</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            {display &&
                                                <TableBody>
                                                    {orderData.map((element) => {
                                                        const customer = userFilter(userData,element.userEmail)
                                                        const customerCart = customerCartFilter(cartData, element.shoppingCartId)

                                                        return(
                                                            <TableRow onClick={()=> {
                                                                setCurrentOrder(element)
                                                                setCurrentCart(customerCart)
                                                                setCurrentCustomer(customer)
                                                                setSelectedRowId(element._id);
                                                                setDisplayDetails(true)
                                                            }} key={element._id} className={`cursor-pointer ${selectedRowId === element._id ? 'bg-amber-50 hover:bg-amber-50' : ''}`}>
                                                            <TableCell>
                                                                <div className="font-medium">{customer[0].username+" "+customer[0].prenom}</div>
                                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                                    {element.userEmail}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                {element.paymentMethod}
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                {element.status === "En Attente" ? (
                                                                    <Badge className="text-xs" variant="outline">
                                                                        {element.status}
                                                                    </Badge>
                                                                ) : element.status === "Annulée" ? (
                                                                    <Badge className="text-xs bg-[#DC3545] text-white" variant="outline">
                                                                        {element.status}
                                                                    </Badge>
                                                                ) : element.status === "En Livraison" ? (
                                                                        <Badge className="text-xs bg-[#FFC107] text-black" variant="outline">
                                                                            {element.status}
                                                                        </Badge>
                                                                ) : (
                                                                    <Badge className="text-xs bg-green-500 text-white" variant="outline">
                                                                        {element.status}
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                {element.orderDate.split('T')[0].split('-').reverse().join('-')}
                                                            </TableCell>
                                                            <TableCell className="text-right">{customerCart[0].totalPriceTTC} TND</TableCell>
                                                        </TableRow>
                                                        )
                                                    })}

                                                </TableBody>
                                            }

                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                    {displayDetails && currentOrder && <><OrderDetails customerOrder={currentOrder} customer={currentCustomer} customerCart={currentCart} get={getOrderData} /></>  }
                </main>
            </div>
        </div>
    )
}

const OrderDetails = ({customerOrder, customer, customerCart, get}) =>{
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleUpdateConfirm = async(id) =>{
        const data = await axios.put("http://localhost:3001/admin/update-order-status-confirm/"+id,)
        if(data.data.success){
            await get()
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            //alert("Fournisseur accepté")
        }
    }

    const handleUpdateCancel = async(id) =>{
        const data = await axios.put("http://localhost:3001/admin/update-order-status-cancel/"+id,)
        if(data.data.success){
            await get()
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            //alert("Fournisseur accepté")
        }
    }

    return (
        <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-start bg-gray-100 ">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Commande #000{customerOrder.code}
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3"/>
                                <span className="sr-only">Copy Order ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription className="flex items-start">Date: {customerOrder.orderDate.split('T')[0].split('-').reverse().join('-')}</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-8 gap-1 bg-amber-200">
                            <Truck className="h-3.5 w-3.5"/>
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      {customerOrder.status}
                    </span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5"/>
                                    <span className="sr-only">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>handleUpdateConfirm(customerOrder._id)}>Terminer la commande</DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>handleUpdateCancel(customerOrder._id)}>Annuler la commande</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Supprimer</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Détails Commande</div>
                        <ul className="grid gap-3">
                            {customerCart[0].products.map((item) => (
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {item.productName} x <span>{item.quantity}</span>
                                    </span>
                                    <span>{item.price.toFixed(2)} TND</span>
                                </li>
                            ))}
                        </ul>
                        <Separator className="my-2"/>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Sous-total (HT)</span>
                                <span>{(customerCart[0].totalPriceTHT).toFixed(2)} TND</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>{(customerCart[0].totalPriceTVA).toFixed(2)} TND</span>
                            </li>
                            <li className="flex items-center justify-between font-semibold">
                                <span className="text-muted-foreground">Total</span>
                                <span>{customerCart[0].totalPriceTTC} TND</span>
                            </li>
                        </ul>
                    </div>
                    <Separator className="my-4"/>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid gap-3">
                            <div className="font-semibold">Addresse de Livraison</div>
                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                <span>{customerOrder.region}</span>
                                <span>{customerOrder.ville}</span>
                                <span>{customerOrder.address}</span>
                            </address>
                        </div>
                    </div>
                    <Separator className="my-4"/>
                    <div className="grid gap-3">
                        <div className="font-semibold">Informations du Client</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Client</dt>
                                <dd>{customer[0].username+" "+ customer[0].prenom}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Email</dt>
                                <dd>
                                    <a href="mailto:">{customer[0].email}</a>
                                </dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">Phone</dt>
                                <dd>
                                    <a href="tel:">+216 {customerOrder.tel}</a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <Separator className="my-4"/>
                    <div className="grid gap-3">
                        <div className="font-semibold">Informations de Paiement</div>
                        <dl className="grid gap-3">
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center gap-1 text-muted-foreground">
                                    <CreditCard className="h-4 w-4"/>
                                    Payment
                                </dt>
                                <dd>{customerOrder.paymentMethod}</dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
            </Card>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Modification enregistrée
                    </Alert>
                </div>
            )}
        </div>
    )
}

export default OrderPage