import {Link} from "react-router-dom";
import {Input} from "../../ui/input";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../../ui/dropdown-menu";
import {Button} from "../../ui/button";
import {FaUserCircle} from "react-icons/fa";
import * as React from "react";
import {Card, CardContent} from "../../ui/card";
import {Badge} from "../../ui/badge";
import adminIcon from "../../Assets/logo-admin.jpg"

const HeaderBar = () =>{
    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Link className="lg:hidden" href="#">
                <Package2Icon className="h-6 w-6"/>
                <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
                <h1 className="font-semibold text-lg">Products</h1>
            </div>
            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        <Input
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                            placeholder="Search orders..."
                            type="search"
                        />
                    </div>
                </form>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full" size="icon" variant="ghost">
                            <FaUserCircle className="w-6 h-6 mt-1"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

    )
}

function Package2Icon(props) {
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
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
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

export function HeaderProfil(){
    return(
        <Card className="p-0">
            <CardContent className="flex gap-4 items-start p-6">
                <img
                    alt="Avatar"
                    className="rounded-full"
                    height="100"
                    src={adminIcon}
                    style={{
                        aspectRatio: "100/100",
                        objectFit: "cover",
                    }}
                    width="100"
                />
                <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                        <h1 className="font-bold text-xl">Nizar Dhiaf</h1>
                        <Badge className="h-6 cursor-pointer">Admin</Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email: test@example.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Joined: February 20, 2022</p>
                </div>
            </CardContent>
        </Card>
    )
}
export default HeaderBar