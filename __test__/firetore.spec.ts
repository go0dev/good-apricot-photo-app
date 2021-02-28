import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './firestoreTestProvider';
import { Photo } from '../src/models/photo';
import { initMock } from './mock';

const testName = 'firestore-emulator-test';
const provider = new FirestoreTestProvider(testName);

describe(testName, () => {
  let photoId = '';
  let photoId2 = '';
  beforeEach(async () => {
    provider.increment();
    await provider.loadRules();
    await initMock(provider.getAdminFirestore());
  });

  afterEach(async () => {
    await provider.cleanup();
  });

  describe('Photo test', () => {
    test('photo write', async () => {
      const db = provider.getFirestoreWithAuth({
        uid: 'testId',
        displayName: 'testName',
      });
      const testData: Omit<Photo, 'id'> = {
        imageUrl: 'https://example.com',
        isDeleted: false,
        isPosted: false,
        userId: 'testId',
        userName: 'testName',
      };
      const profile = db.collection('photos');
      await ftest.assertSucceeds(profile.add(testData));
    });
    test('photo read', async () => {
      const db = provider.getFirestoreWithAuth({
        uid: 'testId',
        displayName: 'testName',
      });

      const profile = db.collection('photos').doc(photoId);
      await ftest.assertSucceeds(profile.get());
    });
    test('photo read', async () => {
      const db = provider.getFirestoreWithAuth({
        uid: 'testId',
        displayName: 'testName',
      });

      const profile = db.collection('photos').doc(photoId2);
      await ftest.assertFails(profile.get());
    });
  });
});
