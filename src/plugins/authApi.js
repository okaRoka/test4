import {firebaseDb} from './firebase';

export const loginApi = (id, password) => {
    const ref = firebaseDb.ref(id);
    return new Promise((resolve) => {
      ref.once('value', (snapshot) => {
          const m = snapshot.val();
          if(m !== null) {
            if(password === m.passWord) {
              const ref2 = firebaseDb.ref('users/' +id);
              ref2.once('value', (childSnapshot) => {
                const m2 = childSnapshot.val();
                resolve({
                  userId: id,
                  userName: m2.userName,
                  profileImage: m2.profileImage,
                  hash: m.passWord,
                });
              });
            }
            else {
              resolve(null);
            };
          }
          else {
            resolve(null);
          };
      });
  });
};
