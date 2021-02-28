import { Timestamp, TimestampType } from 'lib/firebase';

export type Photo = {
  id: string;
  imageUrl: string;
  isPosted: boolean;
  isDeleted: boolean;
  comment?: string;
  userId: string;
  userName?: string;
  createdAt?: TimestampType;
  updatedAt?: TimestampType;
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

const isPhotos = (args?: unknown[]): args is Photo[] =>
  !!args && !args.some((arg) => !isPhoto(arg));

export const newPhotoValue: Pick<Photo, 'isDeleted' | 'isPosted'> = {
  isDeleted: false,
  isPosted: false,
};

export const createNewPhoto = (
  imageUrl: string,
  userId: string,
  userName: string,
): Omit<Photo, 'id'> => {
  const newPhoto: Omit<Photo, 'id'> = {
    imageUrl,
    isPosted: false,
    isDeleted: false,
    userId,
    userName,
    createdAt: Timestamp,
    updatedAt: Timestamp,
  };

  return newPhoto;
};

export const createDeletePhoto = (): Pick<
  Photo,
  'isDeleted' | 'updatedAt'
> => ({
  isDeleted: true,
  updatedAt: Timestamp,
});

export { isPhoto, isPhotos };
