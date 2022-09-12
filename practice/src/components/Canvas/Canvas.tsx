import { useRef } from 'react';

import { css } from '@emotion/css';
import { useDraw } from 'components/hooks/useDraw';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { startDrawing, endDrawing, drawLine } = useDraw(canvasRef);

  return (
    <canvas
      width={500}
      height={500}
      className={containerCss}
      ref={canvasRef}
      onMouseMove={drawLine}
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
