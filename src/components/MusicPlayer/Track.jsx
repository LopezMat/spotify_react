import React from 'react'
import { albumUrl } from '../../constants/apiConstant'

const Track = ({ isPlaying, isActive, activeSong, currentAlbum }) => {

    //on déclare nos constante
    //on récupère une image de l'album
    const imgPath = `${albumUrl}/${currentAlbum?.imagePath}`;
    console.log(currentAlbum)
    const title = activeSong?.title ?? 'Titre inconnu';
    const artist = activeSong?.artist?.name ?? 'Artiste inconnu';
    const album = currentAlbum?.title ?? 'Album inconnu'



    return (
        <div className="flex flex-1 items-center justify-start">
            {/* on affiche l'image de l'album */}
            <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
                <img src={imgPath} alt={`image album ${album}`} className="rounded-full " />
            </div>
            <div className='w-[50%]'>
                <p className="truncate text-white font-bold text-lg">
                    {title}
                </p>
                <p className="truncate text-gray-300">
                    {artist}
                </p>
            </div>
        </div>
    )
}

export default Track