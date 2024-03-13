import React from 'react'
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs'
import { MdOutlineSkipNext, MdSkipNext, MdSkipPrevious } from 'react-icons/md'

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, handlePlayPause, handleNextSong, handlePrevSong, currentSongs }) => {
    return (
        <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
            {/* on affiche le bouton repeat */}
            <BsArrowRepeat
                size={20}
                color={repeat ? 'rgba(30, 215, 96, 1)' : '#FFF'}
                className='cursor-pointer hidden sm:block'
                onClick={() => setRepeat((prev) => !prev)}
            />
            {/* on affiche le bouton précedent si on un tableau de chanson */}
            {currentSongs.length > 1 &&
                <MdSkipPrevious
                    size={30}
                    color="#FFF"
                    className='cursor-pointer'
                    onClick={handlePrevSong}
                />
            }
            {/* on affiche le bouton play/pause */}
            {isPlaying
                ? (
                    //on affiche le bouton pause
                    <BsFillPauseFill
                        size={45}
                        color="#FFF"
                        className='cursor-pointer'
                        onClick={handlePlayPause}
                    />
                )
                : (
                    //sinon affiche le bouton play
                    <BsFillPlayFill
                        size={45}
                        color="#FFF"
                        className='cursor-pointer'
                        onClick={handlePlayPause}
                    />
                )
            }
            {/* on affiche le bouton suivant si on un tableau de chanson */}
            {currentSongs.length > 1 &&
                <MdSkipNext
                    size={30}
                    color="#FFF"
                    className='cursor-pointer'
                    onClick={handleNextSong}
                />
            }
            {/* on affiche le bouton shuffle */}
            <BsShuffle
                size={20}
                color={shuffle ? 'rgba(30, 215, 96, 1)' : '#FFF'}
                className='cursor-pointer hidden sm:block'
                onClick={() => setShuffle((prev) => !prev)}
            />
        </div>
    )
}

export default Controls