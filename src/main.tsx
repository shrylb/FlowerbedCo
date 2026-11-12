import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SoundProvider } from './context/SoundContext';

createRoot(document.getElementById('root')!).render(
  <SoundProvider>
    <App />
  </SoundProvider>
);

