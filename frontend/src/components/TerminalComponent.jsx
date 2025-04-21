import {Terminal as XTerminal} from '@xterm/xterm';
import { useEffect, useRef } from 'react';
import React from 'react'
import "@xterm/xterm/css/xterm.css";
import socket from '../socket/socket';

const TerminalComponent = () => {
    const terminalRef  = useRef();
    const isRendered = useRef(false);

    useEffect(() => { 
        if(isRendered.current) return;
        isRendered.current = true;
        const term = new XTerminal({
          rows: 15,
        })

        term.open(terminalRef.current);

        term.onData((data) => {
          socket.emit('terminal:write', data);
          

          if (data.includes("python")) {
            const filePath = data.split(" ")[1].trim();
            socket.emit('execute:python', filePath);
          }
          
        });

        socket.on('terminal:data', (data) => {
          term.write(data);
          
        });

      }, []);
  return (
    <div ref={terminalRef} id="terminal" />
  )
}

export default TerminalComponent