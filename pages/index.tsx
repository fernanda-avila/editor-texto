import { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/global';

declare global {
  interface Window {
    electronAPI: {
      abrirArquivo: () => Promise<{ conteudo?: string; caminho?: string }>;
      salvarArquivo: (dados: { caminho: string; conteudo: string }) => Promise<void>;
      salvarArquivoComo: (conteudo: string) => Promise<{ caminho?: string }>;
    };
  }
}

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: auto;
`;

const ButtonGroup = styled.div`
  margin-bottom: 1rem;
  & > button {
    margin-right: 1rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  font-size: 1rem;
  font-family: monospace;
  padding: 1rem;
  box-sizing: border-box;
`;

export default function Home() {
  const [conteudo, setConteudo] = useState('');
  const [caminho, setCaminho] = useState('');

  const abrir = async () => {
    const res = await window.electronAPI.abrirArquivo();
    if (res.conteudo) {
      setConteudo(res.conteudo);
      setCaminho(res.caminho || '');
    }
  };

  const salvar = async () => {
    if (!caminho) {
      alert('Abra um arquivo antes de salvar ou use "Salvar Como" para criar um novo!');
      return;
    }
    await window.electronAPI.salvarArquivo({ caminho, conteudo });
    alert('Arquivo salvo!');
  };

  
  const salvarComo = async () => {
    const res = await window.electronAPI.salvarArquivoComo(conteudo);
    if (res.caminho) {
      setCaminho(res.caminho);
      alert('Arquivo salvo com sucesso!');
    } else {
      alert('Operação cancelada ou falhou.');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <h1> <text-editor-app/></h1>
        <ButtonGroup>
          <button onClick={abrir}>Abrir</button>
          <button onClick={salvar}>Salvar</button>
          <button onClick={salvarComo}>Salvar Como</button>
        </ButtonGroup>
        <TextArea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          placeholder="Digite seu texto aqui..."
        />
      </Container>
    </>
  );
}
