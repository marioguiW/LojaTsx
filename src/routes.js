import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import { UserProvider } from "context/userContext";


export default function Rotas(){

    const [user, setUser] = useState(null);

    const handleLogin = () => {
        setUser(sessionStorage.getItem("login"));
    }
    console.log(user)
    const handleLogout = () => setUser(null);

    
    const ProtectedRouteAdmin = ({
        user,
        redirectPath = '/',
        children,
      }) => {
        if (!user) {
            console.log("passou, não é admin")
            console.log(user)
          return <Navigate to={redirectPath} replace />;
        }if(user && user.isAdmin == true){
            console.log(user) 
            return children ? children : <Outlet />;
        }if(user && user.isAdmin == false){
            return <Comprar/>
        }
      };

    return(
        
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/home" element={<Login/>}/>
                    <Route path="/produtos" element={<Produtos/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}