import {firebaseDb} from './firebase';

export const loginApi = (id, password) => {
  const Ref = firebaseDb.ref(id);
  return new Promise((resolve) => {
    if(id.slice(0, 2) !== "01") {
      Ref.once('value', (snapshot) => {
        const m = snapshot.val();
        if(m !== null) {
          if(password === m.passWord) {
            const Ref2 = firebaseDb.ref('users/' +id);
            Ref2.once('value', (childSnapshot) => {
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
    }
    else {
      resolve(null);
    };
  });
};

export const approvalApi = (id, password) => {
  const ref = firebaseDb.ref(id);
  return new Promise((resolve) => {
    ref.once('value', (snapshot) => {
      const m = snapshot.val();
      if(m !== null) {
        if(password === m.passWord) {
          if(id.slice(0, 2) === "01") {
            resolve(0);
          }
          else {
            resolve(null);
          };
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
