import { Navigate, useParams } from 'react-router-dom';
import { getBlock } from '../blocks/registry.js';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle.jsx';
import { useTheme } from '../hooks/useTheme.js';
import './BlockView.css';

function BlockView() {
  const { slug } = useParams();
  const block = getBlock(slug);
  const [theme, toggleTheme] = useTheme();

  if (!block) {
    return <Navigate to="/" replace />;
  }

  const Block = block.component;

  return (
    <div className="block-view">
      <Block />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </div>
  );
}

export default BlockView;
