import * as React from "react"
import { useParams } from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../ui/card";
import {Label} from "../../../ui/label";
import {Input} from "../../../ui/input";
import {Textarea} from "../../../ui/textarea";
import {Button} from "../../../ui/button";
import axios from "axios";
import {useEffect, useState} from "react";

const EditProductSupplier = () =>{
    axios.defaults.baseURL = "http://localhost:3001/admin"

    const [productData, setProductData] = useState([]);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const { productId } = useParams();

    useEffect(() => {
        const getProductById = async (productId) => {
            try {
                const data = await axios.get("/product/"+productId);
                console.log(data);
                if(data.data.success){
                    setProductData(data.data.data);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        getProductById(productId);
    }, [productId]);


    return(
        <div className="grid md:grid-cols-2 gap-20 items-start min-w-3xl px-4 mx-auto py-6">
            <Card className="bg-muted/50">
                <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">Détails de l'article</h2>
                    <p className="text-sm font-medium leading-none">Gérer les informations de l'article</p>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="name">
                            Nom
                        </Label>
                        <Input id="name" name="name" value={productData.name} onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="name">
                            Catégorie
                        </Label>
                        <Input id="category" name="category" value={productData.category} onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="name">
                            Sous-catégorie
                        </Label>
                        <Input id="subcategory" name="subcategory" value={productData.subcategory}
                               onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="description">
                            Description
                        </Label>
                        <Textarea className="min-h-[100px]" name="description" id="description"
                                  value={productData.description} onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="price">
                            Prix
                        </Label>
                        <Input id="price" name="price" value={productData.sellPrice} type="number"
                               onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="quantity">
                            Quantité
                        </Label>
                        <Input id="quantity" name="quantity" value={productData.quantity} type="number"
                               onChange={handleOnChange}/>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm" htmlFor="name">
                            Fournisseur
                        </Label>
                        <Input id="fournisseur" name="fournisseur" value={productData.storeName} onChange={handleOnChange}/>
                    </div>
                </CardContent>
            </Card>
            <div>
                <Card className="bg-muted/50">
                    <CardHeader className="flex flex-col gap-2">
                        <h2 className="text-lg font-bold">Images</h2>
                        <p className="text-sm font-medium leading-none">Images associées au produit</p>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {productData.images && productData.images.map((image, index) => {
                                const imagePath = image.replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                                console.log(imagePath)
                                return (

                                    <img
                                        key={index}
                                        alt={`Product Image ${index}`}
                                        className="aspect-square m-2 object-cover rounded-md overflow-hidden border border-gray-200 translate-y-0 hover:translate-y-[-2px] transition-transform dark:border-gray-800"
                                        src={"http://localhost:3001/uploads/" + imagePath} // Utiliser le chemin modifié
                                        height={100}
                                        width={100}
                                    />


                                )
                                    ;
                            })}
                        </div>
                        {/*<div className="flex items-center gap-4">
                       <Button size="sm">Upload Image</Button>
                       <Button size="sm" variant="outline">
                           Remove Image
                       </Button>
                   </div>*/}
                    </CardContent>

                </Card>
                <Button className="mt-8">Sauvegarder les modifications</Button>
            </div>


        </div>
    )
}

export default EditProductSupplier