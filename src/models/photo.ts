import firebase from 'firebase';

export type Photo = {
  id: string;
  imageUrl: string;
  isPosted: boolean;
  isDeleted: boolean;
  comment?: string;
  userId: string;
  userName: string;
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
};

const isPhoto = (arg: unknown): arg is Photo => {
  const o = arg as Photo;

  return (
    typeof o?.id === 'string' &&
    typeof o?.imageUrl === 'string' &&
    typeof o?.isPosted === 'boolean' &&
    typeof o?.isDeleted === 'boolean' &&
    typeof o?.userId === 'string' &&
    typeof o?.userName === 'string'
  );
};

const isPhotos = (args: unknown[]): args is Photo[] =>
  !args.some((arg) => !isPhoto(arg));

export const newPhotoValue: Pick<Photo, 'isDeleted' | 'isPosted'> = {
  isDeleted: false,
  isPosted: false,
};

export { isPhoto, isPhotos };
