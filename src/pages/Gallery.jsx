import { Link } from 'react-router-dom';
import blocks from '../blocks/registry.js';
import './Gallery.css';

function Gallery() {
  return (
    <div className="gallery">
      <header className="gallery__header">
        <h1>UIKit Blocks</h1>
        <p>Composed, click-around blocks built from the Storybook component primitives.</p>
      </header>
      <div className="gallery__grid">
        {blocks.map((block) => (
          <article key={block.slug} className="gallery__card">
            <div className="gallery__card-preview" inert="">
              <block.component />
            </div>
            <div className="gallery__card-meta">
              <h2>
                <Link to={`/blocks/${block.slug}`} className="gallery__card-link">
                  {block.name}
                </Link>
              </h2>
              <p>{block.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
