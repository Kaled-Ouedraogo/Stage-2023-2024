import * as React from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog";
import {Button} from "../../ui/button";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {Textarea} from "../../ui/textarea";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { CiFilter } from "react-icons/ci";


import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../ui/pagination"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "../../ui/collapsible";
import {Checkbox} from "../../ui/checkbox";
import {ChevronDownIcon} from "../AddEditProduct/FilterProduct";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../ui/alert-dialog";
import {Alert} from "@mui/material";

const ManageUsers = () => {
    axios.defaults.baseURL = "http://localhost:3001"
    const [dataList,setDataList] = useState([])
    const [search, setSearch] = useState('');
    const [clientList, setClientList] = useState([])
    const [query, setQuery] = useState('');
    const dataFilter = (data) =>{
        return data.filter((item) => item.role === 0);
    };
    const getClientData = async() =>{
        const tempdata = await axios.get(`/all-clients`)
        if (tempdata.data.success) {
            const filtered = dataFilter(tempdata.data.data)
            setClientList(filtered)
        }
    }
    const getUsersData = async () => {
        const data = await axios.get(`/admin/all-suppliers?q=${search}`)
        if (data.data.success) {
            setDataList(data.data.data)
            console.log("nouvelle requête")
        }
    }
    const [selected, setSelected] = useState('all');


    const handleCheckboxChange = async (value) => {

        if (selected === value) {
            setSelected('');
            //if (value ==="pending") setSearch(1)
            //else if (value==="approved") setSearch(0)
        } else {
            setSelected(value);
            setSearch(3)
        }
        await getUsersData()
    };
    useEffect(() =>{
        if(search.length === 0 || search.length > 2)
            getUsersData()
    },[search])

    useEffect(()=>{
        getUsersData()
        getClientData()
    },[])
        return (
            <div>
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle>Liste des fournisseurs</CardTitle>
                        <CardDescription>Gérer les fournisseurs</CardDescription>
                        {AddUsersButton(getUsersData)}
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex flex-row mb-2">
                            <Input
                                type="text"
                                placeholder="Rechercher une boutique"
                                className="search w-fit h-fit ml-6"
                                onChange={(e) => setQuery(e.target.value)}/>
                            <div className="flex items-center space-x-2 ml-2">
                                <label htmlFor="pending" className="text-sm font-medium text-black">
                                    Status :
                                </label>
                                <input
                                    type="checkbox"
                                    id="pending"
                                    checked={selected === 'pending'}
                                    onChange={() => {
                                        handleCheckboxChange('pending')
                                        setSearch(1)
                                        //getUsersData()
                                    }}
                                    className="form-checkbox"
                                />
                                <label htmlFor="pending" className="text-sm font-medium text-black">
                                    En attente
                                </label>
                                <input
                                    type="checkbox"
                                    id="approved"
                                    checked={selected === 'approved'}
                                    onChange={() => {
                                        handleCheckboxChange('approved')
                                        setSearch(0)
                                        //getUsersData()
                                    }}
                                    className="form-checkbox"
                                />
                                <label htmlFor="approved" className="text-sm font-medium text-black">
                                    Validé
                                </label>
                            </div>

                        </div>
                        <UsersDataTable data={dataList} get={getUsersData}/>
                    </CardContent>
                    {<CardFooter><Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext href="#"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination></CardFooter>}
                </Card>


                <Card className="mt-8 bg-muted/50">
                    <CardHeader>
                        <CardTitle>Liste des clients</CardTitle>
                        <CardDescription>Gérer les clients</CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <div className="flex flex-row mb-2">
                            <Input
                                type="text"
                                placeholder="Rechercher un client"
                                className="search w-fit h-fit ml-6"
                                onChange={(e) => setQuery(e.target.value)}/>
                        </div>

                        <ClientsDataTable data={clientList} get={getClientData}/>
                    </CardContent>
                    <CardFooter><Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext href="#"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination></CardFooter>
                </Card>
            </div>

        )

}

function AddUsersButton(getUsersData) {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const role = 1
    const [code, setCode] = useState(1)
    const [tel, setTel] = useState()
    const [fax, setFax] = useState()
    const [libelle, setLibelle] = useState()
    const [address, setAddress] = useState()
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post('http://localhost:3001/register', { username, email, password, role })
            console.log(response.data);
            if (response.data.success) {
                //await getUsersData()
                // Réinitialiser le formulaire ici si nécessaire
                const res = await axios.post("http://localhost:3001/admin/add-users", {code, libelle, address, tel, email});
                //alert("Suppliers added")
                setShowSuccessAlert(true)
                setTimeout(() => {
                    setShowSuccessAlert(false)
                }, 5000);
                await getUsersData()
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0 bg-[#007BFF] hover:bg-[#007BFF]" size="sm">
                    Ajouter fournisseur
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[740px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-0.5">
                        <DialogTitle>Ajouter nouveau fournisseur</DialogTitle>
                        <DialogDescription>
                            Cliquer sur ajouter une fois terminé
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="w-full custom-card">
                        <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                            <div className="grid gap-1">
                                <CardTitle>Informations fournisseur</CardTitle>
                                <CardDescription>Entrer les informations du nouveau fournisseur</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-1 md:gap-2">
                                <div className="grid gap-1">
                                    <Label htmlFor="code">Code</Label>
                                    <Input
                                        id="code"
                                        placeholder="Enter Code"
                                        type="String"
                                        required
                                        readOnly value="Automatically Assigned"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="libelle">Nom de la boutique</Label>
                                    <Input
                                        id="libelle"
                                        placeholder="Enter le nom"
                                        type="text"
                                        required
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                            setLibelle(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="address">Adresse</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Entrer l'adresse"
                                        required
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tel">Téléphone</Label>
                                    <Input
                                        id="tel"
                                        placeholder="Téléphone du fournisseur"
                                        type="text"
                                        required
                                        onChange={(e) => setTel(e.target.value)}

                                    />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Email du fournisseur"
                                        type="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        placeholder="Mot de passe du fournisseur"
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                            </div>
                        </CardContent>
                        <CardFooter>{/* Vos éléments de pied de carte ici */}</CardFooter>
                    </Card>
                    <DialogFooter>
                        <Button type="submit" className="mt-3 bg-[#007BFF]">
                            Ajouter
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Nouveau fournisseur ajouté
                    </Alert>
                </div>
            )}
        </Dialog>
    )
}


const UsersDataTable = ({data, get}) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
    const handleDelete = async(id)=>{
        const data = await axios.delete("/admin/delete-supplier/"+id)
        if(data.data.success){
            await get()
            setShowSuccessAlert2(true)
            setTimeout(() => {
                setShowSuccessAlert2(false)
            }, 5000);
            //alert(data.data.message)
        }
    }
    const handleUpdate = async(id) =>{
        const data = await axios.put("/admin/update-supplier-status/"+id,)
        if(data.data.success){
            await get()
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            //alert("Fournisseur accepté")
        }
    }
    let num = 0
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Fournisseur</TableHead>
                    <TableHead className="text-center">Nom Boutique</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Adresse Boutique</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Tel</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element) => {
                        num++
                        return (
                            <TableRow key={element._id}>
                                <TableCell>00{num}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.libelle}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.address}</TableCell>
                                <TableCell className="text-center">{element.tel}</TableCell>
                                <TableCell className="text-center">{element.email}</TableCell>
                                {element.status === 1 ? (
                                    <TableCell className="hidden sm:table-cell"> <Button className="bg-[#28A745] text-white font-bold w-[100px] hover:bg-[#28A745]"> Validé </Button></TableCell>
                                ):(
                                    <TableCell className="hidden sm:table-cell"> <Button className="bg-[#6C757D] text-white font-bold hover:bg-[#6C757D]"> En attente </Button></TableCell>

                                )}
                                <TableCell className="text-right">
                                    <AlertDialog>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontalIcon className="w-4 h-4"/>
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {element.status === 1 && (
                                                <AlertDialogTrigger>
                                                <DropdownMenuItem>
                                                    <Button className="w-full h-10 bg-black text-white" variant="link">Supprimer</Button>
                                                </DropdownMenuItem>
                                                </AlertDialogTrigger>)}
                                            {element.status === 1 && (
                                                <DropdownMenuItem>
                                                    <Button className="w-full h-10 -mt-2" variant="link">Détails</Button>
                                                </DropdownMenuItem>
                                            )}
                                            {element.status ===0 && (
                                                <>
                                                    <DropdownMenuItem>
                                                        <Button onClick={() => {
                                                            handleUpdate(element._id)
                                                        }}
                                                            className="w-full h-10 -mt-2 bg-[#F8F9FA] text-black" variant="link" >Accepter</Button>
                                                    </DropdownMenuItem>
                                                    <AlertDialogTrigger>
                                                    <DropdownMenuItem>
                                                        <Button className="w-full h-10 -mt-2 ml-3 text-black" variant="link">Refuser</Button>
                                                    </DropdownMenuItem>
                                                    </AlertDialogTrigger>
                                                </>)}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action ne peut pas être annulée
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction className="bg-[#DC3545]" onClick={()=>handleDelete(element._id)}>Continuer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>

                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Fournisseur accepté
                    </Alert>
                </div>
            )}
            {showSuccessAlert2 && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Fournisseur supprimé
                    </Alert>
                </div>
            )}
        </Table>

    )
}


const ClientsDataTable = ({data, get}) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleDelete = async(id)=>{
        const data = await axios.delete("/admin/delete-client/"+id)
        if(data.data.success){
            await get()
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            //alert(data.data.message)
        }
    }
    const getRandomValue = () => {
        return Math.floor(Math.random() * 3);
    };
    let num = 0
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Client</TableHead>
                    <TableHead className="text-center">Nom</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Prénom</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Commandes</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">Date de création</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element) => {
                        num+=1
                        return (
                            <TableRow key={element._id}>
                                <TableCell>00{num}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.username}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.prenom}</TableCell>
                                <TableCell className="text-center">{element.email}</TableCell>
                                <TableCell className="text-center">{element.commande}</TableCell>
                                <TableCell className="hidden sm:table-cell">{element.createdAt.split('T')[0].split('-').reverse().join('-')}</TableCell>
                                <TableCell className="text-right">
                                    <AlertDialog>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontalIcon className="w-4 h-4"/>
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <AlertDialogTrigger>
                                                <DropdownMenuItem>
                                                    <Button className="w-full h-10 bg-black text-white" variant="link">Supprimer</Button>
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>

                                            <DropdownMenuItem><Button className="w-full h-10 -mt-2"
                                                                      variant="link"> Détails </Button></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action ne peut pas être annulée
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction className="bg-[#DC3545]" onClick={()=>handleDelete(element._id)}>Continuer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Compte supprimé
                    </Alert>
                </div>
            )}
        </Table>

    )
}


function MoreHorizontalIcon(props) {
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    )
}

function FilterUsers() {
    return (
        <section className="bg-white dark:bg-gray-950 py-8 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="md:text-xl font-bold">Filter Products</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Collapsible>
                        <CollapsibleTrigger className="flex text-sm items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Category</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-a"/>
                                <Label htmlFor="category-a">Category A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-b"/>
                                <Label htmlFor="category-b">Category B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-c"/>
                                <Label htmlFor="category-c">Category C</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-d"/>
                                <Label htmlFor="category-d">Category D</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger
                            className="text-sm flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Price</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="price-under50"/>
                                <Label htmlFor="price-under50">Ascending</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="price-over200"/>
                                <Label htmlFor="price-over200">Descending</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger
                            className="text-sm flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Status</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="available"/>
                                <Label htmlFor="available">Available</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="unavailable"/>
                                <Label htmlFor="unavailable">Unavailable</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </section>
    )
}

export default ManageUsers

