import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../ui/card";
import * as React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../../ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../../ui/dropdown-menu";
import {Button} from "../../../ui/button";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../../ui/dialog";
import {Label} from "../../../ui/label";
import {Input} from "../../../ui/input";
import { useEmail } from "../../../UserContext/UserContext";
import {Alert} from "@mui/material";

export default function DisplaySubCategories (){
    axios.defaults.baseURL = "http://localhost:3001/admin"
    const [dataList,setDataList] = useState([])
    const [subDatalist, setSubData] = useState([])
    const { mail } = useEmail();
    const [query, setQuery] = useState('');
    const getCategoryData = async () => {
        const data = await axios.get(`/all-categories`)
        if (data.data.success) {
            setDataList(data.data.data)
        }
    }
    const getSubData = async() =>{
        const data = await axios.get(`/all-subcategories?q=${query}`)
        if (data.data.success) {
            setSubData(data.data.data)
            console.log(data.data.data[0].libelle)
        }
    }
    useEffect(()=>{
        if(query.length === 0 || query.length > 2)
        {
            getCategoryData()
            getSubData()
        }

    },[query])
    return(
        <Card className="my-20">
            <CardHeader>
                <CardTitle>Liste des sous-catégories</CardTitle>
                <CardDescription>Gérer les sous-catégories</CardDescription>
                {AddButton(dataList,getSubData)}
                <Input
                    type="text"
                    placeholder="Rechercher une sous-catégorie"
                    className="search w-1/5"
                    onChange={(e) => setQuery(e.target.value)}/>
            </CardHeader>
            <CardContent className="">
                <SubCategoryDataTable data={subDatalist} get={getSubData}/>
            </CardContent>
        </Card>
    )
}


const SubCategoryDataTable = ({data, get}) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleDelete = async(id)=>{
        const data = await axios.delete("/delete-subcategory/"+id)
        if(data.data.success){
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000);
            await get()
            //alert("SubCategory Deleted")
        }
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-[150px] text-center">Nom</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Catégorie</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Article</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element)=>{
                        return(
                            <TableRow key={element._id}>
                                <TableCell>{element.libelle}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.category}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.productnum}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontalIcon className="w-4 h-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem><Button className="w-full h-10 bg-black text-white" variant="link" onClick={()=>handleDelete(element._id)}>Supprimer</Button></DropdownMenuItem>

                                            <DropdownMenuItem> <Button className="w-full h-10 -mt-2" variant="link">Modifier</Button></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
            </TableBody>
            {showSuccessAlert && (
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Sous-Catégorie Supprimée
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


function AddButton(data, getSubData){
    const { mail } = useEmail();
    const [code, setCode] = useState(1)
    const [libelle, setLibelle] = useState()
    const [category, setCategory] = useState("")
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/admin/add-subcategory', { code, libelle, category, email:mail })
            console.log(response.data);
            if (response.data.success) {
                //alert("Sub Category added")
                await getSubData()
                setShowSuccessAlert(true)
                setTimeout(() => {
                    setShowSuccessAlert(false)
                }, 5000);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    console.log("operationnel : "+data)
    console.log(category)
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0 bg-[#007BFF]" size="sm">
                    Ajouter une sous-catégorie
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[740px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-0.5">
                        <DialogTitle>Ajouter une sous-catégorie</DialogTitle>
                        <DialogDescription>
                            Cliquer ajouter une fois terminé
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="w-full custom-card">
                        <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                            <div className="grid gap-1">
                                <CardTitle>Informations sous-catégorie</CardTitle>
                                <CardDescription>Entrer les informations</CardDescription>
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
                                    <Label htmlFor="category">Categorie</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Input className="pr-8" id="dropdown" placeholder="Selectionner une catégorie" type="text" readOnly value={category}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full content-start justify-start mr-20 flex-col ">
                                            <DropdownMenuLabel>Select One</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {
                                                data.map((element)=>{
                                                    return(
                                                        <DropdownMenuItem onClick={() => setCategory(element.libelle)} key={element._id}>{element.libelle}</DropdownMenuItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="libelle">Nom</Label>
                                    <Input
                                        id="libelle"
                                        placeholder="Entrer le nom de la sous-catégorie"
                                        type="text"
                                        required
                                        onChange={(e) => setLibelle(e.target.value)}
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
                        Sous-Catégorie ajoutée
                    </Alert>
                </div>
            )}
        </Dialog>
    )
}

function CategoryInput() {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="dropdown">Select an option</Label>
            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Input className="pr-8" id="dropdown" placeholder="Select an option" type="text" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Option 1</DropdownMenuItem>
                        <DropdownMenuItem>Option 2</DropdownMenuItem>
                        <DropdownMenuItem>Option 3</DropdownMenuItem>
                        <DropdownMenuItem>Option 4</DropdownMenuItem>
                        <DropdownMenuItem>Option 5</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <ChevronDownIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
        </div>
    )
}

function ChevronDownIcon(props) {
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
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}
