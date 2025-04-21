import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { PetContextProvider } from './context/PetContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PetContextProvider>
        <App />
      </PetContextProvider>
    </BrowserRouter>
  </StrictMode>
);