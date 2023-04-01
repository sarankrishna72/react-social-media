import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { getLoginDetails } from '../core/auth/Auth';

const SocketContext = createContext();

const socket = io('http://localhost:5000');
// const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isCalled, setIsCalled] = useState(false)
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  
  const currentUserId = getLoginDetails()._id;

  useEffect(() => {
    socket.on('me', (id) => setMe(id));
    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

  }, []);


  const callInitiate = () => {
    return new Promise(
        (resolve) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
              setStream(currentStream);
              myVideo.current.srcObject = currentStream;
              resolve(currentStream)
            });
        }
    )
  }

  const answerCall = () => {
    setCallAccepted(true);
    const peer1 = new Peer({ initiator: false, trickle: false, stream });

    peer1.on('signal', (data) => {
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer1.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    peer1.signal(call.signal);
    connectionRef.current = peer1;

  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setIsCalled(true)
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: currentUserId, name });
    });


    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      socket,
      isCalled,
      callInitiate
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
