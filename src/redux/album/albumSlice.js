import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/apiConstant";

const albumSlice = createSlice({
  //on lui donne un nom
  name: 'albums',
  //on doit initialiser les states (les valeurs par defaut)
  initialState: {
    albums: [], //on initialise un tableau vide pour stocker la futur liste d'albums
    loading: false,// on initialise le state loading à false pour pouvoir gérer l'attente des requetes asynchrone
    albumDetail: {}, //on initialise un objet vide pour stocker la futur liste d'albums
    searchAlbums: [] //on initialise un tableau vide pour stocker la futur liste d'albums
  },
  //methode qui permet de remplir les states (mise en rayon)
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAlbumDetail: (state, action) => {
      state.albumDetail = action.payload
    },
    setSearchAlbums: (state, action) => {
      state.searchAlbums = action.payload
    }
  }
});

export const { setAlbums, setLoading, setAlbumDetail, setSearchAlbums } = albumSlice.actions;

//on crée la méthode qui permet de récupérer les données des albums de la BDD
export const fetchAlbums = () => async dispatch => {
  try {
    //on passe le state loading à true pour signifier qu'on attend une réponse
    dispatch(setLoading(true));

    const response = await axios.get(`${apiUrl}/albums?page=1&isActive=true`);
    //on set les données dans le state albums
    dispatch(setAlbums(response.data));
    //on repasse le state loading a false pour signifier qu'on a fini d'attendre
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur sur fetchAlbums: ${error}`);
    dispatch(setLoading(false));
  }
};

//on crée la méthode pour récupérer les infos d'un album particulier
export const fetchAlbumDetail = (id) => async dispatch => {
  try {
    //on passe le state loading à true pour signifier qu'on attend une réponse
    dispatch(setLoading(true));

    const response = await axios.get(`${apiUrl}/albums?page=1&id=${id}&isActive=true`);
    //on set les données dans le state albums
    dispatch(setAlbumDetail(response.data['hydra:member'][0]));
    //on repasse le state loading a false pour signifier qu'on a fini d'attendre
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur sur fetchAlbumDetail: ${error}`);
    dispatch(setLoading(false));
  }
}

//on crée la méthode qui permet de rechercher des albums dans la BDD
export const fetchSearch = (searchWord) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const responseAlbums = await axios.get(`${apiUrl}/albums?page=1&title=${searchWord}&isActive=true`);

    dispatch(setSearchAlbums(responseAlbums.data));

    dispatch(setLoading(false));

  } catch (error) {
    console.log(`Erreur sur fetchSearch: ${error}`);
    dispatch(setLoading(false));
  }
}

// On exporte notre reducer
export default albumSlice.reducer;