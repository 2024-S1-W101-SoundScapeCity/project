import * as firebase from '@/firebase';

export const auth = {
    currentUser: {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
    },
  };
  
  export const createUserWithEmailAndPassword = jest.fn(() => ({
    user: {
      emailVerified: false,
      isAnonymous: false,
      metadata: {
        creationTime: new Date().toString(),
        lastSignInTime: new Date().toString(),
      },
      providerData: [
        {
          displayName: 'Test User',
          email: 'test@example.com',
          phoneNumber: null,
          photoURL: null, 
          providerId: 'password', 
          uid: 'test-uid',
        }
      ],
      refreshToken: 'test-refresh-token',
      tenantId: null,
    },
  }));
  
  export const updateProfile = jest.fn();
  
  export const updateEmail = jest.fn();
  
  export const deleteUser = jest.fn();
  
  export const db = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    set: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
  };
  
  export const Timestamp = {
    fromDate: jest.fn(() => new Date()),
  };
  