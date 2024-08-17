import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card";
import {IoCashOutline} from "react-icons/io5";
import {HiOutlineShoppingBag} from "react-icons/hi2";
import * as React from "react";

const EarningCard = () =>{
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-[#dbe4fc]">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Total Ventes</CardTitle>
                    <IoCashOutline className=""/>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">918 TND</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+10% Ce Mois</p>
                </CardContent>
            </Card>
            <Card className="bg-[#dbe4fc]">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Total Commandes</CardTitle>
                    <HiOutlineShoppingBag/>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">03</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 Annulée</p>
                </CardContent>
            </Card>
            <Card className="bg-[#dbe4fc]">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="capitalize">Nombre de vos articles</CardTitle>
                    <PackageIcon/>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">04</div>
                </CardContent>
            </Card>
        </div>
    )
}