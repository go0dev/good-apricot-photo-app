import { useMemo, useContext, useCallback } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  createDeletePhoto,
  createNewPhoto,
  isPhoto,
  Photo,
} from 'models/photo';
import { FirebaseContext } from 'contexts/firebase';
import AuthContext from 'contexts/auth';
import shortid from 'shortid';
import { compressImageFiles } from 'utils/imageFileUtils';

type HooksType = () => {
  state: {
    photos: Photo[];
    loading: boolean;
    error?: Error;
  };
  actions: {
    addPhotos: (files: File[]) => Promise<never>;
    deletePhoto: (photoId: string) => Promise<void>;
  };
};

const collectionOptions = {
  snapshotListenOptions: true,
  idField: 'id',
};

export const useMyPhotos: HooksType = () => {
  const { db, storage } = useContext(FirebaseContext);
  const { userId, userName } = useContext(AuthContext);
  const photosCollection = useMemo(() => db.collection('photos'), [db]);
  const photosStorage = useMemo(() => storage.ref().child('photos/'), [
    storage,
  ]);

  const [values, loading, error] = useCollectionData<Photo>(
    photosCollection
      .where('userId', '==', userId)
      .where('isDeleted', '==', false),
    collectionOptions,
  );
  const photos = useMemo(
    () => values?.filter((value) => isPhoto(value)) || [],
    [values],
  );

  const insertStorage = useCallback(
    async (data: File) => {
      // 任意のファイル名を付与する（シーケンシャルなファイル名は, Cloud Storageでは非推奨）
      // https://cloud.google.com/storage/docs/best-practices?hl=ja
      const filename = `${shortid.generate()}.jpg`;
      const uploadTask = await photosStorage.child(filename).put(data);
      const imageUrl = (await uploadTask.ref.getDownloadURL()) as string;

      return imageUrl;
    },
    [photosStorage],
  );

  const insertStore = useCallback(
    async (imageUrl: string) => {
      // IDはdocumentのadd時に自動採番されるものを使用するため、保存時は考慮しない
      const newPhoto = createNewPhoto(imageUrl, userId, userName);
      await photosCollection.add(newPhoto);
    },
    [photosCollection, userId, userName],
  );

  const addPhotos = useCallback(
    async (photoFiles: File[]) => {
      const compressedFiles = await compressImageFiles(photoFiles);
      const insertPromises = compressedFiles.map(async (compressedFile) => {
        const imageUrl = await insertStorage(compressedFile);
        await insertStore(imageUrl);
      });
      throw await Promise.all(insertPromises);
    },
    [insertStorage, insertStore],
  );

  // 一人当たりの写真データ量はせいぜい2MB×10=20MB
  // 利用最大人数60人×20MB=1200MB=1.2GB程度
  // Cloud Storage無料枠5GB以内のため、論理削除とする。
  const deletePhoto = useCallback(
    async (photoId: string) => {
      const imageDoc = photosCollection.doc(photoId);
      const deleteData = createDeletePhoto();
      await imageDoc.update(deleteData);
    },
    [photosCollection],
  );

  return {
    state: { photos, loading, error },
    actions: { addPhotos, deletePhoto },
  };
};
