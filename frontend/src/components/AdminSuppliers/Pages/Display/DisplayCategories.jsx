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
import {Link} from "react-router-dom";
import {Alert} from "@mui/material";

export default function DisplayCategories (){
    axios.defaults.baseURL = "http://localhost:3001/admin"
    const [dataList,setDataList] = useState([])
    const { mail } = useEmail();
    const [query, setQuery] = useState('');
    const getCategoryData = async () => {
        const data = await axios.get(`/all-categories?q=${query}`)
        if (data.data.success) {
            setDataList(data.data.data)
            console.log(data.data.data)
        }
    }
    useEffect(()=>{
        if(query.length === 0 || query.length > 2){
            getCategoryData()
        }
    },[query])
    return(
            <Card className="my-20">
                <CardHeader>
                    <CardTitle>Liste des catégories</CardTitle>
                    <CardDescription>Gérer les catégories</CardDescription>
                    {AddCategoryButton()}
                    <Input
                        type="text"
                        placeholder="Rechercher une catégorie"
                        className="search w-1/5"
                        onChange={(e) => setQuery(e.target.value)}/>
                </CardHeader>
                <CardContent className="">
                    <CategoryDataTable data={dataList} get={getCategoryData}/>
                </CardContent>
            </Card>
    )
}


const CategoryDataTable = ({data,get}) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleDelete = async(id)=>{
        setShowSuccessAlert(true)
        setTimeout(() => {
            setShowSuccessAlert(false)
        }, 5000);
        //const data = await axios.delete("/delete-category/"+id)
        //if(data.data.success){
            //await get()
            //alert("Category Deleted")
        //}
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Catégorie</TableHead>
                    <TableHead className="min-w-[150px] text-center">Nom</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Sous-catégorie</TableHead>
                    <TableHead className="hidden md:table-cell text-center">Articles</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element)=>{
                        return(
                            <TableRow key={element._id}>
                                <TableCell className="font-medium">{element.code}</TableCell>
                                <TableCell>{element.libelle}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.subnum}</TableCell>
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
                    <Alert variant="filled" severity="warning">
                        Suppression impossible : La catégorie contient des éléments
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


function AddCategoryButton(){
    const { mail } = useEmail();
    //const [email,setEmail] = useState("")
    const [code, setCode] = useState(1)
    const [libelle, setLibelle] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/admin/add-category', { code, libelle, email:mail })
            console.log(response.data);
            if (response.data.success) {
                alert("Category added")
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0 bg-[#007BFF]" size="sm">
                    Ajouter une catégorie
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[740px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-0.5">
                        <DialogTitle>Ajouter nouvelle catégorie</DialogTitle>
                        <DialogDescription>
                            Cliquer ajouter une fois terminé
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="w-full custom-card">
                        <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                            <div className="grid gap-1">
                                <CardTitle>Information Catégorie</CardTitle>
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
                                    <Label htmlFor="libelle">Nom</Label>
                                    <Input
                                        id="libelle"
                                        placeholder="Entrer le nom de la catégorie"
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
        </Dialog>
    )
}
