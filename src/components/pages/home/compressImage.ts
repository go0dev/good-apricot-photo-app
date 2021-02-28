import imageCompression from 'browser-image-compression';

type CompressOptionsType = Parameters<typeof imageCompression>[1];

const COMPRESS_OPTIONS: CompressOptionsType = {
  maxSizeMB: 2,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

export const compressImageFiles = async (
  imageFiles: File[],
): Promise<File[]> => {
  const rawFiles = Array.from(imageFiles);
  const compressPromises = rawFiles.map((rawFile) =>
    imageCompression(rawFile, COMPRESS_OPTIONS),
  );
  const comporessFiles = await Promise.all(compressPromises);

  return comporessFiles;
};
