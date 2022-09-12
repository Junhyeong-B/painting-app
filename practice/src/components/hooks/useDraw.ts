import React, { useState } from 'react';
import { useColorStore, useToolStore } from 'store';

export const useDraw = (ref: React.RefObject<HTMLCanvasElement>) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { color } = useColorStore();
  const { tool } = useToolStore();

  // const getCoordinate = (e: React.MouseEvent<HTMLCanvasElement>) => {

  //   return {
  //     x: e.clientX - ref.current.offsetLeft,
  //     y: e.clientY - ref.current.offsetTop,
  //   }
  // }

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
    context.lineWidth = 5;

    const x = e.clientX - ref.current.offsetLeft;
    const y = e.clientY - ref.current.offsetTop;

    context.lineTo(x, y);
    context.stroke();
  };

  return {
    startDrawing,
    endDrawing,
    drawLine,
  };
};