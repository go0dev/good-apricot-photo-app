import * as ftest from '@firebase/testing';

const tempPhoto = {
  imageUrl: 'https://example.com',
  userName: 'testName',
  isDeleted: false,
  isPosted: false,
  userId: 'testId',
};

const authTestMock = {
  ...tempPhoto,
  isDeleted: false,
  isPosted: false,
  userId: 'testId',
};

export const initMock = async (db: ftest.firestore.Firestore) => {
  await db.collection('photos').add(authTestMock);
};
