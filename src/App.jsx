import { Navigate, Route, Routes } from 'react-router-dom';
import BlockView from './pages/BlockView.jsx';
import blocks from './blocks/registry.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/blocks/${blocks[0].slug}`} replace />} />
      <Route path="/blocks/:slug" element={<BlockView />} />
    </Routes>
  );
}

export default App;
