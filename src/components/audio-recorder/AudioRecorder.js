import React, {useState, useEffect, useRef} from 'react';
import './AudioRecorder.scss';
import useRecorder from '../../hooks/useRecorder';

const AudioRecorder = ({theme, deletedAudio, getAudio}) => {
  const [timer, setTimer] = useState(0);
  const [audioStartState, setAudioStartState] = useState('start');
  const tick = useRef();
  const [audio, setAudio] = useState({});
  let [audioURL, isRecording, startRecording, stopRecording, pasueRecording, resumeRecording] = useRecorder();

  useEffect(() => {
    setAudio(audioURL);
    if (audioURL?.type) {
        let file = new File([audioURL.type.data], Date.now(),  {
            type: "audio/mp3",
          });
        getAudio(file)
        console.log(file);
    }
    
  }, [audioURL]);


  useEffect(() => {
      if (isRecording === 'start' || isRecording === 'resume') {
        if (isRecording === 'start') {
            startRecording();
        }
        tick.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
      } else {
        if (isRecording === 'start') {
            clearInterval(tick.current);
        }
      }
      return () => clearInterval(tick.current);
  },[isRecording])
  


  const stopAudio = async() => {
    if (isRecording === 'start' || isRecording === 'pause' || isRecording === 'resume') {
        await stopRecording();
        setAudioStartState('stop');
        setTimer(0)
        clearInterval(tick.current);
       
    } 
  }
  
  const audioPlayAndPause = async() => {
  
    if (audioStartState === 'start' || audioStartState === 'resume') {
        setAudioStartState('pause')
        await pauseAudio();
    } else if (audioStartState === 'pause') {
        await resumeRecording();
        setAudioStartState('resume')
    }
  }


  const pauseAudio = async() => {
    await pasueRecording();
    setAudioStartState('pause');
    clearInterval(tick.current);
  }


  const dispSecondsAsMins = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return mins.toString() + ":" + (seconds_ === 0 ? "00" : seconds_.toString());
  };

  return (
    <>
        <div className='audio-recorder-container border-radius-20-px overflow-hidden position-absolute bg-primary position-absolute z-index-1 left-0-px right-0-px top-0-px bottom-0-px'>
            <div className='display-flex justify-content-flex-end align-items-center height-100-percentage padding-right-5-px'>
                <div className='display-flex gap-3-px align-items-center'>
                    {
                        ((audioStartState === 'start' || audioStartState === 'pause'  || audioStartState === 'resume') ||  audio) &&

                        <div onClick={deletedAudio} style={{"--chat-theme-bgcolor": theme}} className='delete-audio set-color-theme width-35-height-35-px ripple display-flex align-items-center justify-content-center cursor-pointer border-radius-50-percentage'>
                            <i className="material-icons">delete</i>
                        </div>
                    }

                    {
                        (audioStartState  === 'start'  || audioStartState === 'resume')  && 
                        <div style={{"--chat-theme-bgcolor": theme}} className='set-color-theme padding-right-10-px'>
                            <i className='font-style-normal font-weight-500'>
                            {dispSecondsAsMins(timer)}
                            </i>
                        </div>
                    }
                   

                    {
                        (audio && (audioStartState === 'pause' ||  audioStartState == 'stop'))  ? 
                        <>
                            <audio
                                id={`audioId`}
                                
                                src={audio.data}
                                controls
                                type="audio/mp3"
                            />
                                
                        </>
                            
                        : 
                        <>
                            <div className={`waveform-img  border-radius-20-px ${(audioStartState === 'start' || audioStartState === 'resume')  ? '' : 'waveform-animation-unset'} `}></div>                     
                        </>
                            
                    }

                    {
                        audioStartState !== 'stop' &&
                        <div onClick={audioPlayAndPause} style={{"--chat-theme-bgcolor": '#ff3b30'}} className=' set-color-theme  width-35-height-35-px display-flex align-items-center justify-content-center cursor-pointer ripple align-items-center position-relative  border-width-0-px border-radius-20-px display-flex'>
                            <i className="material-symbols-outlined font-size-24-px"> {audioStartState === 'pause' ? 'mic' : 'pause_circle' } </i>
                        </div>

                    }
                       
                    <div onClick={stopAudio} style={{"--chat-theme-bgcolor": theme}} className=' set-color-theme  width-35-height-35-px display-flex align-items-center justify-content-center cursor-pointer ripple align-items-center position-relative  border-width-0-px border-radius-20-px display-flex'>
                        <i className="material-icons font-size-22-px">send</i>
                    </div>                    
                </div>
            </div>
        </div>
    </>
  )
}

export default AudioRecorder;