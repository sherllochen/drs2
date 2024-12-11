import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const [files, setFiles] = useState<string[]>([]); // List of file paths
  const [fileContent, setFileContent] = useState<string>(''); // Content of the selected file

  useEffect(() => {
    const func = async () => {
      setFiles(await window.electron.ipcRenderer.getFileList()); // Store file paths
    };

    func();
  }, []);

  const fetchFileContent = async (filePath: string) => {
    try {
      const content = await window.electron.ipcRenderer.readFile(filePath);
      console.log('File content:', content);
      setFileContent(content); // Update the file content
    } catch (error) {
      console.error('Failed to read file content:', error);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
        <button
          type="button"
        >
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Play
        </button>
      </div>
      {files.length > 0 && (
        <div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls>
            <source src={files[0]} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
