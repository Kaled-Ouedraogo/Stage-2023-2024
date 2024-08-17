import {Link} from "react-router-dom";
import { Button } from "../../ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../../ui/dropdown-menu"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import adminIcon from "../../Assets/store.png"
import SuppliersSidebar from "../Pages/SuppliersSidebar";
import { useLocation } from "react-router-dom";

import logo from "../../Assets/logo-poste.png"
import * as React from "react";
import {useEmail} from "../../UserContext/UserContext";
import axios from "axios";
import {useEffect, useState} from "react";

function SuppliersHeader(props){
    const { mail } = useEmail();
    const [nomBoutique, setNomBoutique] = useState("");
    const getInfo = async() =>{
        const data = await axios.get(`http://127.0.0.1:3001/admin/one-supplier/${mail}`)
        if(data.data.success && data.data.data.length >0){
            setNomBoutique(data.data.data[0].libelle)
        }
    }
    useEffect(() => {
        getInfo()
    }, []);
    return(
        <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link className="text-xl flex items-center gap-2 font-semibold" href="#">
                    <img src={logo} alt="" className="w-10"/>

                    La Poste Tunisienne
                </Link>

            </div>
            <div className="flex items-center gap-4 font-semibold">
                <h2>Bienvenue {nomBoutique}</h2>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full" size="icon" variant="ghost">
                            <img
                                alt="Avatar"
                                className="rounded-full"
                                height="32"
                                src={adminIcon}
                                style={{
                                    aspectRatio: "32/32",
                                    objectFit: "cover",
                                }}
                                width="32"
                            />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Paramètres</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Déconnexion</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default function SuppliersDashboard(props) {
    return (
        <div className="flex flex-col min-h-screen">
            {SuppliersHeader()}
            <div className="flex flex-1">
                {SuppliersSidebar({name:props.name})}
                <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-6 md:p-10">
                    <props.section/>
                </main>
            </div>
            <footer className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
                <p className="text-sm">© 2024 La Poste Tunisienne. Tout droit réservé.</p>
                <nav className="hidden md:flex items-center gap-6">
                    <Link className="hover:text-gray-300 text-sm" href="#">
                        Support
                    </Link>
                    <Link className="hover:text-gray-300 text-sm" href="#">
                        Conditions
                    </Link>
                    <Link className="hover:text-gray-300 text-sm" href="#">
                        A propos
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

