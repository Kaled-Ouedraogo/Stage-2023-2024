import * as React from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../ui/card";
import {ResponsiveBar} from "@nivo/bar";
import {ResponsiveLine} from "@nivo/line";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../ui/table";
import {Button} from "../../ui/button"
import {Link} from "react-router-dom";
import {Badge} from "../../ui/badge";
import {EnvelopeOpenIcon} from "@radix-ui/react-icons";
import { FiEdit } from "react-icons/fi";
import DisplayCategories from "./Display/DisplayCategories";
import {useEffect, useState} from "react";
import DisplaySubCategories from "./Display/DisplaySubCategories";
import DisplayComponent from "./Display/DisplayComponent";
import DisplayArticles from "./Display/DisplayArticles";

const SuppliersProductsPage = () =>{
    const [display, setDisplay] = useState("");
    return (
        <div>
            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Categories : 5</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("categories")}>
                            <FiEdit className="mr-2 h-4 w-4"/> Display
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Sub Categories : 10</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("subcategories")}>
                            <FiEdit className="mr-2 h-4 w-4"/> Display
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle className="text-3xl font-bold">Articles : 20</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => setDisplay("articles")}>
                            <FiEdit className="mr-2 h-4 w-4"/> Display
                        </Button>
                    </CardContent>
                </Card>
            </div>*/}

            <div>
                <DisplayComponent section={DisplayArticles}/>
                {/*{display === "categories" && <DisplayComponent section={DisplayCategories}/>}
                {display === "subcategories" && <DisplayComponent section={DisplaySubCategories}/>}
                {display === "articles" && <DisplayComponent section={DisplayArticles}/>}*/}

            </div>
        </div>
    )
}


function PackageIcon() {
    return (
        <svg
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
            <path d="m7.5 4.27 9 5.15"/>
            <path
                d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}

export default SuppliersProductsPage