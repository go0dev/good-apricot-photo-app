import { createContext } from 'react';
import { Photo } from 'models/photo';
import { useClient } from 'hooks/di';

export type PhotoHooks = {
  usePhotos: () => {
    photos: Photo[];
    loading: boolean;
    error?: Error;
  };
  usePhotoActions: () => {
    addPhotos: (photoFiles: File[]) => Promise<void>;
    deletePhoto?: (pohotoId: string) => Promise<void>;
  };
};

export const PhotoHooksContext = createContext<PhotoHooks>({} as PhotoHooks);

export const usePhotos: PhotoHooks['usePhotos'] = () => {
  const client = useClient(PhotoHooksContext);

  return client.usePhotos();
};

export const usePhotoActions: PhotoHooks['usePhotoActions'] = () => {
  const client = useClient(PhotoHooksContext);

  return client.usePhotoActions();
};
