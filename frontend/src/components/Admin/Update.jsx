import React from "react"
import DialogButton from "./Admin"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {Button} from "../ui/button";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
const productUpdate = () =>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto shrink-0" size="sm">
                    Edit Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form>
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" name="name" placeholder="New Product" className="col-span-3"
                                    required/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Input id="category" name="category" placeholder="@category" className="col-span-3"
                                    required/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input type="number" id="username" name="price" placeholder="100" className="col-span-3"
                                    required/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Add Product</Button>
                    </DialogFooter>
                </form></DialogContent>
        </Dialog>
    )
}

export default productUpdate