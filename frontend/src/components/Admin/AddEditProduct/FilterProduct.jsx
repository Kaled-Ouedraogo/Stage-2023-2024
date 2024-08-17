import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "../../ui/collapsible"
import { Checkbox } from "../../ui/checkbox"
import { Label } from "../../ui/label"
import React, { useState } from "react";


export default function FilterProduct() {
    return (
        <section className=" py-8 md:py-12 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="md:text-xl font-bold">Filtres</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Collapsible>
                        <CollapsibleTrigger className="flex text-sm items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Catégorie</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-a"/>
                                <Label htmlFor="category-a">Category A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-b"/>
                                <Label htmlFor="category-b">Category B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-c"/>
                                <Label htmlFor="category-c">Category C</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-d"/>
                                <Label htmlFor="category-d">Category D</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger className="flex text-sm items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Sous Catégorie</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-a"/>
                                <Label htmlFor="category-a">Category A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="category-c"/>
                                <Label htmlFor="category-c">Category C</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                        <CollapsibleTrigger
                            className="text-sm flex items-center justify-between w-full bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md">
                            <span className="font-medium">Prix</span>
                            <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400"/>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="price-under50"/>
                                <Label htmlFor="price-under50">Croissant</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="price-over200"/>
                                <Label htmlFor="price-over200">Décroissant</Label>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </section>
    )
}

export function ChevronDownIcon(props) {
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
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}