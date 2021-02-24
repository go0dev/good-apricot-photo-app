import { ChangeEvent, useCallback, useRef, useState, RefObject } from 'react';

type ReturnValue = [
  {
    canvas: RefObject<HTMLCanvasElement>;
    isReady: boolean;
    currentWidth: number;
    currentColor: string;
    isRegularMode: boolean;
    isAutoWidth: boolean;
    isEraser: boolean;
  },
  {
    init: () => void;
    handleRegularMode: () => void;
    handleSpecialMode: () => void;
    handleColor: (e: ChangeEvent<HTMLInputElement>) => void;
    handleWidth: (e: ChangeEvent<HTMLInputElement>) => void;
    handleClear: () => void;
    handleEraserMode: () => void;
    setAutoWidth: (e: ChangeEvent<HTMLInputElement>) => void;
    setCurrentSaturation: (e: ChangeEvent<HTMLInputElement>) => void;
    setCurrentLightness: (e: ChangeEvent<HTMLInputElement>) => void;
  },
];

const usePainter = (): ReturnValue => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRegularMode, setIsRegularMode] = useState(true);
  const [isAutoWidth, setIsAutoWidth] = useState(false);
  const [isEraser, setIsEraser] = useState(false);

  const [currentColor, setCurrentColor] = useState('#000000');
  const [currentWidth, setCurrentWidth] = useState(50);

  const autoWidth = useRef(false);
  const selectedSaturation = useRef(100);
  const selectedLightness = useRef(50);
  const selectedColor = useRef('#000000');
  const selectedLineWidth = useRef(50);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const hue = useRef(0);
  const isDrawing = useRef(false);
  const direction = useRef(true);
  const isRegularPaintMode = useRef(true);
  const isEraserMode = useRef(false);

  const ctx = useRef(canvas?.current?.getContext('2d'));

  const drawOnCanvas = useCallback((event: MouseEvent) => {
    if (!ctx || !ctx.current) {
      return;
    }
    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDrawing.current = true;
    [lastX.current, lastY.current] = [e.offsetX, e.offsetY];
  }, []);

  const dynamicLineWidth = useCallback(() => {
    if (!ctx || !ctx.current) {
      return;
    }
    if (ctx.current.lineWidth > 90 || ctx.current.lineWidth < 10) {
      direction.current = !direction.current;
    }
    if (direction.current) {
      ctx.current.lineWidth += 1;
    } else {
      ctx.current.lineWidth -= 1;
    }
    setCurrentWidth(ctx.current.lineWidth);
  }, []);

  const drawNormal = useCallback(
    (e: MouseEvent) => {
      if (!isDrawing.current || !ctx.current) return;

      if (isRegularPaintMode.current || isEraserMode.current) {
        ctx.current.strokeStyle = selectedColor.current;

        setCurrentColor(selectedColor.current);

        if (autoWidth.current && !isEraserMode.current) {
          dynamicLineWidth();
        } else {
          ctx.current.lineWidth = selectedLineWidth.current;
        }

        if (isEraserMode.current) {
          ctx.current.globalCompositeOperation = 'destination-out';
        } else {
          ctx.current.globalCompositeOperation = 'source-over';
        }
      } else {
        setCurrentColor(
          `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`,
        );
        ctx.current.strokeStyle = `hsl(${hue.current},${selectedSaturation.current}%,${selectedLightness.current}%)`;
        ctx.current.globalCompositeOperation = 'source-over';

        hue.current += 1;

        if (hue.current >= 360) hue.current = 0;

        if (autoWidth.current) {
          dynamicLineWidth();
        } else {
          ctx.current.lineWidth = selectedLineWidth.current;
        }
      }
      drawOnCanvas(e);
    },
    [drawOnCanvas, dynamicLineWidth],
  );

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const init = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', handleMouseDown);
      canvas.current.addEventListener('mousemove', drawNormal);
      canvas.current.addEventListener('mouseup', stopDrawing);
      canvas.current.addEventListener('mouseout', stopDrawing);

      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      ctx.current.strokeStyle = '#000';
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = 10;
      setIsReady(true);
    }
  }, [drawNormal, handleMouseDown, stopDrawing]);

  const handleRegularMode = useCallback(() => {
    setIsRegularMode(true);
    isEraserMode.current = false;
    setIsEraser(false);
    isRegularPaintMode.current = true;
  }, []);

  const handleSpecialMode = useCallback(() => {
    setIsRegularMode(false);
    isEraserMode.current = false;
    setIsEraser(false);
    isRegularPaintMode.current = false;
  }, []);

  const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.currentTarget.value);
    selectedColor.current = e.currentTarget.value;
  };

  const handleWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const width = Number(e.currentTarget.value);
    setCurrentWidth(width);
    selectedLineWidth.current = width;
  };

  const handleClear = useCallback(() => {
    if (!ctx || !ctx.current || !canvas || !canvas.current) {
      return;
    }
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const handleEraserMode = () => {
    autoWidth.current = false;
    setIsAutoWidth(false);
    setIsRegularMode(true);
    isEraserMode.current = true;
    setIsEraser(true);
  };

  const setCurrentSaturation = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(
      `hsl(${hue.current},${e.currentTarget.value}%,${selectedLightness.current}%)`,
    );
    selectedSaturation.current = Number(e.currentTarget.value);
  };

  const setCurrentLightness = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(
      `hsl(${hue.current},${selectedSaturation.current}%,${e.currentTarget.value}%)`,
    );
    selectedLightness.current = Number(e.currentTarget.value);
  };

  const setAutoWidth = (e: ChangeEvent<HTMLInputElement>) => {
    autoWidth.current = e.currentTarget.checked;
    setIsAutoWidth(e.currentTarget.checked);

    if (!e.currentTarget.checked) {
      setCurrentWidth(selectedLineWidth.current);
    } else {
      setCurrentWidth(ctx?.current?.lineWidth ?? selectedLineWidth.current);
    }
  };

  return [
    {
      canvas,
      isReady,
      currentWidth,
      currentColor,
      isRegularMode,
      isAutoWidth,
      isEraser,
    },
    {
      init,
      handleRegularMode,
      handleSpecialMode,
      handleColor,
      handleWidth,
      handleClear,
      handleEraserMode,
      setAutoWidth,
      setCurrentSaturation,
      setCurrentLightness,
    },
  ];
};

export default usePainter;
