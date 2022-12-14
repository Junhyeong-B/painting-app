import React, { useState } from 'react';
import useDrawStore from 'store';

const BG_COLOR = "white";

export const useDraw = (ref: React.RefObject<HTMLCanvasElement>) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { color, range } = useDrawStore();
  const [prevCanvasImage, setPrevCanvasImage] = useState<ImageData>();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }
    const x = e.clientX - ref.current.offsetLeft;
    const y = e.clientY - ref.current.offsetTop;

    context.beginPath();
    context.moveTo(x, y);
    setStartPosition({ x, y });
    setIsDrawing(true);
    setPrevCanvasImage(context.getImageData(0, 0, ref.current.width, ref.current.height))
  };

  const endDrawing = () => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    setIsDrawing(false);
    context.closePath();
  };

  const drawLine = (
    e: React.MouseEvent<HTMLCanvasElement>,
    options?: { color?: string; range?: number }
  ) => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    context.strokeStyle = options?.color ?? color;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = options?.range ?? range;

    const x = e.clientX - ref.current.offsetLeft;
    const y = e.clientY - ref.current.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  const drawSquare = (e: React.MouseEvent<HTMLCanvasElement>, fill?: boolean) => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = range;

    const nextX = e.clientX - ref.current.offsetLeft;
    const nextY = e.clientY - ref.current.offsetTop;
    const { x, y } = startPosition;

    context.clearRect(0, 0, ref.current.width, ref.current.height);
    if (prevCanvasImage) {
      context.putImageData(prevCanvasImage, 0, 0);
    }

    if (fill) {
      context.fillRect(x, y, nextX - x, nextY - y)
    } else {
      context.strokeRect(x, y, nextX - x, nextY - y);
    }
  }

  const drawFillSquare = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawSquare(e, true)
  }

  const eraser = (e: React.MouseEvent<HTMLCanvasElement>) => {
    drawLine(e, { color: BG_COLOR, range: 40 });
  }

  const drawCircle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = range;

    const r = (e.clientX - ref.current.offsetLeft) / 2;
    const { x, y } = startPosition;

    context.arc(x, y, r, 0, Math.PI * 2);
    context.clearRect(0, 0, ref.current.width, ref.current.height);
    if (prevCanvasImage) {
      context.putImageData(prevCanvasImage, 0, 0);
    }
    context.stroke();
  }

  return {
    startDrawing,
    endDrawing,
    drawLine,
    drawSquare,
    drawFillSquare,
    eraser,
    drawCircle,
  };
};
