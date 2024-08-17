import * as React from "react"
import { Button } from "../../components/ui/button"
import "./CSS/LoginSignUp.css"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {useState} from "react";
import axios from "axios"
import {Link, useNavigate} from "react-router-dom";
import logo from "../Assets/logo-poste.png"
import { CircularProgress } from '@chakra-ui/react'
import {Alert} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useEmail } from "../UserContext/UserContext";
export function Login({onLogin}) {
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const { setMail } = useEmail();


    const handleSubmit = (e) => {
        e.preventDefault();
        //START LOADING
        setIsLoading(true);
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result)
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setMail(email);
                    onLogin(result.data.role, result.data.userInfo);
                    //navigate('/home');
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                setShowErrorAlert(true);
                setTimeout( () =>{
                    setShowErrorAlert(false);
                },3000)
            });
    }

    return (
        <div className="content min-h-screen">

            {/* LOADING PROCESS */}
            {isLoading && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-60 w-full width: 100% bg-gray-900 bg-opacity-50 h-full height:100%">
                    <CircularProgress isIndeterminate color='#007BFF'/>
                </div>
            )}
            {/* SUCCESS ALERT*/}
            {showSuccessAlert && (
                <div className="fixed top-4 right-4">
                    <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">
                    Connexion réussie
                    </Alert>
                </div>
            )}
            {/* ERROR ALERT */}
            {showErrorAlert && (
                <div className="fixed top-4 right-4">
                    <Alert severity="error">Email or Password Incorrect. Please Retry</Alert>
                </div>
            )}

            <div className="flex justify-center"><img className="w-20 mt-20 mb-10" src={logo} alt=""/></div>
            <div className="flex justify-center min-h-fit items-center">
                <div className="flex-col space-y-5">
                    <Card className="w-[350px]">
                        <CardHeader className="space-y-2">
                            <CardTitle>Connectez-vous à votre compte</CardTitle>
                            <CardDescription className="capitalize">Démarrez votre shopping</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-7">
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Email</Label>
                                        <Input required type="email" id="email" placeholder="Your Email"
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Input required type="password" id="password" placeholder="Your Password"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="">
                                    <Button type="submit" className="w-full">Connexion</Button>
                                </div>

                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row justify-center space-x-4">
                            <CardDescription>Pas de compte ? <Link to='/signup'> <span className="underline font-bold text-black sign-up">S'inscrire</span> </Link></CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export function SignUp() {
    const [prenom,setPrenom]= useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        //START LOADING
        setIsLoading(true);

        // SEND DATA
        axios.post('http://localhost:3001/register', { username, prenom, email, password })
            .then(result => {
                console.log(result);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/login');
                }, 3000);
            })
            .catch(err => {
                setShowErrorAlert(true);
                console.log(err);
                setIsLoading(false);
                setTimeout( () =>{
                    setShowErrorAlert(false);
                },3000)
            });
    };

    return (
        <div className="content min-h-screen">

            {/* LOADING PROCESS */}
            {isLoading && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-60 w-full width: 100% bg-gray-900 bg-opacity-50 h-full height:100%">
                    <CircularProgress isIndeterminate color='#007BFF'/>
                </div>
            )}

            {/* SUCCESS ALERT*/}
            {showSuccessAlert && (
                <div className="fixed top-4 right-4">
                    <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">
                    Compte créé avec succès !
                    </Alert>
                </div>
            )}

            {/* ERROR ALERT */}
            {showErrorAlert && (
                <div className="fixed top-4 right-4">
                    <Alert severity="error" className="text-justify">Cet e-mail est déjà associé à un compte existant <br/>
                        Utilisez une autre adresse e-mail ou connectez-vous</Alert>
                </div>
            )}

            <div className="flex justify-center"><img className="w-20 mt-20 mb-10" src={logo} alt=""/></div>
            <div className="flex justify-center min-h-fit items-center">
                <div className="flex-col space-y-5 login">
                    <Card className="w-[350px]">
                        <CardHeader className="space-y-2">
                            <CardTitle>Créer un compte</CardTitle>
                            <CardDescription className="capitalize">Démarrez votre shopping</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-7">
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Nom</Label>
                                        <Input required type="name" id="name" placeholder="Votre nom"
                                               onChange={(e) => setUsername(e.target.value)}/>
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Prénom</Label>
                                        <Input type="prenom" id="prenom" placeholder="Votre prénom"
                                               onChange={(e) => setPrenom(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Email</Label>
                                        <Input required type="email" id="email" placeholder="Votre email"
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Input required type="password" id="password" placeholder="Votre mot de passe"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="">
                                    <Button type="submit" className="w-full">Créer mon compte</Button>
                                </div>

                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row justify-center space-x-4">
                            <CardDescription>Vous avez déjà un compte ? <Link to='/login'> <span
                                className="underline font-bold text-black sign-up">Se connecter</span>
                            </Link></CardDescription>
                        </CardHeader>
                    </Card>
                    <div><br/></div>
                </div>
            </div>

        </div>
    )
}


export function SignUpSuppliers() {
    const [prenom,setPrenom]= useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [code, setCode] = useState(1)
    const [tel, setTel] = useState()
    const [fax, setFax] = useState()
    const [libelle, setLibelle] = useState()
    const [address, setAddress] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        //START LOADING
        setIsLoading(true);

        // SEND DATA
        axios.post('http://localhost:3001/register', { username, prenom, email, password })
            .then(result => {
                axios.post("http://localhost:3001/admin/add-users", {code, libelle, address, tel, email});
                console.log(result);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setIsLoading(false);
                    //navigate('/login');
                }, 3000);
            })
            .catch(err => {
                setShowErrorAlert(true);
                console.log(err);
                setIsLoading(false);
                setTimeout( () =>{
                    setShowErrorAlert(false);
                },3000)
            });
    };


    return (
        <div className="content min-h-screen">

            {/* LOADING PROCESS */}
            {isLoading && (
                <div
                    className="fixed inset-0 flex justify-center items-center z-60 w-full width: 100% bg-gray-900 bg-opacity-50 h-full height:100%">
                    <CircularProgress isIndeterminate color='#007BFF'/>
                </div>
            )}

            {/* SUCCESS ALERT*/}
            {showSuccessAlert && (
                <div className="fixed top-4 right-4">
                    <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">
                    Votre compte est en attente de validation !
                    </Alert>
                </div>
            )}

            {/* ERROR ALERT */}
            {showErrorAlert && (
                <div className="fixed top-4 right-4">
                    <Alert severity="error" className="text-justify">Cet e-mail est déjà associé à un compte existant <br/>
                        Utilisez une autre adresse e-mail ou connectez-vous</Alert>
                </div>
            )}

            <div className="flex justify-center"><img className="w-20 mt-20 mb-10" src={logo} alt=""/></div>
            <div className="flex justify-center min-h-fit items-center">
                <div className="flex-col space-y-5 login">
                    <Card className="w-[350px]">
                        <CardHeader className="space-y-2">
                            <CardTitle>Créer un compte</CardTitle>
                            <CardDescription className="capitalize">Dévenez un fournisseur</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-7">
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Nom</Label>
                                        <Input required type="name" id="name" placeholder="Votre nom"
                                               onChange={(e) => setUsername(e.target.value)}/>
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Prénom</Label>
                                        <Input type="prenom" id="prenom" placeholder="Votre prénom"
                                               onChange={(e) => setPrenom(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Nom de votre boutique</Label>
                                        <Input type="prenom" id="prenom" placeholder="Votre boutique"
                                               onChange={(e) => setLibelle(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Adresse de votre boutique</Label>
                                        <Input type="prenom" id="prenom" placeholder="Adresse de la boutique"
                                               onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Téléphone</Label>
                                        <Input type="prenom" id="prenom" placeholder="Numéro de télephone"
                                               onChange={(e) => setTel(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="name">Email</Label>
                                        <Input required type="email" id="email" placeholder="Votre email"
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="flex flex-col space-y-2.5">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Input required type="password" id="password" placeholder="Votre mot de passe"
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <br/>
                                <div className="">
                                    <Button type="submit" className="w-full">Créer mon compte</Button>
                                </div>

                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader className="flex-row justify-center space-x-4">
                            <CardDescription>Vous avez déjà un compte ? <Link to='/login'> <span
                                className="underline font-bold text-black sign-up">Se connecter</span>
                            </Link></CardDescription>
                        </CardHeader>
                    </Card>
                    <div><br/></div>
                </div>
            </div>

        </div>
    )
}
