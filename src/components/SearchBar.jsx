import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { fetchSearch } from '../redux/album/albumSlice'

const SearchBar = () => {

  //on declare un state pour le champ de recherche
  const [searchWord, setSearchWord] = useState('')
  //on récupère le hook dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearch(searchWord))
   }


  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      className='p-2 text-gray-400 focus-whitin:text-gray-600'
    >
      <label className='sr-only text-white'>Quel est votre recherche?</label>
      <div className='flex justify-start items-center'>
        <BiSearch className='w-5 h-5 ml-4' />
        <input
          type="text"
          className='flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4'
          autoComplete='off'
          placeholder='Rechercher un album, un artiste,...'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button type="submit" className='bg-green_top hover:bg-green px-4 py-2 text-white rounded-lg'>Rechercher</button>
      </div>
    </form>
  )
}

export default SearchBar