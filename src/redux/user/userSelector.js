import { createSelector } from "@reduxjs/toolkit";

const selectLoading = state => state.user.loading;
const selectUserFavorite = state => state.user.userFavorite;

//on créer le selector 
export const selectUserData = createSelector(
    [selectLoading, selectUserFavorite],
    (loading, userFavorite) => ({ loading, userFavorite })
)