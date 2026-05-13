import { FC } from 'react';

interface Cards3DProps {
  height?: string | number;
  onReady?: () => void;
}

declare const Cards3D: FC<Cards3DProps>;

export default Cards3D;
