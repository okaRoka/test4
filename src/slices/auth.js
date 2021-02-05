import { createSlice } from '@reduxjs/toolkit';
import { loginApi, approvalApi } from '../plugins/authApi';
import {firebaseDb} from '../plugins/firebase';

const initialState = {
  user: null, // ユーザー情報の格納場所
  flag: false,
  flagT: false,
  hashed: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    },
    setFlag: state => {
      return Object.assign({}, state, { flag: !state.flag });
    },
    setFlagT: (state, action) => {
      return Object.assign({}, state, { flagT: action.payload });
    },

    passHash: (state, action) => {
      const crypto = require("crypto");
      const sha512 = crypto.createHash('sha512');
      sha512.update(action.payload);
      const hash = sha512.digest('hex');

      return Object.assign({}, state, { hashed: hash });
    },

    logout: state => {
      return Object.assign({}, state, { user: null });
    },
  }
});

export const { setFlag, setFlagT, passHash, logout } = slice.actions;

export default slice.reducer;

// ログイン済みか確認するセレクター
export const isAuthSelector = state => state.auth.user !== null;

// ログイン機能
export function login(id, password) {
  return async function(dispatch) {
    const user = await loginApi(id, password);  // 終わるまで待機
    if(user !== null) {
      // ログイン後にユーザー情報をストアに格納する
      dispatch(slice.actions.setUser(user));
    }
    else {
      dispatch(setFlag());
    };
  };
};

// 認証機能
export function approval(id, password) {
  return async function(dispatch) {
    const user = await approvalApi(id, password);  // 終わるまで待機
    if(user !== null) {
      // 認証後に値を返す
      return user;
    }
    else {
      dispatch(setFlag());
    };
  };
};

// サインアップ機能
export const signUp = (id, password, username, imageURL) => {
  return function() {
    try {
      const ref = firebaseDb.ref(id);
      ref.set({
        "passWord" : password,
      });
      const usersRef = firebaseDb.ref('users/' +id);
      usersRef.set({
        "passWord" : password,  // 削除予定
        "userName" : username,
        "profileImage": imageURL,
      });
    } catch (e) {
      console.log(e);
    };
  };
};
