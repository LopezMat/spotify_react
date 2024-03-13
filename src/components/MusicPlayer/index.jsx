import React, { useEffect, useState } from 'react'
import Track from './Track'
import { useDispatch, useSelector } from 'react-redux';
import Controls from './Controls';
import { nextSong, playPause, prevSong } from '../../redux/player/playerSlice';
import VolumeBar from './VolumeBar';
import SeekBar from './SeekBar';
import Player from './Player';



const MusicPlayer = () => {

	//on récupère toutes les données du slice player
	const { activeSong, currentSongs, currentAlbum, currentIndex, isActive, isPlaying } = useSelector(state => state.player);

	//on déclare nos states
	const [shuffle, setShuffle] = useState(false); //état pour le mode aléatoire
	const [repeat, setRepeat] = useState(false); //état pour le mode repetition
	const [volume, setVolume] = useState(0.3); //etat pour le volume
	const [duration, setDuration] = useState(0); //duree de la chanson
	const [seekTime, setSeekTime] = useState(0); //récupérer la position de la barre (si on déplace le curseur manuellement)
	const [appTime, setAppTime] = useState(0); //temps de lecture de la chanson

	//on récupère nos hooks
	const dispatch = useDispatch();

	useEffect(() => {
		//si le store contient un tableau de chanson on dispatch playPause a true
		if (currentSongs.length) dispatch(playPause(true));
	}, [currentIndex]) //si currentIndex change on reload le composant


	//on créer nos méthode 
	//méthode pour gérer l"état de play/pause
	const handlePlayPause = () => {
		//si aucune chanson active on retourne
		if (!isActive) return;

		//si une chanson est active 
		isPlaying ? dispatch(playPause(false)) : dispatch(playPause(true));
	}

	//méthode pour avancer ou reculer d'une chanson
	const handleNextSong = () => {
		//si on est pas en mode aléatoire
		if (!shuffle) {
			dispatch(nextSong((currentIndex + 1) % currentSongs.length));
		} else {
			//si on est en mode aléatoire
			dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
		}



	}
	//méthode pour reculer à la chanson precedente
	const handlePrevSong = () => {
		//si on est a la prémière chanson on doit retourner à la derniere
		if (currentIndex === 0) {
			dispatch(prevSong(currentSongs.length - 1));
		} else if (shuffle) {
			//si on est en mode aléatoire
			dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
		} else {
			//sinon on retourne à la chanson precedente
			dispatch(prevSong(currentIndex - 1));
		}
	}

	return (
		<div className='relative sm:px-12 px-8 w-full flex items-center justify-between'>
			<Track
				isPlaying={isPlaying} //savoir si on est en lecture ou non
				isActive={isActive} //savoir si une musique est active
				currentAlbum={currentAlbum} //album en cours de lecture
				activeSong={activeSong}//chanson en cours de lecture
			/>
			<div className='flex flex-1 flex-col items-center justify-center mt-3'>
				<Controls
					isPlaying={isPlaying} //savoir si on est en lecture ou non
					isActive={isActive} //savoir si unbe musique est active
					currentSongs={currentSongs} //tableau de chanson
					handlePlayPause={handlePlayPause} //méthode pour gérer l"état de play/pause
					handleNextSong={handleNextSong} //méthode pour avancer
					handlePrevSong={handlePrevSong} //méthode pour reculer
					repeat={repeat} //etat pour le mode repetition
					setRepeat={setRepeat} //méthode pour changer l'etat du mode repetition
					shuffle={shuffle} //etat pour le mode aléatoire
					setShuffle={setShuffle} //méthode pour changer l'etat du mode aléatoire
				/>
				<SeekBar
					value={appTime} //temps de lecture de la chanson
					min='0' //valeur min du slider
					max={duration} //valeur max du slider
					onInput={(event) => setSeekTime(event.target.value)} //méthode pour sélectionner la position de la barre (si on déplace le curseur manuellement)
					setSeekTime={setSeekTime} //méthode pour sélectionner la position de la barre (si on déplace le curseur manuellement)
					appTime={appTime} //pour récupèrer la position de la barre de lecture de la chanson
				/>
				<Player
					activeSong={activeSong} //chanson en cours de lecture
					volume={volume} //valeur du volume réel
					isPlaying={isPlaying} //savoir si on est en lecture ou non
					seekTime={seekTime} //pour sélectionner la position de la barre (si on déplace le curseur manuellement)
					repeat={repeat} //etat pour le mode repetition
					currentIndex={currentIndex} //index de la chanson en cours de lecture
					onEnded={handleNextSong} //méthode pour passer à la chanson suivante
					onTimeUpdate={(event) => setAppTime(event.target.currentTime)} //méthode pour actualiser le temps de lecture
					onLoadedData={(event) => setDuration(event.target.duration)} //méthode pour actualiser la duree de la chanson
				/>
			</div>
			<VolumeBar
				value={volume} //valeur du volume réel
				min='0' //valeur min du slider
				max='1' //valeur max du slider
				onChange={(e) => setVolume(Number(e.target.value))} //méthode pour récupèrer la position de la barre de volume
				setVolume={setVolume}
			/>
		</div>
	)
}

export default MusicPlayer