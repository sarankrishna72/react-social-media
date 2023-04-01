import React from 'react';
import './AudioPlayer.scss';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

const AudioPlayer = ({ path, playbackSpeed, theme = '#1877f2'}) => {
    const audioRef = useRef();
    const progressBar = useRef();
    const commonPlaybackRateList = {
        "0": 0.5,
        "0.5": 1,
        "1": 1.25,
        "1.25": 1.5,
        "1.5": 2,
        "2": 3,
        "3": 0.5
    };
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentAudioDetail, setCurrentAudioDetail] = useState({
        progress: 0,
    })

    const [playbackRate, setPlayBackRate] = useState(playbackSpeed || 1)


    useEffect(() => {
        audioRef.current.playbackRate = playbackRate;
    },[playbackRate])

    const onPlaying = (event) => {
        const duration = audioRef.current.duration;
        const ct = audioRef.current.currentTime;
        let currentTime = `${('0'+Math.floor((ct)/60)).slice(-2)}:${('0'+Math.floor((ct)%60)).slice(-2)}`
        let mediaDuration = `${('0'+Math.floor((duration)/60)).slice(-2)}:${('0'+Math.floor((duration)%60)).slice(-2)}`
        setCurrentAudioDetail({"duration": mediaDuration, "progress": ((ct / duration) * 100), "ct": currentTime })
    }

    const onEnded = (e) => {
        setIsPlaying(false)
    }

    const onLoadedMetadata = (e) => {
            audioRef.current.currentTime = 1e101;
            audioRef.current.ontimeupdate = function () {
                this.ontimeupdate = () => {
                    return;
                }
                audioRef.current.currentTime = 0;
                return;
            }
        // }
    }

    const changeProgress = (e) => {
        e.stopPropagation();
        // var pos = e.nativeEvent.pageX - e.nativeEvent.offsetX().left; //Position cursor
        let percent = (e.nativeEvent.offsetX / progressBar.current.offsetWidth) ; //Get width element

        audioRef.current.currentTime = percent * audioRef.current.duration;
        setCurrentAudioDetail({...currentAudioDetail, ...{"progress": percent * 100}})
    }

    const audioPlayPause = () => {
        if (!isPlaying) {
            audioRef.current.playbackRate = playbackRate;
            audioRef.current.play();
            setIsPlaying(true)
        } else {
            audioRef.current.pause();
            setIsPlaying(false)
        }
       
    }

    return (
        <>
            <div>
                <div className='audio-playback-container min-height-40-px display-flex align-items-center width-100-percentage'>
                    <div className='display-flex flex-direction-column bg-ffffff border-radius-10-px width-100-percentage justify-content-center padding-top-5-px padding-bottom-5-px padding-left-10-px padding-right-10-px min-width-250-px'>
                        <div className='display-flex  gap-5-px  align-items-center width-100-percentage'>
                            <audio onEnded={onEnded} ref={audioRef} onLoadedMetadata={onLoadedMetadata} onTimeUpdate={onPlaying} src={path}></audio>
                            <div onClick={audioPlayPause}  style={{"--chat-theme-bgcolor": theme}}  className='width-40-height-40-px min-width-40-px set-color-theme display-flex align-items-center justify-content-center ripple border-radius-50-percentage'>
                                <i className='material-symbols-outlined font-size-35-px'> {isPlaying ? 'pause' : 'play_circle'} </i>
                            </div>
                            <div onClick={(event) => changeProgress(event)} ref={progressBar} className='audio-slider-container cursor-pointer position-relative border-radius-3-px width-100-percentage height-8-px'>
                                <div className='height-8-px border-radius-3-px' style={{background: theme, width: `${currentAudioDetail.progress}%`}}></div>
                            </div>
                            <div onClick={() => setPlayBackRate(commonPlaybackRateList[playbackRate])} className='min-width-40-px ripple border-radius-20-px display-flex align-items-center justify-content-center font-size-10-px font-weight-500  height-20-px' style={{background: theme}}>
                                { playbackRate ? `${playbackRate}×` : '1×' } 
                            </div>
                        </div>
                        <div style={{"--chat-theme-bgcolor": theme}} className='set-color-theme display-flex padding-left-8-px'>
                            <i className='font-style-normal font-size-11-px'>
                                {
                                    currentAudioDetail.progress === 0  ? currentAudioDetail.duration : currentAudioDetail.ct
                                }
                            </i>
                            
                        </div>            
                    </div>
                </div>
               
            </div>
           
        </>
    )
}

export default AudioPlayer