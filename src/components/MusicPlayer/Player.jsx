import React, { useEffect, useRef } from 'react'
import { musicUrl } from '../../constants/apiConstant';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {

	const ref = useRef(null);

	if (ref.current) {
		if (isPlaying) {
			ref.current.play(); //play
		} else {
			ref.current.pause(); //pause
		}
	}

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