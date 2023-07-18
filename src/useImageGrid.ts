// useImageGrid.ts
import { useState, useEffect } from 'react';

export const useImageGrid = () => {
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

  return {
    opacity,
    complete,
    tooltip,
    revealRandomImage,
    toggleImageVisibility,
    setTooltip,
  };
};
