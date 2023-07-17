import React, { useState, useEffect } from 'react';
import './App.css'; // CSSをインポートします。

const ImageGrid: React.FC = () => {
  const [opacity, setOpacity] = useState<number[][]>(
    Array(10).fill(Array(10).fill(0))
  );
  const [complete, setComplete] = useState(false);
  const [tooltip, setTooltip] = useState<{ i: number; j: number } | null>(null);

  useEffect(() => {
    setComplete(opacity.every((row) => row.every((cell) => cell === 1)));
  }, [opacity]);

  const revealRandomImage = () => {
    if (complete) {
      return; // 全ての画像が表示されていたら関数を抜ける
    }
    let revealed = false;
    while (!revealed) {
      const i = Math.floor(Math.random() * 10);
      const j = Math.floor(Math.random() * 10);
      if (opacity[i][j] === 0) {
        const newOpacity = opacity.map((row) => [...row]);
        newOpacity[i][j] = 1;
        setOpacity(newOpacity);
        revealed = true;
      }
    }
  };

  const toggleImageVisibility = (i: number, j: number) => {
    const newOpacity = opacity.map((row) => [...row]);
    newOpacity[i][j] = 1 - newOpacity[i][j];
    setOpacity(newOpacity);
  };

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
                backgroundImage: `url(https://github.com/villhell/reveal-image/blob/gh-pages/image1.jpg)`,
                backgroundPosition: `-${j * 100}% -${i * 100}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: complete ? 'none' : '1px solid lightgray',
                backgroundSize: '1000%',
                height: '50px', // 画像の高さを調節します。
                width: '50px', // 画像の幅を調節します。
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
