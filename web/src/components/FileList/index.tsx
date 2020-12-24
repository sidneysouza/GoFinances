import React, { useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Container, FileInfo } from './styles';

import logoCSV from '../../assets/csv.svg';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

interface FileListProps {
  files: FileProps[];
  onDeleteFile: Function;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteFile }: FileListProps) => {

  const [fileList, setFileList] = useState<FileProps[]>([]);

  async function handleDeleteFile(filename:string) {
    const filesFiltered = fileList.filter((file) => file.name !== filename);
    onDeleteFile(filesFiltered);
    setFileList(filesFiltered);
  }

  useEffect(() => {
    const fileList = files.map((file) => {
      return {
        file: file.file,
        name: file.name,
        readableSize: file.readableSize,
      }
    });
    setFileList(fileList);
  }, [files])

  return (
    <Container>
      {fileList.map((uploadedFile, index) => (
        <li key={index}>
          <FileInfo>
            <div>
              <span>
                <img src={logoCSV} alt={uploadedFile.name} />
                {uploadedFile.readableSize}
              </span>
              <strong>
                {uploadedFile.name}
              </strong>
            </div>
            <button onClick={(e) => {handleDeleteFile(uploadedFile.name)}} type="button"><FiTrash2 size={20} /></button>
          </FileInfo>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
