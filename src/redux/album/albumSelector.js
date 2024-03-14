import { createSelector } from "@reduxjs/toolkit";

//on récupère les données du slice que l'on met dans des constantes
const selectAlbums = state => state.albums.albums;
const selectLoading = state => state.albums.loading;
const selectAlbumDetail = state => state.albums.albumDetail;
const selectSearchAlbums = state => state.albums.searchAlbums;
const selectSearchArtist = state => state.albums.searchArtist;
//on crée le selector 
export const selectAlbumsData = createSelector(
  [selectAlbums, selectLoading, selectAlbumDetail, selectSearchAlbums, selectSearchArtist],
  //on effectue une destructuration des données
  (albums, loading, albumDetail, searchAlbums, searchArtist) => ({ albums, loading, albumDetail, searchAlbums, searchArtist })


);