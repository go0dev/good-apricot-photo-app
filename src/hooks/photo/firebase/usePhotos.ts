import { firebase } from 'hooks/firebase';
import { useEffect, useState } from 'react';
import { isPhoto, Photo } from 'models/photo';
import { PhotoHooks } from '..';

const usePhotos: PhotoHooks['usePhotos'] = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('photo')
      .onSnapshot((query) => {
        setLoading(true);
        const currentPhotos: Photo[] = [];
        query.forEach((docSnapshot) => {
          const photo = {
            id: docSnapshot.id,
            ...docSnapshot.data(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          if (isPhoto(photo)) {
            currentPhotos.push(photo);
          }
        });
        setPhotos(currentPhotos);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return { photos, loading };
};

export default usePhotos;
