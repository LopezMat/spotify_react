import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import { tableIcon } from '../../constants/appConstant';
import { BiTime } from 'react-icons/bi';
import PlayPause from '../PlayPause';

const ListAlbumSong = ({dataAlbum}) => {
  //on déclare nos constantes
  const data = dataAlbum;//info de l'album
  const songs = dataAlbum?.songs;//tableau de chansons
  //on declare nos states
  const [isHover, setIsHover] = useState(-1);//quand la souris sera sur une piste du tableau
  //on récupère les données du store
  const {isPlaying, activeSong} = useSelector(state=>state.player)
  //on récupère les hook
  const dispatch = useDispatch();
  
  //méthode pour mettre en pause
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  //méthode pour mettre en play
  const handlePlayClick = (index) => {
    dispatch(setActiveSong({songs, data, index}));
    dispatch(setActiveAlbum({data}))
    dispatch(playPause(true))
  }

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto min-w-full py-2 sm:px-6 lg:px-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium '>
                <tr>
                  <th scope='col' className='px-6 py-4'>#</th>
                  <th scope='col' className='px-6 py-4'>TITRE</th>
                  <th scope='col' className='px-6 py-4'>
                    <BiTime style={tableIcon} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs 
                ? songs.map((row, index)=>{
                  //formattage du temps pour les titres
                  const minutes = Math.floor(row.duration / 60);
                  const seconds = Math.floor(row.duration % 60);
                  //on formate le temps mm:ss
                  const duration = seconds < 10 
                  ? `${minutes}:0${seconds}` 
                  : `${minutes}:${seconds}`;

                  return (
                    <tr 
                    key={index}
                    className='border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent'
                    onMouseEnter={()=>setIsHover(index)}
                    onMouseLeave={()=>setIsHover(-1)}
                    >
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        {/* on va utiliser isHover pour afficher le bouton play */}
                        {isHover !== index && `#${index + 1}`}
                        {isHover === index && <PlayPause 
                          size='16px'
                          songs={songs}
                          handlePause={handlePauseClick}
                          handlePlay={()=>handlePlayClick(index)}
                          isPlaying={isPlaying}
                          activeSong={activeSong}
                          index={index}
                        />}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        {row.title}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 font-medium m-1'>
                        {duration}
                      </td>
                    </tr>
                  )



                }) 
                : (
                  <tr>
                    <td colSpan="3" >Aucune chanson disponible</td>
                  </tr>
                )

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAlbumSong