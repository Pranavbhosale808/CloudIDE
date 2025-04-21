import chokidar from 'chokidar';
import { writeFileContent } from '../models/fileModel.js';

export function watchFiles(io) {
  const watchFolder = `${process.cwd()}/user`;
  const watcher = chokidar.watch(watchFolder, { persistent: true, ignoreInitial: false });

  watcher
    .on('add', (filePath) => {
      // console.log('File added:', filePath);
      io.emit('fileUpdate', { action: 'add', path: filePath });
    })
    .on('unlink', (filePath) => {
      // console.log('File removed:', filePath);
      io.emit('fileUpdate', { action: 'remove', path: filePath });
    })
    .on('addDir', (dirPath) => {
      // console.log('Folder added:', dirPath);
      io.emit('fileUpdate', { action: 'addDir', path: dirPath });
    })
    .on('unlinkDir', (dirPath) => {
      // console.log('Folder removed:', dirPath);
      io.emit('fileUpdate', { action: 'removeDir', path: dirPath });
    });

  io.on('connection', (socket) => {
    socket.on('file:change', (data) => {
      const { path, content } = data;
      writeFileContent(path, content);
    });
  });
}