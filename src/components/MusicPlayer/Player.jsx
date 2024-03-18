import React, { useEffect, useRef } from 'react'
import { musicUrl } from '../../constants/apiConstant';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {

  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play(); //permet de lancer la musique
    } else {
      ref.current.pause(); //permet de mettre en pause la musique
    }
  }

  //permet d'affilier le volume a notre player
  useEffect(() => {
    ref.current.volume = volume;
  }, [volume])

  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime])

  return (
    <audio
      src={`${musicUrl}/${activeSong?.filePath}`}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  )
}

export default Player