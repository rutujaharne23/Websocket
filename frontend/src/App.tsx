import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      setSocket(newSocket)
      //newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setLatestMessage(message.data)
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])


  if(!socket){
    return <div>
    Connecting to socket server...
  </div>
  }

  return (
    <>
      <div className='ws-container'>
        <div>
          <input className='inputBox' onChange={(e) => {
            setSendMessage(e.target.value)
          }} type="text" placeholder='Type message here...'></input>
        </div>
        <div>
          <button onClick={() => {
            socket.send(sendMessage)
          }}>Send</button>
        </div>
      </div>
      {latestMessage}
    </>
  )
}

export default App
