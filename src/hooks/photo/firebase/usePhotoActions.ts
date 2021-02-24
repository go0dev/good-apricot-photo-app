import { firebase } from 'hooks/firebase';
import { useCallback, useMemo } from 'react';
import shortid from 'shortid';
import { Photo, newPhotoValue } from 'models/photo';
import { compressImageFiles } from 'utils/imageFileUtils';
import { useAuth } from 'hooks/auth';
import { PhotoHooks } from '..';

const usePhotoActions: PhotoHooks['usePhotoActions'] = () => {
  const { userId, userName } = useAuth();
  const photosCollection = useMemo(
    () => firebase.firestore().collection('photos'),
    [],
  );

  const photosStorage = useMemo(() => {
    const storageRef = firebase.storage().ref();
    const photosRef = storageRef.child('photos/');

    return photosRef;
  }, []);

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
      const newStockImage: Omit<Photo, 'id'> = {
        ...newPhotoValue,
        imageUrl,
        userId,
        userName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
      };
      await photosCollection.add(newStockImage);
    },
    [userId, userName, photosCollection],
  );

  const addPhotos = async (files: File[]) => {
    const compressedFiles = await compressImageFiles(files);
    const insertPromises = compressedFiles.map(async (compressedFile) => {
      const imageUrl = await insertStorage(compressedFile);
      await insertStore(imageUrl);
    });
    await Promise.all(insertPromises);
  };

  // 一人当たりの写真データ量はせいぜい2MB×10=20MB
  // 利用最大人数60人×20MB=1200MB=1.2GB程度
  // Cloud Storage無料枠5GB以内のため、論理削除とする。
  const deletePhoto = async (id: string) => {
    const imageDoc = photosCollection.doc(id);
    const updatedData: Pick<Photo, 'isDeleted' | 'updatedAt'> = {
      isDeleted: true,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    };
    await imageDoc.update(updatedData);
  };

  return { addPhotos, deletePhoto };
};

export default usePhotoActions;
