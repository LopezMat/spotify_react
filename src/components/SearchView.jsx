import React from 'react'
import { useSelector } from 'react-redux';
import { selectAlbumsData } from '../redux/album/albumSelector';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';

const SearchView = () => {

	//on récupère les info du slice Album
	const { searchAlbums, searchArtist } = useSelector(selectAlbumsData);
	//on recupere les infos du slice player ppour alimenter le composant AlbumCard
	const { activeSong, isPlaying } = useSelector(state => state.player)
	//on récupère les données de searchAlbums
	const dataAlbum = searchAlbums['hydra:member'] //on recupere les infos de l'album
	//on recupère les données de searchArtist
	const dataArtist = searchArtist['hydra:member']
	console.log('AAAAAAAAAAA', dataAlbum)
	console.log('BBBBBBBBBBB', dataArtist)

	return (
		<>

			{/* partie album */}
			{dataAlbum && dataAlbum.length > 0
				? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultats de la recherche</h2>
				: <h2 className='font-bold text-3xl text-red-700 text-left mt-10 mb-4'>Aucun album correspondant</h2>
			}
			<div className="flex flex-wrap">
				{dataAlbum && dataAlbum.map((data, index) => (
					<div key={`album_${index}`} className="p-3 m-3">
						<AlbumCard
							data={data} //on lui passe data comme props de l'album
							index={0} //on lui passe index
							songs={data?.songs} //on lui passe dataAlbum
							isPlaying={isPlaying} //on lui passe isPlaying
							activeSong={activeSong} //on lui passe activeSong
						/>
					</div>
				))
				}
			</div>

			{/* partie artiste  */}
			{dataArtist && dataArtist.length > 0
				? <h2 className='font-bold text-3xl text-white text-left mt-10 mb-4'>Résultats de la artiste</h2>
				: <h2 className='font-bold text-3xl text-red-700 text-left mt-10 mb-4'>Aucun artiste correspondant</h2>
			}
			<div className="flex flex-wrap">
				{dataArtist && dataArtist.map((data, index) => (
					<div key={`artist_${index}`} className="p-3 m-3">
						<ArtistCard dataArtist={data} />
					</div>
				))
				}
			</div>



		</>
	)
}

export default SearchView