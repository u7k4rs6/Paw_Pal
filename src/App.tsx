import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BreedExplorerPage from './pages/BreedExplorerPage';
import AdoptionMatcherPage from './pages/AdoptionMatcherPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="breed-explorer" element={<BreedExplorerPage />} />
        <Route path="adoption-matcher" element={<AdoptionMatcherPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;