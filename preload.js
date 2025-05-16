const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  abrirArquivo: () => ipcRenderer.invoke('abrir-arquivo'),
  salvarArquivo: (dados) => ipcRenderer.invoke('salvar-arquivo', dados),
  salvarArquivoComo: (conteudo) => ipcRenderer.invoke('salvar-arquivo-como', conteudo)
});
