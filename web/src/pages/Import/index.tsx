import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer, Error } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [listFiles, setListFiles] = useState<FileProps[]>([]);
  const [messageError, setMessageError] = useState('');
  const history = useHistory();

  async function handleUpload(): Promise<void> {

    if (!listFiles || !listFiles.length) {
      setMessageError('Nenhum arquivo selecionado');
      return;
    }

    const data = new FormData();
    listFiles.map( file => {
      data.append('file', file.file);
    })
    try {
      await api.post('/transactions/import', data);
      history.push('/');
    } catch (err) {
      setMessageError(err.response.error);
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const uploadedFiles = files.map((file) => {
      return {
        file: file,
        name: file.name,
        readableSize: filesize(file.size),
      }
    });

    const fileList = [...listFiles, ...uploadedFiles];

    if (fileList && fileList.length > 1) {
      setMessageError('Permitido apenas 1 arquivo por importação.');
      return;
    }

    const filterFiles = fileList.filter((v,i,a) =>
      a.findIndex( t => (t.name === v.name && t.readableSize === v.readableSize )) === i);

    setListFiles(filterFiles);
    setMessageError('');
  }

  function updateFileList(files: FileProps[]): void { // função disparada quando se exclui um arquivo no componente FileList
    const updatedFiles = files.map((file) => {
      return {
        file: file.file,
        name: file.name,
        readableSize: file.readableSize,
      }
    });
    setListFiles(updatedFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importe suas transações</Title>
        {messageError && <Error>{messageError}</Error>}
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!listFiles.length && <FileList onDeleteFile={updateFileList} files={listFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
