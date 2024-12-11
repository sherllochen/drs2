import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Audio, formatTime } from '@sina_byn/re-audio';
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

  useEffect(() => {
    if (files.length === 0) return;

    const sound = new Howl({
      src: files,
    });
    sound.play();
  }, [files]);

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
        <button type="button">
          <span role="img" aria-label="folded hands">
            🙏
          </span>
          Play
        </button>
      </div>

      <Audio
        playlist={[
          { id: 1, src: '/audio/1.mp3', name: 'for-her-chill' },
          {
            id: 2,
            src: '/audio/2.mp3',
            name: 'trap-type-beat-rap-instrumental-riff',
          },
          { id: 3, src: '/audio/3.mp3', name: 'whip-afro-dancehall' },
        ]}
      >
        {(audioContext) => (
          <button type="button">
            {audioContext.playing ? 'pause' : 'play'}
          </button>
        )}
      </Audio>
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
