import LandingPage from "../Page/LandingPage";
import ProductsPage from "../Admin/Pages/ProductsPage";
import Admin from "../Admin/Admin";
import * as React from "react";
import ShopPage from "../Page/ShopPage";
import {Login} from "../Page/LoginSignUp";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Redirection(props) {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (role, userInfoData) => {
        setUserInfo(userInfoData);
        const email = userInfoData.email;
        if (userInfoData.role === 0) {
            navigate("/home", { state: { email } });
        }
        if (userInfoData.role === 1) {
            navigate("/suppliers/home", { state: { email } });
        }
        if (userInfoData.role === 2) {
            navigate("/admin/users",{ state: { email } });
        }
    };

    return (
        <div>
            {!userInfo || ![0, 1, 2].includes(userInfo.role) ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    {userInfo.role === 2 && <Admin section={ProductsPage} name="products" />}
                    {userInfo.role === 0 && <ShopPage display="home" />}
                </div>
            )}
        </div>
    );
}
