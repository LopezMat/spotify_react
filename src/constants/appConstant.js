//on construit un premier tableau pour notre navbar

import { imageUrl } from "./apiConstant";
import { AiOutlineHome, AiOutlineSearch, AiOutlineAppstoreAdd, } from 'react-icons/ai';
import { BiLibrary } from 'react-icons/bi';
import { MdFavoriteBorder } from 'react-icons/md';

//Pour la gestion des albums 
export const dataAlbumNav = [
    { title: 'Accueil', path: '/', icon: AiOutlineHome },
    { title: 'Recherche', path: '/search', icon: AiOutlineSearch },
    { title: 'Bibliotheque', path: '/library', icon: BiLibrary },
];

//Pour les options du user
export const dataUserNav = [
    { title: 'Créer une playlist', path: '/add-playlist', icon: AiOutlineAppstoreAdd },
    { title: 'Titre liké', path: '/whishlist', icon: MdFavoriteBorder },
];

//On récupère le chemin de notre logo 
export const imgLogo = `${imageUrl}/logo.png`;

//on définit du style pour les icones
export const styleIcon = { width: '25px', height: '25px' };
export const tableIcon = { width: '20px', height: '20px' };