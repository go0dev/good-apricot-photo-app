import { FC, useEffect } from 'react';
import usePainter from './usePainter';
import Canvas from './canvas';

type Props = {
  handleCanSwipe?: (canSwipe: boolean) => void;
};

const PaintPanel: FC<Props> = ({ handleCanSwipe }) => {
  const [{ canvas, ...state }, { init }] = usePainter();

  useEffect(() => {
    init();
    if (handleCanSwipe) {
      handleCanSwipe(false);
    }
  }, [init, handleCanSwipe]);

  return (
    <>
      <div style={{ width: 50, height: '100%' }}>Heloooo!!!!</div>

      <Canvas canvasRef={canvas} width={state.currentWidth} />
    </>
  );
};

export default PaintPanel;
