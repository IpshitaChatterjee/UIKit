import { Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery.jsx';
import BlockView from './pages/BlockView.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/blocks/:slug" element={<BlockView />} />
    </Routes>
  );
}

export default App;
