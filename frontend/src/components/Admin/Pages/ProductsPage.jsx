import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../ui/alert-dialog"
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";
import axios from "axios"
import {useEffect, useState} from "react";
import AddDialogButton from "../AddEditProduct/addProduct";
import FilterProduct from "../AddEditProduct/FilterProduct";
import {Form, Link} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {ModeToggle} from "../../ThemeProvider/ModeToogle";
import DisplayCategories from "../../AdminSuppliers/Pages/Display/DisplayCategories";
import DisplaySubCategories from "../../AdminSuppliers/Pages/Display/DisplaySubCategories";
import {Alert} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const ProductsPage = () =>{
    axios.defaults.baseURL = "http://localhost:3001/admin"
    const [dataList,setDataList] = useState([])
    const [confirmation, setConfirmation] = useState(false);
    const getProductData = async() =>{
        const data = await axios.get(`/all-product?q=${query}`)
        console.log(data)
        if(data.data.success){
            setDataList(data.data.data)
        }
    }
    const [query, setQuery] = useState('');
    useEffect(()=>{
        if(query.length === 0 || query.length > 2)
            console.log(query)
            getProductData()
    },[query])
    console.log(dataList)

    const handleDelete = async(id)=>{
        const data = await axios.delete("/delete-product/"+id)
        if(data.data.success){
            await getProductData()
            //alert(data.data.message)
        }
    }
    let itemNumber = 0;
    const keys = ["name"]
     const search = (dataList)=>{
         return dataList.filter(
             (item) =>
                 keys.some(key=>item[key].toLowerCase().includes(query))
         )
     }
    const [display, setDisplay] = useState("articles");
    return(
        <div>
            {/*<ModeToggle/>*/}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="bg-amber-50">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Catégories : 5</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("categories")} className=" bg-[#007BFF]">
                            <FiEdit className="mr-2 h-4 w-4"/> Afficher
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-amber-50">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Sous Catégories : 12</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("subcategories")} className="bg-[#007BFF]">
                            <FiEdit className="mr-2 h-4 w-4"/> Afficher
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-amber-50">
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Articles : 12</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("articles")} className="bg-[#007BFF]">
                            <FiEdit className="mr-2 h-4 w-4"/> Afficher
                        </Button>
                    </CardContent>
                </Card>
            </div>
            {display ==="articles" && (
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Liste des articles</CardTitle>
                    <CardDescription>Gérer les articles</CardDescription>
                    {FilterProduct()}
                    <Input
                        type="text"
                        placeholder="Rechercher un article"
                        className="search w-fit "
                        onChange={(e) => setQuery(e.target.value)}/>
                </CardHeader>
                <CardContent className="">
                    <DataTable data={dataList} get={getProductData}/>
                </CardContent>
            </Card>)}
            {display==="categories" && (<DisplayCategories/>)}
            {display==="subcategories" && (<DisplaySubCategories/>)}
        </div>
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
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
        </svg>
    )
}


export const DataTable = ({data, get}) => {

    const handleDelete = async (id) => {
        const data = await axios.delete("/delete-product/" + id)
        if (data.data.success) {
            await get()
            alert(data.data.message)
        }
    }
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
                    <TableHead className="text-center">Prix</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                   data.map((element)=>{
                        itemNumber++;
                       const allImages = []
                       for(let i=0; i<element.images.length; i++){
                           allImages[i] = element.images[i].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                           if (i===1) break
                       }
                       const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                       return(
                            <TableRow key={element._id}>
                                <TableCell className="font-medium">{itemNumber}</TableCell>
                                <TableCell>{element.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.category}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.subcategory}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.quantity}</TableCell>
                                <TableCell className="text-center">{element.sellPrice} TND</TableCell>
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
                                            <DropdownMenuItem>
                                                <AlertDialogTrigger>
                                                <Button className="w-full h-10 text-white bg-[#DC3545]" variant="link">Supprimer
                                                </Button>
                                                </AlertDialogTrigger>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem> <Link to={'/admin/products/'+element._id}> <Button className="w-full h-10 -mt-2 ml-1" variant="link"> Modifier </Button></Link></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet article ?</AlertDialogTitle>
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
        </Table>

    )
}

export const DataTableSupplier = ({data, get}) => {

    const handleDelete = async (id) => {
        const data = await axios.delete("/delete-product/" + id)
        if (data.data.success) {
            await get()
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 3000);
        }
    }
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
                    <TableHead className="text-center">Prix</TableHead>
                    <TableHead className="hidden sm:table-cell text-center">Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element)=>{
                        itemNumber++;
                        const allImages = []
                        for(let i=0; i<element.images.length; i++){
                            allImages[i] = element.images[i].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                            if (i===1) break
                        }
                        const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                        return(
                            <TableRow key={element._id}>
                                <TableCell className="font-medium">{itemNumber}</TableCell>
                                <TableCell>{element.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.category}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.subcategory}</TableCell>
                                <TableCell className="hidden md:table-cell">{element.quantity}</TableCell>
                                <TableCell className="text-center">{element.sellPrice} TND</TableCell>
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
                                                <DropdownMenuItem>
                                                    <AlertDialogTrigger>
                                                        <Button className="w-full h-10 text-white bg-[#DC3545]" variant="link">Supprimer</Button>
                                                    </AlertDialogTrigger>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem> <Link to={'/suppliers/products/'+element._id}> <Button className="w-full h-10 -mt-2 ml-1" variant="link"> Modifier </Button></Link></DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet article ?</AlertDialogTitle>
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
                        Article supprimé
                    </Alert>
                </div>
            )}
        </Table>

    )
}



export default ProductsPage