import React from 'react'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'

const PlayPause = ({
  size = '60px', //permet de définir la taille du bouton (par defaut 60px)
  isPlaying, //gère l'état si on est en lecture ou en pause
  songs, //tableau de chansons
  activeSong, //chanson en cours de lecture
  handlePause, //fonction pour mettre en pause
  handlePlay, //fonction pour mettre en lecture
  index // index de la chanson dans le tableau
}) => {
  return (
    //on check si on est en mode play && 
    //si le titre de la chanson en cours de lecture == le titre de la chanson du tableau à l'index donné
    isPlaying && activeSong?.title === songs[index]?.title ?
      //si vrai: on retourne l'icone pause avec le méthode handlePause
      <BsPauseCircleFill
        size={size}
        className='text-green shadow-md'
        onClick={handlePause}
      />
      :
      <BsPlayCircleFill
        size={size}
        className='text-green shadow-md'
        onClick={handlePlay} />
  )
}

export default PlayPause