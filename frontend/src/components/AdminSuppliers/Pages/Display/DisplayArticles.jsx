import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../ui/card";
import {Input} from "../../../ui/input"
import AddDialogButton from "../../../Admin/AddEditProduct/addProduct";
import FilterProduct from "../../../Admin/AddEditProduct/FilterProduct";
import * as React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {DataTableSupplier} from "../../../Admin/Pages/ProductsPage";
import {useEmail} from "../../../UserContext/UserContext";

export default function DisplayArticles(){
    axios.defaults.baseURL = "http://localhost:3001/admin"
    const [dataList,setDataList] = useState([])
    const [subData, setSubData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');
    const { mail } = useEmail();
    const dataFilter = (data,q) =>{
        return data.filter((item) => item.email === q);
    };



    const getCategoryData = async () => {
        const data = await axios.get(`/all-categories?q=${query}`)
        if (data.data.success) {
            setCategoryData(data.data.data)
            console.log("category "+data.data.data)
        }
    }
    const getSubData = async() =>{
        const data = await axios.get(`/all-subcategories?q=${query}`)
        if (data.data.success) {
            setSubData(data.data.data)
            console.log("subcategory "+data.data.data)
        }
    }
    const getProductData = async() =>{
        const data = await axios.get(`/all-product?q=${search}`)
        if(data.data.success){
            setDataList(data.data.data)
            console.log("articles: "+data.data.data)
        }
    }

    useEffect(()=>{
        setQuery(mail)
        if(query){
            //getCategoryData()
            //getSubData()
        }
    },[query])

    useEffect(() =>{
        if(search.length === 0 || search.length > 2)
            getProductData()
        getCategoryData()
        getSubData()
    },[search])
    return(
        <div>
            <Card className="my-2">
                <CardHeader>
                    <CardTitle>Liste de vos articles</CardTitle>
                    <CardDescription>Gérer vos articles</CardDescription>
                    {AddDialogButton(getProductData,categoryData,subData)}
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        <Input
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                            placeholder="Rechercher un article"
                            type="search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="">
                    <DataTableSupplier data={dataFilter(dataList,mail)} get={getProductData}/>
                </CardContent>
            </Card>
        </div>
    )
}

function SearchIcon(props) {
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
