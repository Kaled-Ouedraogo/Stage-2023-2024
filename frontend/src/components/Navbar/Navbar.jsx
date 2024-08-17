import {Link} from "react-router-dom";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SheetTrigger, SheetClose, SheetContent, Sheet } from "../ui/sheet"
import userIcon from "../Assets/logo-admin.jpg"
import logo from "../Assets/logo-poste.png"
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu } from "../ui/dropdown-menu"
import * as React from "react";
const Navbar = ({count}) =>{
    console.log(count)
    return (
        <div>
            <header
                className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 md:px-6 bg-[#e5e7eb]">
                <Link className="flex items-center gap-2" href="#">
                    <img src={logo} alt="" className="w-10"/>
                    <span className="text-lg font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </Link>
                <div className="relative hidden w-full max-w-md md:block">
                    <SearchIcon
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"/>
                    <Input
                        className="w-full rounded-md border border-gray-200 bg-gray-100 px-9 py-2 text-sm shadow-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50"
                        placeholder="Rechercher un produit "
                        type="search"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <nav className="hidden items-center gap-4 md:flex">
                        <Link to='/home' className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
                            Accueil
                        </Link>
                        <Link to='/shop' className="text-sm font-medium hover:underline hover:underline-offset-4"
                              href="#">
                             Catalogue
                        </Link>
                        <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
                            Contact
                        </Link>
                    </nav>
                    <Link to="/shoppingCart" className="relative">
                        <ShoppingCartIcon className="h-6 w-6"/>
                        <span
                            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
           {count}
          </span>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" size="icon" variant="ghost">
                                <img
                                    alt="User avatar"
                                    className="rounded-full"
                                    height={32}
                                    src={userIcon}
                                    style={{
                                        aspectRatio: "32/32",
                                        objectFit: "cover",
                                    }}
                                    width={32}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <Link to='/account'><DropdownMenuItem className="cursor-pointer"> Mon Profil</DropdownMenuItem></Link>
                            <Link to='/order'><DropdownMenuItem className="cursor-pointer">Mes Commandes</DropdownMenuItem></Link>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="cursor-pointer">Déconnexion</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="md:hidden" size="icon" variant="outline">
                                <MenuIcon className="h-6 w-6"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="md:hidden" side="left">
                            <div className="flex h-16 items-center justify-between border-b px-4 dark:border-gray-800">
                                <Link className="flex items-center gap-2" href="#">
                                    <MountainIcon className="h-6 w-6"/>
                                    <span className="text-lg font-semibold">Acme Store</span>
                                </Link>
                                <SheetClose asChild>
                                </SheetClose>
                            </div>
                            <nav className="grid gap-4 px-4 py-6">
                                <Link
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <ShirtIcon className="h-5 w-5"/>
                                    Clothing
                                </Link>
                                <Link
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <CircuitBoardIcon className="h-5 w-5"/>
                                    Electronics
                                </Link>
                                <Link
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <HomeIcon className="h-5 w-5"/>
                                    Home & Garden
                                </Link>
                                <Link
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <SmileIcon className="h-5 w-5"/>
                                    Beauty
                                </Link>
                                <Link
                                    className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <ClubIcon className="h-5 w-5"/>
                                    Sports
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <div className="flex justify-center hidden">
                <div className="rounded border shadow-sm p-4 w-1/2 shrink-0 bg-amber-100">
                    <div className="grid grid-cols-2 items-start">
                        <img
                            alt="Product image"
                            className="aspect-square object-cover rounded-md"
                            height={60}
                            src={logo}
                            width={60}
                        />
                        <div className="my-auto">
                            <h3 className="font-semibold">Beach Bliss Flip-Flops</h3>
                            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">Comfortable
                                Footwear</p>
                            <h4 className="font-semibold">$19.99</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    )
}

function CircuitBoardIcon(props) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M11 9h4a2 2 0 0 0 2-2V3" />
            <circle cx="9" cy="9" r="2" />
            <path d="M7 21v-4a2 2 0 0 1 2-2h4" />
            <circle cx="15" cy="15" r="2" />
        </svg>
    )
}


function ClubIcon(props) {
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
            <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
            <path d="M12 17.66L12 22" />
        </svg>
    )
}


function HomeIcon(props) {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}

function ShirtIcon(props) {
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
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
    )
}

function SmileIcon(props) {
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
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    )
}


function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
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


function ShoppingCartIcon(props) {
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
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}

export default Navbar