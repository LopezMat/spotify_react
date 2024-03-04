import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../redux/album/albumSlice';
import { selectAlbumsData } from '../redux/album/albumSelector';

const Home = () => {
    //on récupère le hook useDispatch de react-redux
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums()) //permet de mettre a jour les states album et loading de albumSlice
    }, [])

    //on récupèrer notre selector pour avoir accés aux données
    const { albums, loading } = useSelector(selectAlbumsData);
    const dataAlbum = albums['hydra:member']
    console.log('data albums:', dataAlbum);





    return (
        <div>Home</div>
    )
}

export default Home