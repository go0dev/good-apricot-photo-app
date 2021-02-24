/* eslint-disable react-hooks/exhaustive-deps */
import {
  useCallback,
  useRef,
  useState,
  MutableRefObject,
  TouchEvent as ReactTouchEvent,
} from 'react';

type ReturnValue = {
  canvas: MutableRefObject<HTMLCanvasElement | undefined>;
  init: () => void;
  // handleMouseDown: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  // handleMouseMove: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  // handleMouseUp: () => void;
  handleTouchStart: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
  handleTouchMove: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
  handleTouchEnd: () => void;
};

const usePaint = (): ReturnValue => {
  const [onDrawing, setOnDrawing] = useState(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef(canvas?.current?.getContext('2d'));
  const rect = useRef(canvas?.current?.getBoundingClientRect());

  const calcRect = useCallback((x: number, y: number) => {
    const rectLeft = rect.current?.left || 0;
    const rectTop = rect.current?.top || 0;

    return [x - rectLeft, y - rectTop];
  }, []);

  const drawLine = useCallback(
    (x1: number, y1: number, x2: number, y2: number) => {
      if (ctx.current) {
        ctx.current.beginPath();
        ctx.current.moveTo(x1, y1);
        ctx.current.lineTo(x2, y2);
        ctx.current.stroke();
        ctx.current.closePath();
      }
    },
    [],
  );

  const handleMouseDown = useCallback(({ offsetX, offsetY }: MouseEvent) => {
    setOnDrawing(true);
    [lastX.current, lastY.current] = [offsetX, offsetY];
  }, []);

  const handleMouseMove = useCallback(({ offsetX, offsetY }: MouseEvent) => {
    if (!onDrawing || !ctx.current) {
      return;
    }
    drawLine(lastX.current, lastY.current, offsetX, offsetY);
    [lastX.current, lastY.current] = [offsetX, offsetY];
  }, []);

  const handleMouseUp = useCallback(() => {
    setOnDrawing(false);
  }, []);

  const handleTouchStart = useCallback(
    ({ touches }: ReactTouchEvent<HTMLCanvasElement>) => {
      if (!onDrawing) {
        setOnDrawing(true);
      }
      const { pageX, pageY } = touches[0];
      [lastX.current, lastY.current] = [pageX, pageY];
      const [x, y] = calcRect(pageX, pageY);
      ctx.current?.moveTo(x, y);
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    setOnDrawing(false);
  }, []);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', handleMouseDown);
      canvas.current.addEventListener('mousemove', handleMouseMove);
      canvas.current.addEventListener('mouseup', handleMouseUp);

      canvas.current.width = window.innerWidth - 196;
      canvas.current.height = window.innerHeight;

      ctx.current.strokeStyle = 'black';
      // ctx.current.lineJoin = 'round';
      // ctx.current.lineCap = 'round';
      ctx.current.lineWidth = 10;
      canvas.current.getBoundingClientRect();
      rect.current = canvas.current.getBoundingClientRect();
    }
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const handleTouchMove = useCallback(
    ({ touches }: ReactTouchEvent<HTMLCanvasElement>) => {
      if (!onDrawing) {
        return;
      }

      const { pageX, pageY } = touches[0];
      if (pageX > 0 && pageY < 500) {
        const [x, y] = calcRect(pageX, pageY);
        ctx.current?.lineTo(x, y);
        ctx.current?.stroke();
      }
    },
    [],
  );

  return {
    canvas,
    // handleMouseDown,
    // handleMouseMove,
    // handleMouseUp,
    init,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default usePaint;
