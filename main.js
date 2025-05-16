const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('abrir-arquivo', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
    properties: ['openFile'],
  });

  if (result.canceled) return { cancelado: true };

  const caminho = result.filePaths[0];
  const conteudo = fs.readFileSync(caminho, 'utf-8');

  return { conteudo, caminho };
});

ipcMain.handle('salvar-arquivo', async (_, { caminho, conteudo }) => {
  fs.writeFileSync(caminho, conteudo, 'utf-8');
  return { sucesso: true };
});


ipcMain.handle('salvar-arquivo-como', async (_, conteudo) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [
  { name: 'Text Files', extensions: ['txt'] },
  { name: 'Markdown', extensions: ['md'] },
  { name: 'JSON Files', extensions: ['json'] },
  { name: 'Todos os arquivos', extensions: ['*'] },
]
  });

  if (canceled || !filePath) {
    return {};
  }

  fs.writeFileSync(filePath, conteudo, 'utf-8');

  return { caminho: filePath };
});
