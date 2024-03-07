import React, { createContext, useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { RouterProvider } from 'react-router-dom';
import OnlineRouter from './OnlineRouter';
import OfflineRouter from './OfflineRouter';

//création d'un mini context pour la session
const SessionContext = createContext({
    inSession: false
});
//création du hook pour utiliser notre context de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
    //on declare notre context de session
    const [inSession, setInSession] = useState(null);
    //on récupère les info de notre Authcontext
    const { userId, setUserId, setEmail, setNickname } = useAuthContext();
    //on va regarder si on a fes info dans le local storage
    const getUserInfos = async () => {
        const user = JSON.parse(localStorage.getItem('userInfos'));
        if (user) {
            setInSession(true);
            setUserId(user.userId);
            setEmail(user.email);
            setNickname(user.nickname);
        } else {
            setInSession(false);
        }
    };

    //on vas appeler getUserInfo dés que l'in monte le composant
    useEffect(() => {
        getUserInfos();
    }, [userId])

    const value = {
        inSession
    }

    return (
        //on récupère le contxt de session
        <SessionContext.Provider value={value}>
            {/* ici on appèle le bon routeur suivant le context de session */}
            <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
        </SessionContext.Provider>
    )
}


export default AppRouter