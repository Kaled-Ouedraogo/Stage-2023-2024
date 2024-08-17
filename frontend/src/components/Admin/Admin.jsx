/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Ge9s7lCtWfK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import * as React from "react";
import SideBar from "./SideBar/SideBar";
import HeaderBar, {HeaderProfil} from "./HeaderBar/HeaderBar";

export default function Admin(props) {

    return (
        <div className="grid h-auto min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                {SideBar(props.name)}
            </div>
            <div className="flex flex-col">
                {/*<HeaderBar/>*/}
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ">
                    {/*HeaderProfil()*/}
                    <props.section/>
                </main>
            </div>
        </div>
    )
}

