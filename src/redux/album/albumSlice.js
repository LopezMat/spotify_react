import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const albumSlice = createSlice({
    //on lui donne un nom 
    name: 'albums',
    //on doit initialiser les states (les valeurs par defaut)
    initialState: {
        //on initialise un tableau vide (où on stock une liste d'albums)
        albums: [],
        loading: false, // on initialise l'etat de chargement a false pour pouvoir gérer l'attente des requetes asynchrones
    },
    //méthode qui permet de remplir les states (mise en rayon)
    reducers: {
        setAlbums: (state, action) => {
            state.albums = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

    }
});


//on exporte les actions pour les utiliser dans le composant partout 
export const { setAlbums, setLoading } = albumSlice.actions;

//on créer la méthode qui permete de récupérer les albums de la BDD
export const fetchAlbums = () => async dispatch => {
    try {
        //on passe state loading a true pour signifier qu'on est en train d'attentre une reponse
        dispatch(setLoading(true));

        const response = await axios.get(`${apiUrl}/albums?page=1&isActive=true`);
        //on set les données dans le state d'album
        dispatch(setAlbums(response.data));
        //on passe state loading a false pour signifier qu'on a fini d'attentre une reponse
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
        //on passe state loading a false pour signifier qu'on a fini d'attentre une reponse
        dispatch(setLoading(false));
    }
};

//on exporte le reducer
export default albumSlice.reducer;
