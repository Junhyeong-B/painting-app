import React, { useState } from 'react';
import useDrawStore from 'store';

export const useDraw = (ref: React.RefObject<HTMLCanvasElement>) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { color, range } = useDrawStore();

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

  const drawLine = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    context.strokeStyle = color;
    context.lineJoin = 'round';
    context.lineCap = 'round'
    context.lineWidth = range;

    const x = e.clientX - ref.current.offsetLeft;
    const y = e.clientY - ref.current.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  const drawSquare = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ref.current) {
      return;
    }
    const context = ref.current.getContext('2d');

    if (!context) {
      return;
    }

    context.strokeStyle = color;
    context.lineJoin = 'round';
    context.lineCap = 'round'
    context.lineWidth = range;

    const nextX = e.clientX - ref.current.offsetLeft;
    const nextY = e.clientY - ref.current.offsetTop;
    const { x, y } = startPosition;

    // TODO 이전 사각형 지우기
    context.strokeRect(x, y, nextX - x, nextY - y);
  }

  return {
    startDrawing,
    endDrawing,
    drawLine,
    drawSquare,
  };
};
