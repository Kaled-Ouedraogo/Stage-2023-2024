import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import ChartOne from '../../../tailwind-components/Charts/ChartOne';
import {IoCashOutline} from "react-icons/io5";
import {HiOutlineShoppingBag} from "react-icons/hi2";
import ChartTwo from "../../../tailwind-components/Charts/ChartTwo";
import ChartThree from "../../../tailwind-components/Charts/ChartThree";
import { FiShoppingCart } from "react-icons/fi";
import {ResponsiveLine} from "@nivo/line";
import {ResponsiveBar} from "@nivo/bar";
import { BsBoxSeam } from "react-icons/bs";
const StatPage = () => {
    return (
        <div className="row">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-[#EEF2FF]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium text-[#2563eb]">Total Ventes</CardTitle>
                            <DollarSignIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2673,78 TND</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">+20%</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#EEF2FF]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium text-[#2563eb]">Total Utilisateurs</CardTitle>
                            <UsersIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">6 Fournisseurs</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#EEF2FF]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium text-[#2563eb]">Total Commandes</CardTitle>
                            <FiShoppingCart className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">10</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">3 En Attente</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-[#EEF2FF]">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-medium text-[#2563eb]">Total Articles</CardTitle>
                            <BsBoxSeam className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-2">
                    <Card className="h-full bg-[#F3F4F6]">
                        <CardHeader>
                            <CardTitle className="text-[17px]">Statistiques De Commandes</CardTitle>
                            <CardDescription className="text-[15px]">Un graphique comparant les commandes passées au cours de la semaine</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <StackedbarChart className="aspect-[9/4] h-full"/>
                        </CardContent>
                    </Card>
                    <Card className="h-full bg-[#F3F4F6]">
                        <CardHeader>
                            <CardTitle className="text-[17px]">Meilleures Ventes</CardTitle>
                            <CardDescription className="text-[15px]">Un graphique montrant les 4 produits les plus vendus au cours du mois</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartThree className="h-full"/>
                        </CardContent>
                    </Card>
                </div>

            </main>

        </div>
    );
};


function ActivityIcon(props) {
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
            <path
                d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
        </svg>
    )
}


function CreditCardIcon(props) {
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
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
        </svg>
    )
}


function DollarSignIcon(props) {
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
            <line x1="12" x2="12" y1="2" y2="22"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
    )
}


function LineChart(props) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "Cafetière",
                        data: [
                            { x: "Jan", y: 43 },
                            { x: "Feb", y: 137 },
                            { x: "Mar", y: 61 },
                            { x: "Apr", y: 145 },
                            { x: "May", y: 26 },
                            { x: "Jun", y: 154 },
                        ],
                    },
                    {
                        id: "Mobile",
                        data: [
                            { x: "Jan", y: 60 },
                            { x: "Feb", y: 48 },
                            { x: "Mar", y: 177 },
                            { x: "Apr", y: 78 },
                            { x: "May", y: 96 },
                            { x: "Jun", y: 204 },
                        ],
                    },
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: "point",
                }}
                yScale={{
                    type: "linear",
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16,
                }}
                colors={["#2563eb", "#e11d48"]}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                role="application"
            />
        </div>
    )
}



function MoveHorizontalIcon(props) {
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
            <polyline points="18 8 22 12 18 16" />
            <polyline points="6 8 2 12 6 16" />
            <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
    )
}



function UsersIcon(props) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function StackedbarChart(props) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: "Lundi", commandes: 1 },
                    { name: "Mardi", commandes: 0 },
                    { name: "Mercredi", commandes: 2 },
                    { name: "Jeudi", commandes: 0 },
                    { name: "Vendredi", commandes: 1 },
                    { name: "Samedi", commandes: 3 },
                    { name: "Dimanche", commandes: 1 },
                ]}
                keys={["commandes"]}
                indexBy="name"
                margin={{ top: 5, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#2563eb", "#2563eb"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                    axis: {
                        ticks: {
                            text: {
                                fontSize: "14px", // Taille de la police pour les jours de la semaine
                            },
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A stacked bar chart"
            />
        </div>
    )
}



export default StatPage;
