import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "../ui/avatar"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { useEmail } from "../UserContext/UserContext";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import {Alert} from "@mui/material";

export default function ViewProfil() {
    axios.defaults.baseURL = "http://localhost:3001"
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const { mail } = useEmail();
    const [query, setQuery] = useState('');
    const [userData, setUserData] = useState([])
    const [display, setDisplay] = useState(false)
    const getUserData = async() =>{
        const data = await axios.get(`/one-user?q=${query}`)
        if(data.data.success && data.data.data.length > 0) {
            setUserData(data.data.data);
            console.log(data.data.data)
            console.log(userData.email)
            setDisplay(true)
        }
        }

    useEffect(() => {
        setQuery(mail)
        getUserData()

    }, [query]);
    return (
        display &&
        (
            <div className="bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 ">Votre compte</h1>
                <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-12 lg:grid-cols-3 mx-6 mt-8">
                    <Card className="md:col-span-2 lg:col-span-1 bg-neutral-100">
                        <CardHeader>
                            <CardTitle>Profil</CardTitle>
                            <CardDescription>Gérer les informations de votre compte</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4 justify-center">
                                <Avatar className="h-16 w-16" >
                                    <AvatarImage alt="@shadcn" src=""/>
                                    <AvatarFallback className="bg-gray-200">{userData[0].username[0]+userData[0].prenom[0]}</AvatarFallback>
                                </Avatar>

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nom et Prénom</Label>
                                <Input defaultValue={userData[0].username+" "+userData[0].prenom} id="name"/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input defaultValue={userData[0].email} id="email" type="email"/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Sauvegarder</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-neutral-100">
                        <CardHeader>
                            <CardTitle>Mot de passe</CardTitle>
                            <CardDescription>Changer votre mot de passe</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current-password">Mot de passe actuel</Label>
                                <Input id="current-password" type="password"/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                                <Input id="new-password" type="password"/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirmer nouveau mot de passe</Label>
                                <Input id="confirm-password" type="password"/>
                            </div>
                            <br/>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Sauvegarder</Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-neutral-100">
                        <CardHeader>
                            <CardTitle>Contact</CardTitle>
                            <CardDescription>Informations de livraison</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input defaultValue="+216 54360945" id="phone" type="tel"/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Addresse</Label>
                                <Textarea defaultValue=" Manar Immeuble Saphir" id="address" rows={3}/>
                            </div>
                            <br/><br/>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button>Sauvegarder</Button>
                        </CardFooter>
                    </Card>
                </div>
                <Card className="items-center justify-center w-fit mx-auto my-6 bg-amber-50">
                    <CardHeader>
                        <CardTitle>Newsletter</CardTitle>
                        <CardDescription>Je souhaite recevoir les offres de promotion par email</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Switch defaultChecked id="email-notifications"/>


                    </CardContent>
                </Card>
                <br/> <br/> <br/>
                {showSuccessAlert && (
                    <div className="fixed top-24 right-4">
                        <Alert variant="filled" severity="warning">
                            Erreur lors de la modification du mot de passe, veuillez réessayer
                        </Alert>
                    </div>
                )}
            </div>
        ))
}