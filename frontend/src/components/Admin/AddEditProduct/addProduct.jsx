import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "../../ui/card";
import {Button} from "../../ui/button";
import {Label} from "../../ui/label";
import {Textarea} from "../../ui/textarea"
import {Input} from "../../ui/input";
import {useEffect, useRef, useState} from "react";
import {Alert} from "@mui/material";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import {FaFileUpload} from "react-icons/fa";
import axios from "axios";
import { useEmail } from "../../UserContext/UserContext";
function AddDialogButton(getProductData,categoryData,subData) {
    const [category, setCategory] = React.useState("");
    const [code, setCode] = useState(1)
    const [subcategory, setSubCategory] = React.useState("");
    const [tva, setTva] = React.useState("");
    const [image, setImage] = useState([]);
    const [files, setFiles] = useState(null);
    const inputRef = useRef(null);
    const [subDataList, setSubDataList] = useState([]);
    const [nomBoutique, setNomBoutique] = useState("");
    const tvaOptions = [];
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    for (let i = 1; i <= 50; i++) {
        tvaOptions.push({ value: i.toString(), label: `${i}%` });
    }
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.category === q);
    };

    const { mail } = useEmail();


    function handleImageUpload(){
        if(!files){
            console.log("no file selected");
            return;
        }
        const fd = new FormData();
        for (let i=0; i<files.length; i++){
            fd.append(`files${i+1}`,files[i]);
        }
    }
    const handleImageChange = (e) => {
        setImage(e.target.files);
        console.log(e.target.files)
    };

    const handleIconClick = () => {
        inputRef.current.click();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (image.length === 0) {
            alert("Please upload at least one image.");
            return;
        }
        /*
        const price = parseFloat(e.target.purchasePrice.value);
        if (isNaN(price) || !isFinite(price)) {
            alert("Please enter a valid price.");
            e.target.price.focus();
            return;
        }*/
        try {
            const formData = new FormData();
            formData.append('code',code)
            formData.append('name', e.target.name.value);
            formData.append('category', category);
            formData.append('subcategory', subcategory);
            formData.append('purchasePrice', e.target.purchasePrice.value);
            formData.append('sellPrice', e.target.sellPrice.value);
            formData.append('tva', tva);
            formData.append('description', e.target.description.value);
            formData.append('quantity', e.target.quantity.value);
            formData.append('email', mail)
            formData.append('storeName',nomBoutique)
            //formData.append('images', image);

            for (let i=0; i<image.length; i++){
                formData.append('images',image[i]);
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const response = await axios.post("http://127.0.0.1:3001/admin/add-product", formData, config);
            console.log(response.data);
            if (response.data.success) {
                //alert(response.data.message);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(false)
                    console.log("succesfully added")
                }, 5000);

                await getProductData()
                // Réinitialiser le formulaire ici si nécessaire
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            // Gérer l'erreur ici (afficher un message d'erreur, journaliser, etc.)
        }
    };

    const getInfo = async() =>{
        const data = await axios.get(`http://127.0.0.1:3001/admin/one-supplier/${mail}`)
        console.log(data)
        if(data.data.success && data.data.data.length >0){
            setNomBoutique(data.data.data[0].libelle)
        }
    }


    useEffect(() =>{
        getProductData()
        console.log("why"+categoryData[0])
        getInfo()
    },[])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0 bg-[#007BFF] hover:bg-[#007BFF]" size="sm">
                    Ajouter un article
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[805px] overflow-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-0.5">
                        <DialogTitle>Ajouter nouveau produit</DialogTitle>
                        <DialogDescription>
                            Cliquer sur ajouter une fois terminé
                        </DialogDescription>
                    </DialogHeader>
                    <Card className="w-full custom-card">
                        <CardHeader className="flex flex-row space-y-0 items-start gap-1">
                            <div className="grid gap-1">
                                <CardTitle>Informations produit</CardTitle>
                                <CardDescription>Entrer les informations du nouveau produit</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-1 md:gap-2">
                                <div className="grid gap-1">
                                    <Label htmlFor="name">Nom</Label>
                                    <Input
                                        id="name"
                                        placeholder="Entrer le nom"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="category">Categorie</Label>
                                    <Select onValueChange={(value) => {
                                        console.log("Selected value:", value)
                                        setCategory(value)
                                        const filtered = dataFilter(subData, value)
                                        setSubDataList(filtered)
                                        console.log("avant" + subData)
                                        console.log("apres" + filtered)
                                    }}>
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="Selectionner une categorie"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select One</SelectLabel>
                                                {
                                                    categoryData.map((element) => {
                                                        return (
                                                            <SelectItem value={element.libelle}
                                                                        key={element._id}>{element.libelle}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="subcategory">Sous-catégorie</Label>
                                    <Select onValueChange={(value) => {
                                        setSubCategory(value)
                                    }}>
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="Selectionner une sous-catégorie"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select One</SelectLabel>
                                                {
                                                    subDataList.map((element) => {
                                                        return (
                                                            <SelectItem value={element.libelle}
                                                                        key={element._id}>{element.libelle}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="purchasePrice">Prix d'achat</Label>
                                    <Input
                                        id="purchasePrice"
                                        placeholder="Entrer le prix d'achat..."
                                        type="text"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="sellPrice">Prix de vente</Label>
                                    <Input
                                        id="sellPrice"
                                        placeholder="Entrer le prix de vente..."
                                        type="text"
                                        required
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="tva">TVA</Label>
                                    <Select onValueChange={(value) => {
                                        setTva(value)
                                    }}>
                                        <SelectTrigger className="w-auto">
                                            <SelectValue placeholder="Selectionner un %"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select One</SelectLabel>
                                                {tvaOptions.map(option =>(
                                                    <SelectItem key={option.value} value={option.value} >{option.value} %</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Entrer la description du produit..."
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity">Quantité</Label>
                                    <Input
                                        id="quantity"
                                        placeholder="Entrer la quantité du produit..."
                                        type="number"
                                        required
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <Label>Images</Label>
                                    <div className="flex items-center gap-1 mt-4">
                                        <div
                                            className="aspect-square rounded-md bg-gray-600 flex items-center justify-center mr-3"
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundImage: ``,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundColor: "lightgray"
                                            }}
                                        >
                                            <FaFileUpload size="20" className="cursor-pointer"
                                                          onClick={handleIconClick}/>
                                            <input name="picture" id="images" ref={inputRef} type="file" multiple
                                                   onChange={handleImageChange}
                                                   style={{display: "none"}}/>
                                        </div>


                                        {Array.from({length: image.length}, (_, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded-md bg-gray-600 flex items-center justify-center mr-3"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    backgroundImage: `url(${URL.createObjectURL(image[index])})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundColor: "lightgray"
                                                }}
                                            />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>{/* Vos éléments de pied de carte ici */}</CardFooter>
                    </Card>
                    <DialogFooter>
                        <Button type="submit" className="mt-3">
                            Ajouter
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            {showSuccessAlert &&
                <div className="fixed top-24 right-4">
                    <Alert variant="filled" severity="success">
                        Article ajouté
                    </Alert>
                </div>
            }
        </Dialog>
    );
}


export default AddDialogButton