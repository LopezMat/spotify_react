import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { fetchSearch } from '../redux/album/albumSlice'
import { useDispatch } from 'react-redux'

const SearchBar = () => {
	//on déclare un state pour récupérer les caractère de l'input recherche
	const [searchWord, setSearchWord] = useState('')
	//on récupère le hook dispatch
	const dispatch = useDispatch()

	//on déclare notre handleSubmit pour envoyer la requête au serveur 
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchSearch(searchWord))
	}


	return (
		<form
			onSubmit={handleSubmit}
			autoComplete='off'
			className='p-2 text-gray-400 focus-within:text-gray-600'
		>
			<label className='sr-only text-white'>Quelle est votre recherche ?</label>
			<div className="flex justify-start items-center">
				<BiSearch className='w-5 h-5 ml-4' />
				<input
					type='text'
					className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-white text-base p-4'
					autoComplete='off' //on deactive l'autocompletion
					placeholder='Quelle est votre recherche ?' //on affiche ce texte
					value={searchWord} //on affiche le state
					onChange={(e) => setSearchWord(e.target.value)} //on met a jour le state
				/>
				<button type='submit' className='bg-green_top hover:bg-green px-4 py-2 text-white rounded-lg'>Rechercher</button>
			</div>
		</form>
	)
}

export default SearchBar