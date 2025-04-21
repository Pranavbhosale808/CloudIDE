import fs from 'fs/promises';
import path from 'path';

export async function generateFileTree(directory) {
  const tree = {};

  async function buildTree(currentDir, currentTree) {
    const files = await fs.readdir(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        currentTree[file] = {};
        await buildTree(filePath, currentTree[file]);
      } else {
        currentTree[file] = null;
      }
    }
  }

  await buildTree(directory, tree);
  return tree;
};

export async function readFileContent(filePath) {
  return await fs.readFile(filePath, "utf8");
};

export async function writeFileContent(filePath, content) {
  console.log("saving file: ", filePath);
  
  const basePath = (req) => `${process.cwd()}/user/${req.header('username')}`;
  const absoluteFilePath = path.join(basePath, filePath);
  console.log("absoluteFilePath: ", absoluteFilePath);
  return await fs.writeFile(absoluteFilePath, content);
};