/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useRef, useState } from 'react';
import ReactMovableResizable from 'react-movable-resizable';

const MoveableWindow: FC = ({ children }) => {
  const myRef = useRef(null);
  const [transition] = useState('');
  const [size] = useState({ width: 100, height: 100, x: 0, y: 0 });

  return (
    <div>
      <div
        style={{
          width: '500px',
          height: '500px',
          border: '3px #ccc solid',
          position: 'relative',
        }}
      >
        <ReactMovableResizable
          ref={myRef}
          useParentBounds
          gridBackground
          initialWidth={size.width}
          initialHeight={size.height}
          initialX={size.x}
          initialY={size.y}
          borderColor="red"
          handlersColor="red"
          width={200}
          height={300}
          style={{ transition }}
          onDrag={() => {
            // Do Nothing
          }}
        >
          {children}
        </ReactMovableResizable>
      </div>
    </div>
  );
};
export default MoveableWindow;
