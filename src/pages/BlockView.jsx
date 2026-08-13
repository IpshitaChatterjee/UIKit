import { Link, Navigate, useParams } from 'react-router-dom';
import { getBlock } from '../blocks/registry.js';
import './BlockView.css';

function BlockView() {
  const { slug } = useParams();
  const block = getBlock(slug);

  if (!block) {
    return <Navigate to="/" replace />;
  }

  const Block = block.component;

  return (
    <div className="block-view">
      <div className="block-view__bar">
        <Link to="/" className="block-view__back">
          &larr; All blocks
        </Link>
        <a href={block.figmaUrl} target="_blank" rel="noreferrer" className="block-view__figma">
          View in Figma
        </a>
      </div>
      <div className="block-view__stage">
        <Block />
      </div>
    </div>
  );
}

export default BlockView;
