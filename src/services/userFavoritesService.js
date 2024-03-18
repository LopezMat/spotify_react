import  axios  from "axios"
import { apiUrl } from "../constants/apiConstant";

export const fetchAddRemoveFavorite = async (arrayIds, userId) => {
  
  const dataFavorite = {
    albums: arrayIds
  }

  try {
    axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json';
    const response = await axios.patch(`${apiUrl}/users/${userId}`, dataFavorite);


  } catch (error) {
    console.log(`erreur lors du fetchAddRemoveFavorite : ${error}`)
  }
}