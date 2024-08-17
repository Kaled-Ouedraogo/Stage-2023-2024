import * as React from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import { Label } from "../ui/label"
import {Button} from "../ui/button";
import {Link} from "react-router-dom";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "../ui/select"
import test from "../Assets/uploads/1713402110892-joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg"

export default function OneProductPage({updateCartNumber}){
    const [productData, setProductData] = useState([]);
    const [currentImage, setCurrentImage] = useState([]);

    axios.defaults.baseURL = "http://localhost:3001/admin"
    const { productId } = useParams();
    const [dataList,setDataList] = useState([])
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.category === q);
    };
    const getProductData = async(article) =>{
        const data = await axios.get("/all-product")
        console.log(data)
        if(data.data.success){
            const filtered = dataFilter(data.data.data,article.category)
            const filtered_2 = filtered.filter((item) => item.name !== article.name);
            setDataList(filtered_2)
        }
    }
    useEffect(() => {
        const getProductById = async (productId) => {
            try {
                const data = await axios.get("/product/"+productId);
                console.log(data);
                if(data.data.success){
                    setProductData(data.data.data);
                    setCurrentImage(data.data.data.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '')
                )
                    await getProductData(data.data.data);

                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        getProductById(productId);
    }, [productId]);
    const options = [];
    for (let i = 1; i <= 100; i++) {
        options.push(<SelectItem key={i} value={""+i}>{i}</SelectItem>);
    }
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
                <div className="grid md:grid-cols-5 gap-3 items-start">
                    <div className="md:col-span-4">
                        {currentImage && (
                            <img
                                alt="Product Image"
                                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                                height={600}
                                src={"http://localhost:3001/uploads/" + currentImage}
                                width={600}
                            />
                        )}

                        <div className="grid grid-cols-4 gap-4 mt-5">
                            {productData.images && productData.images.map((image, index) => {
                                const imagePath = image.replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                                console.log(imagePath)
                                return (

                                    <img
                                        alt="Thumbnail 1"
                                        className="object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800 w-[100px] h-[100px] cursor-pointer"
                                        height={100}
                                        src={"http://localhost:3001/uploads/" + imagePath}
                                        width={100}
                                        onClick={(e) => setCurrentImage(imagePath)}
                                    />


                                )
                                    ;
                            })}
                        </div>
                    </div>
                </div>
                <div className=" flex-col md:gap-10 sm:w-auto">
                    <div className="grid gap-3 ">
                        <h1 className="font-bold text-3xl lg:text-4xl">{productData.name}</h1>
                        <div>
                            <p>{productData.description}</p>
                        </div>
                        {/*<div className="flex items-center gap-4 justify-center mb-5">
                            <div className="flex items-center gap-0.5">
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-primary"/>
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground"/>
                            </div>
                        </div>*/}
                    </div>
                    <form className="grid gap-4 md:gap-10 md:w-full sm:w-fit sm:m-auto">
                        {/*<div className="grid gap-2">
                            <Label className="text-base" htmlFor="color">
                                Color
                            </Label>
                            <RadioGroup className="flex items-center gap-2 m-auto" defaultValue="black" id="color">
                                <Label
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                    htmlFor="color-black"
                                >
                                    <RadioGroupItem id="color-black" value="black"/>
                                    Black
                                </Label>
                                <Label
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                    htmlFor="color-white"
                                >
                                    <RadioGroupItem id="color-white" value="white"/>
                                    White
                                </Label>
                                <Label
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                    htmlFor="color-blue"
                                >
                                    <RadioGroupItem id="color-blue" value="blue"/>
                                    Blue
                                </Label>
                            </RadioGroup>
                        </div>
                        */}
                        <div className="grid gap-2 text-gray-700 mt-3">
                            <p>{productData.category} > {productData.subcategory}</p>
                        </div>
                        <div className="grid gap-2 m-auto">
                            {productData.sellPrice && <Label className="text-base" htmlFor="quantity">
                                Prix : {productData.sellPrice.toFixed(2)} TND
                            </Label>}

                        </div>
                        <div className="grid gap-2 m-auto">
                            <Label className="text-base" htmlFor="quantity">
                                Quantité
                            </Label>
                            <Select defaultValue="1">
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Select"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {options}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button size="lg">Ajouter au panier</Button>
                    </form>
                </div>
            </div>
            <section className="bg-gray-100 dark:bg-gray-800 py-8">
                <div className="max-w-6xl px-4 md:px-6 mx-auto">
                    <div className="grid gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Produits similaires</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {dataList.map((element)=>{
                                const imagePath = element.images[0].replace('..\\frontend\\src\\components\\', '').replace('Assets\\uploads\\', '');
                                return (
                                    <div
                                        className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
                                        <Link to={'/shop/'+element._id} className="block" href="#">
                                            <img
                                                alt="Product Image"
                                                className="w-full h-60 object-cover"
                                                height="200"
                                                src={"http://localhost:3001/uploads/" + imagePath}
                                                style={{
                                                    aspectRatio: "300/200",
                                                    objectFit: "cover",
                                                }}
                                                width="300"
                                            />
                                        </Link>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold">
                                                <Link href="#">{element.name}</Link>
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">{element.subcategory}</p>
                                            <p className="font-semibold text-base">{element.sellPrice.toFixed(2)} TND</p>
                                        </div>
                                    </div>

                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function StarIcon(props) {
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
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}