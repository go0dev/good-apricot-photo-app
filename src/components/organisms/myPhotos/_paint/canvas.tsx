/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FC,
  RefObject,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react';

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>;
  width?: number;
  onMouseDown?: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseMove?: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseUp?: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onMouseOut?: (e: ReactMouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  onTouchStart?: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
  onTouchMove?: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
  onTouchEnd?: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
  onTouchCancel?: (e: ReactTouchEvent<HTMLCanvasElement>) => void;
};

const Canvas: FC<Props> = ({ canvasRef, width = 50, ...props }) => {
  const widthHalf = width ? width / 2 : 0;
  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  return (
    <>
      <canvas style={{ cursor }} ref={canvasRef} {...props} />
    </>
  );
};

export default Canvas;
