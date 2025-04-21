import { spawn } from 'node-pty';
import { spawn as childSpawn } from 'child_process';

let ptyProcess;

export function initialize(io) {
  ptyProcess = spawn("bash", [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: `${process.cwd()}/user`,
    env: process.env,
  });

  const executePythonFile = (filePath) => {
    const process = childSpawn('python3', [filePath]);
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      io.emit("terminal:data", data);
    });
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      io.emit("terminal:error", data);
    });
    process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };

  ptyProcess.on('data', (data) => {   
    // console.log("Output: ", data);
    io.emit("terminal:data", data);

    // Add execution of Python file here
    if (data.includes("python")) {
      const filePath = data.split(" ")[1].trim();
      executePythonFile(filePath);
    } 
  });

  io.on("connection", (socket) => {
    console.log("Connected to client", socket.id);

    socket.on("terminal:write", (data) => {
      ptyProcess.write(data);
    });

    socket.on("execute:python", (filePath) => {
      console.log(`Executing Python file: ${filePath}`);
      const command = `python3 ${filePath}\n`;
      ptyProcess.write(command); 
    });

    socket.on("execute:node", (filePath) => {
      console.log(`Executing Javascript file: ${filePath}`);
      const command = `node ${filePath}\n`;
      ptyProcess.write(command); 
    });

    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} disconnected`);
    });
  });
}