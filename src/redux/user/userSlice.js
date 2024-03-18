import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/apiConstant';

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userFavorite: [],
    user: {},
    avatars: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserFavorite: (state, action) => {
      state.userFavorite = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAvatars: (state, action) => {
      state.avatars = action.payload
    }
  }
})

export const { setLoading, setUserFavorite, setUser, setAvatars } = userSlice.actions

//on crée la méthode pour recuperer les favoris d'un utilisateur
export const fetchUserFavorite = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${apiUrl}/users?page=1&id=${id}`)

    dispatch(setUserFavorite(response.data['hydra:member'][0].albums));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors du fetchUserFavorite : ${error}`)
  }
}

//on crée la méthode pour recuperer les informations d'un utilisateur
export const fetchUser = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${apiUrl}/users/${id}`)
    dispatch(setUser(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors du fetchUser : ${error}`)
    setLoading(false);
  }
  //ensuite on range la méthode dans le store redux
}

//on crée la méthode pour recuperer les avatars
export const fetchAvatars = (id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${apiUrl}/avatars?page=1&isActive=true`)
    dispatch(setAvatars(response.data['hydra:member']));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(`Erreur lors du fetchAvatars : ${error}`)
    setLoading(false);
  }
}


export default userSlice.reducer
