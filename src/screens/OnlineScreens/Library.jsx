import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserFavorite } from '../../redux/user/userSlice';
import { useAuthContext } from '../../contexts/AuthContext';
import { selectUserData } from '../../redux/user/userSelector';
import PageLoader from '../../components/Loader/PageLoader';
import AlbumCard from '../../components/AlbumCard';

const Library = () => {
  //on recupère notre hook dispatch
  const dispatch = useDispatch();
  //on récupère l'id de l'utilisateur
  const { userId } = useAuthContext();

  useEffect(() => {
    dispatch(fetchUserFavorite(userId));
  }, [])

  //on peut récupérer les favories de l'utilisateur
  const { loading, userFavorite } = useSelector(selectUserData)

  //on récupère les info du slice player
  const { isPlaying, activeSong } = useSelector(state => state.player)

  return (
    loading ? <PageLoader /> :
      userFavorite && userFavorite.length > 0 ?
        <>
          <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Mes albums favoris</h2>
          <div className='flex flex-wrap'>
            {userFavorite.map((data, index) => (
              <div key={index} className='m-3'>
                <AlbumCard
                  data={data}
                  songs={data?.songs}
                  index={0}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
              </div>

            ))}
          </div>
        </>
        : <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Aucun favoris trouvé</h2>
  )
}

export default Library