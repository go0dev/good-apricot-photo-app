declare module 'react-image-masonry' {
  interface ImageMasonryProps {
    numCols: number;
    containerWidth?: string;
    animate?: boolean;
    scrollable?: boolean;
    containerHeight?: string;
    className?: string;
    forceOrder?: boolean;
  }
  const ImageMasonry: React.FC<ImageMasonryProps>;
  export default ImageMasonry;
}
