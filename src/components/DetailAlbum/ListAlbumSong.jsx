import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveAlbum, setActiveSong } from '../../redux/player/playerSlice';
import { tableIcon } from '../../constants/appConstant';
import { BiTime } from 'react-icons/bi';
import PlayPause from '../PlayPause';

const ListAlbumSong = ({ dataAlbum }) => {

	//on déclare nos constante 
	const data = dataAlbum; //info de l'album
	const songs = dataAlbum?.songs; //liste des titres de l'album
	//on déclare nos states
	const [isHover, setIsHover] = useState(-1); //quand le curseur sera sur une piste du tableau
	//on récupère les données du store
	const { isPlaying, activeSong } = useSelector(state => state.player)
	//on récupère les hooks 
	const dispatch = useDispatch();
	//on crée la méthode pour mettre en pause
	const handlePauseClick = () => {
		dispatch(playPause(false))
	}
	//on crée la méthode pour mettre en lecture
	const handlePlayClick = (index) => {
		dispatch(setActiveSong({ songs, data, index }));
		dispatch(setActiveAlbum({ data }));
		dispatch(playPause(true));
	}

	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto min-w-full sm:px-6 lg:px-8">
				<div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
					<div className="overflow-hidden">
						<table className="min-w-full text-left text-sm font-light">
							<thead className="border-b font-medium">
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
									? songs.map((row, index) => {
										//formatage du temps pour les titres 
										const minutes = Math.floor(row.duration / 60);
										const seconds = row.duration % 60;
										//formatage du temps pour la durée de l'album mm:ss
										const duration = seconds < 10
											? `${minutes}:0${seconds}`
											: `${minutes}:${seconds}`;

										return (
											<tr
												key={index}
												className='border-b transition duration-300 ease-in-out hover:bg-gradient-to-b from-green_top to-transparent'
												onMouseEnter={() => setIsHover(index)}
												onMouseLeave={() => setIsHover(-1)}
											>
												<td className="whitespace-nowrap px-6 py-4 font-medium m-1">
													{/* on vas utiliser is hover pour afficher le bouton play  */}
													{isHover !== index && `#${index + 1}`}
													{isHover === index && (
														<PlayPause
															size='16px'
															songs={songs}
															isPlaying={isPlaying}
															activeSong={activeSong}
															handlePause={handlePauseClick}
															handlePlay={() => handlePlayClick(index)}
															index={index}
														/>
													)}
												</td>
												<td className="whitespace-nowrap px-6 py-4 font-medium m-1">
													{row.title}
												</td>
												<td className="whitespace-nowrap px-6 py-4 font-medium m-1">
													{duration}
												</td>
											</tr>
										)
									})
									: (
										<tr>
											<td colSpan="3">Aucune chanson pour l'instant</td>
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