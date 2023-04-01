import { useEffect, useState } from "react";
const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState('start');
  const [recorder, setRecorder] = useState(null);
  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    switch (isRecording) {
      case 'start':
        recorder.start();
        break;
      case 'stop':
        recorder.stop();
        break;
      case 'pause':
        recorder.pause();
        break;
      case 'resume':
        recorder.resume();
        break;  
      default:
        break;
    }
  
    // Obtain the audio when ready.
    const handleData = (e) => {

      setAudioURL({
        data: URL.createObjectURL( e.data),
        type: e,
        name: e.name || Date.now()
      });
    };

    recorder.addEventListener("dataavailable", handleData);

    // return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording('start');
  };

  const stopRecording = () => {
    setIsRecording('stop');
  };

  const pasueRecording = () => {
    setIsRecording('pause');
  };

  const resumeRecording = () => {
    setIsRecording('resume');
  };

  return [audioURL, isRecording, startRecording, stopRecording, pasueRecording, resumeRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream, { type: "audio/mp3" });
}
export default useRecorder;
