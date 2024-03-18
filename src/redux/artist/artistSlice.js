import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const artistSlice = createSlice({
    name: 'artists',
    initialState:{
        loading: false,
        artistDetail: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setArtistDetail: (state, action) => {
            state.artistDetail = action.payload['hydra:member'][0];
        },
    }
})

//on exporte les actions sous forme de constantes
export const { setLoading, setArtistDetail } = artistSlice.actions;

//méthode qui récupère un artiste avec l'id
export const fetchArtistDetail = (id) => async dispatch => {
    try {
        //on passe le loading à true
        dispatch(setLoading(true));
        //on passe la requete à l'API
        const response = await axios.get(`${apiUrl}/artists?id=${id}&albums.isActive=true`);
        //on passe les données dans le state
        dispatch(setArtistDetail(response.data));
        //on passe le loading à false
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur sur fetchArtistDetail: ${error}`);
        dispatch(setLoading(false));
    }
}

export default artistSlice.reducer;