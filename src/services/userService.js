import axios from "axios";
import { apiUrl } from "../constants/apiConstant";

export const checkUser = async (userInfo) => {
    try {
        //on récupère le user dans la bdd avec l'id en session
        const response = await axios.get(`${apiUrl}/users/${userInfo.userId}`);
        const user = response.data;
        //maintenant on comparer les données dans la bdd avec celles de l'utilisateur connecté
        if (user.email === userInfo.email && user.nickname === userInfo.nickname) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(`Erreur sur checkUser: ${error}`);
        return false;
    }
}