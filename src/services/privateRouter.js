import {createContext, useContext, useState} from "react";
import {Navigate} from "react-router-dom";

const authContext = createContext()


const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') || false);

    console.log(isAuthenticated)


    const loggedIn = () => {
        localStorage.setItem('isAuthenticated', true);
        setIsAuthenticated(true);

    }

    const loggedOut = () => {
        setIsAuthenticated(false);
        localStorage.clear();
    }

    return (
        <authContext.Provider value={{isAuthenticated, loggedIn, loggedOut}}>
            {children}
        </authContext.Provider>
    )
}

const PrivateRoute = ({children}) => {
    const {isAuthenticated} = useContext(authContext);

    return isAuthenticated ? children : <Navigate to={'/login'}/>;
}

export {AuthProvider, PrivateRoute, authContext}