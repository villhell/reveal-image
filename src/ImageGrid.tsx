import React from 'react';
import './App.css';
import { useImageGrid } from './useImageGrid';

const ImageGrid: React.FC = () => {
  const {
    opacity,
    complete,
    tooltip,
    revealRandomImage,
    toggleImageVisibility,
    setTooltip,
  } = useImageGrid();

  return (
    <div>
      <button onClick={revealRandomImage}>Reveal Image</button>
      {complete && <p>Complete!</p>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridGap: complete ? '0px' : '2px',
          backgroundColor: '#ccc',
        }}
      >
        {opacity.map((row, i) =>
          row.map((cellOpacity, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => cellOpacity && toggleImageVisibility(i, j)}
              onMouseEnter={() => setTooltip({ i, j })}
              onMouseLeave={() => setTooltip(null)}
              style={{
                backgroundImage: `url(https://github.com/villhell/reveal-image/blob/gh-pages/image1.jpg?raw=true)`,
                backgroundPosition: `-${j * 100}% -${i * 100}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: complete ? 'none' : '1px solid lightgray',
                backgroundSize: '1000%',
                height: '50px',
                width: '50px',
                position: 'relative',
              }}
            >
              <div
                className="image-cell"
                style={{
                  backgroundColor: cellOpacity === 1 ? 'transparent' : '#fff',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontSize: '20px',
                  opacity: cellOpacity === 1 ? 0 : 1,
                }}
              >
                {i * 10 + j + 1}
              </div>
              {cellOpacity === 1 && tooltip?.i === i && tooltip?.j === j && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '2px 5px',
                    borderRadius: '2px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 1,
                  }}
                >
                  {i * 10 + j + 1}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
