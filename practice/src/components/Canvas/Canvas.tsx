import { useRef } from 'react';

import { css } from '@emotion/css';
import { useDraw } from 'hooks/useDraw';
import useDrawStore from 'store';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tool } = useDrawStore();
  const { startDrawing, endDrawing, drawLine, drawSquare } = useDraw(canvasRef);

  const drawCanvas = (() => {
    switch (tool) {
      case 'square':
        return drawSquare;
      case 'pencil':
        return drawLine;
    }
  })();

  return (
    <canvas
      width={500}
      height={500}
      className={containerCss}
      ref={canvasRef}
      onMouseMove={drawCanvas}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing}
    />
  );
};

export default Canvas;

const containerCss = css`
  border: 1px solid;
`;
