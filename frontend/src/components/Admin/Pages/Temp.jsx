import {Link} from "react-router-dom";
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../../ui/dropdown-menu"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "../../ui/card"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveScatterPlot } from "@nivo/scatterplot"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"



export default function Temp() {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                            <Package2Icon className="h-6 w-6" />
                            <span className="">Acme Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <BellIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <HomeIcon className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <ShoppingCartIcon className="h-4 w-4" />
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <PackageIcon className="h-4 w-4" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <UsersIcon className="h-4 w-4" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <LandmarkIcon className="h-4 w-4" />
                                Finances
                            </Link>
                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                prefetch={false}
                            >
                                <LineChartIcon className="h-4 w-4" />
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    <Link href="#" className="lg:hidden" prefetch={false}>
                        <Package2Icon className="h-6 w-6" />
                        <span className="sr-only">Home</span>
                    </Link>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <Input
                                    type="search"
                                    placeholder="Search"
                                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                            >
                                <img src="/placeholder.svg" width="32" height="32" className="rounded-full" alt="Avatar" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">

                </main>
            </div>
        </div>
    )
}

function BellIcon(props) {
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
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}


function DotChart() {
    return (
        <div>
            <ResponsiveScatterPlot
                data={[
                    {
                        id: "Desktop",
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
                xScale={{ type: "point" }}
                yScale={{ type: "linear" }}
                blendMode="multiply"
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


function GroupedbarChart(props) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: "Jan", desktop: 111, mobile: 99 },
                    { name: "Feb", desktop: 157, mobile: 87 },
                    { name: "Mar", desktop: 129, mobile: 89 },
                    { name: "Apr", desktop: 187, mobile: 151 },
                    { name: "May", desktop: 119, mobile: 127 },
                    { name: "Jun", desktop: 20, mobile: 121 },
                ]}
                keys={["desktop", "mobile"]}
                indexBy="name"
                groupMode="grouped"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#2563eb", "#e11d48"]}
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
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A grouped bar chart"
            />
        </div>
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


function LabelledpieChart(props) {
    return (
        <div {...props}>
            <ResponsivePie
                data={[
                    { id: "Jan", value: 111 },
                    { id: "Feb", value: 157 },
                    { id: "Mar", value: 129 },
                    { id: "Apr", value: 150 },
                    { id: "May", value: 119 },
                    { id: "Jun", value: 72 },
                ]}
                sortByValue
                margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={2}
                borderWidth={1}
                arcLinkLabelsThickness={1}
                enableArcLabels={false}
                colors={["#2563eb"]}
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
                }}
                role="application"
            />
        </div>
    )
}


function LandmarkIcon(props) {
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
            <line x1="3" x2="21" y1="22" y2="22" />
            <line x1="6" x2="6" y1="18" y2="11" />
            <line x1="10" x2="10" y1="18" y2="11" />
            <line x1="14" x2="14" y1="18" y2="11" />
            <line x1="18" x2="18" y1="18" y2="11" />
            <polygon points="12 2 20 7 4 7" />
        </svg>
    )
}


function LineChart(props) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "Desktop",
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


function LineChartIcon(props) {
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
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
        </svg>
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


function PackageIcon(props) {
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
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
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


function StackedbarChart(props) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: "Jan", desktop: 111, mobile: 99 },
                    { name: "Feb", desktop: 157, mobile: 87 },
                    { name: "Mar", desktop: 129, mobile: 89 },
                    { name: "Apr", desktop: 187, mobile: 151 },
                    { name: "May", desktop: 119, mobile: 127 },
                    { name: "Jun", desktop: 20, mobile: 121 },
                ]}
                keys={["desktop", "mobile"]}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#2563eb", "#e11d48"]}
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
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A stacked bar chart"
            />
        </div>
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